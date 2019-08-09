<template>
	<section class="private">
		<div class="topBlank" ref="top"></div>
		<headTop :title="$t('center.private')" :backBtn='true'></headTop>
	    <div class="container">
        	<div class="letter_list" v-for="(message,index) in privateList" @click="private_detail(message.userId)">
        		<div class="headimg"><img :src="message.headimg"></div>
        		<div class="content">
        			<div class="content_detail">
	        			<div class="top">
	        				<span class="nickname">{{message.nickname||message.userId}}</span>
	        				<span class="time">{{message.created_time}}</span>
	        			</div>
	        			<div class="middle">
	        				<span class="cont">{{message.content}}</span>
	        				<span class="unread" v-show="message.number && message.number!=0">{{message.number}}</span>
	        			</div>
        			</div>
        		</div>
        	</div>			        
	    </div>
	</section>
</template>

<script type="text/javascript">
import headTop from '../../components/headTop.vue';
import {time_chat_list, time_chat_detail} from '../../common/js/utils.js';
	export default {
		components: {
			headTop,
		},
		computed: {
	    },
		data() {
			return {
				privateList: [],
				userId: '',
			}
		},
		created() {
			this.$api.getUserInfo().then(res => {
				this.userId = res.data.uid;
				this.$api.getPMList().then(res => {
					this.privateList = res.data;
					this.handle_list(this.privateList);
				});
			});
		},
		mounted() {
	      var top = this.$refs.top;
	      top.style.height = (48 + api.safeArea.top) + 'px';
	    },
		methods: {
			private_detail(id) {
				this.$router.push("/private_detail/" + id);
			},
			handle_list(list) {
				for(let i = 0; i<list.length; i++) {
					if(list[i].to_id == this.userId) 
						list[i].userId = list[i].from_id;
					else list[i].userId = list[i].to_id;
					this.$api.getUserInfoById(list[i].userId).then(res => {
						this.$set(list[i], 'nickname', res.data.nickname);
						if(res.data.headimg == null) 
							this.$set(list[i], 'headimg', this.url_config.default_headimg_url);
			            else this.$set(list[i], 'headimg', this.url_config.domain + '/' + res.data.headimg);
					});
					list[i].created_time = time_chat_list(list[i].created_time);
				}
			},
		},
		beforeRouteEnter (to, from, next) {
	      next(vm => {
	        vm.$refs.mescroll && vm.$refs.mescroll.beforeRouteEnter()
	      })
	    },
	    beforeRouteLeave (to, from, next) { // 
	      this.$refs.mescroll && this.$refs.mescroll.beforeRouteLeave()
	      next()
	    }
	}
</script>

<style lang='less'>
@import '../../common/style/privateLetter.less';
</style>