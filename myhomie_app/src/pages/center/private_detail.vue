<template>
	<section class="private_detail">
		<div class="topBlank" ref="top"></div>
		<headTop :title="person||toid" :backBtn='true'></headTop>
	    <div class="container" ref="container">
	    	<div class="detail_list" v-for="message in messageDetail">
	    		<div class="send_time" v-show="message.isShow">{{message.created_time}}</div>
	        	<div class="message" v-show="message.from_id == toid">
	        		<div class="headimg left"><img :src="left_headimg"></div>
	        		<div class="triangle_left left"></div>
	        		<div class="context left">{{message.content}}</div>
	        	</div>
	        	<div class="message" v-show="message.from_id != toid">
	        		<div class="headimg right"><img :src="right_headimg"></div>
	        		<div class="triangle_right right"></div>
	        		<div class="context right">{{message.content}}</div>
	        	</div>
	    	</div>   
	    </div>
	    <div class="send_message">
			<input type="text" class="content" v-model="send_content">
			<div class="send" @click="sendMessage">SEND</div>
		</div>
	    <div class="bottomBlank left"></div>
	</section>
</template>

<script type="text/javascript">
import headTop from '../../components/headTop.vue';
import {time_chat_list, time_chat_detail} from '../../common/js/utils.js';
	export default {
		components: {
			headTop,
		},
		data() {
			return {
				toid: '',
				messageDetail: [],
				send_content: '',
				person: '',
				left_headimg: '',//左侧的头像
				right_headimg: '',//右侧的头像
			}
		},
		created() {
			this.toid = this.$route.params.id;
			this.getHeadimg();
			this.getDetail(this.toid);
		},
		mounted() {
	      var top = this.$refs.top;
	      top.style.height = (48 + api.safeArea.top) + 'px';
	    },
		methods: {
			getDetail(id) {
				var form = new FormData();
				form.append("to", id);
				this.$api.getPM(form).then(res => {
					this.messageDetail = res.data;
					this.handleDetail();
					this.$nextTick(() => {
			            let el = this.$refs.container;
			            document.documentElement.scrollTop = el.scrollHeight;
			            this.$refs.container.scrollTo(0,el.scrollHeight);
			        })
				});
			},
			getHeadimg() {
				this.$api.getUserInfoById(this.toid).then(res=>{
					this.left_headimg = this.url_config.domain + '/' + res.data.headimg;
					this.person = res.data.nickname;
				});
				this.$api.getUserInfo().then(res => {
					this.$api.getUserInfoById(res.data.uid).then(res=>{
						this.right_headimg = this.url_config.domain + '/' + res.data.headimg;
					});
				})
			},
			handleDetail() {
				for(let i=0; i<this.messageDetail.length; i++) {
					this.messageDetail[i].isShow = true;
					if(i>0) {
						if((this.messageDetail[i].created_time - this.messageDetail[i-1].created_time) < 180) {
							this.messageDetail[i].isShow = false;
						}else {
							this.messageDetail[i].isShow = true;
						}
					}
					if(i == this.messageDetail.length-1) {
						for(let i=0; i<this.messageDetail.length; i++) {
							this.messageDetail[i].created_time = time_chat_detail(this.messageDetail[i].created_time);
						}
					}
				}
			},
			sendMessage() {
				var form2 = new FormData();
				form2.append("to", this.toid);
				form2.append("content", this.send_content);
				this.$api.message(form2).then(res => {
					this.send_content = '';
					this.getDetail(this.toid);
				});
			}
		},
	}
</script>

<style lang='less'>
@import '../../common/style/privateLetter.less';
</style>