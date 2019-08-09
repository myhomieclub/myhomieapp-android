<template>
	<section class="my_comment">
		<div class="topBlank"></div>
		<headTop :title="$t('center.my_comment')" :backBtn='true'></headTop>
	    <div class="container">
	    	<div class="my_comment_container" ref="container">
	        	<mescroll-vue id="dataList" ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
		        	<div class="my_comment_list" v-for="(comment,index) in list" :key="comment.id">
		        		<div class="headimg"><img :src="headimg"></div>
		        		<div class="content">
		        			<div class="content_detail">
			        			<div class="top">
			        				<span class="nickname">
				        				{{nickname||userid}}
				        				<span class="more" @click="deleteComment(comment.id)"><i class="iconfont icon-delete"></i></span>
				        			</span>
			        				<span class="time">{{comment.created_time2}}</span>
			        			</div>
			        			<div class="middle" @click="goto(comment.postid, comment.postType)">
			        				{{comment.content}}
			        			</div>
			        			<div class="comment_pic" @click="goto(comment.postid, comment.postType)">
			        				<img :src="comment.pic">
			        			</div>
			        			<div class="bottom" @click="goto(comment.postid, comment.postType)" v-if="comment.groupid != null">Reply Comment: {{comment.commentContent}}</div>
			        			<div class="my_post" @click="goto(comment.postid, comment.postType)" v-if="comment.groupid == null">Comment Post: {{comment.postTitle}}</div>
		        			</div>
		        		</div>
		            </div>
		        </mescroll-vue>
	        </div>
	    </div>
	</section>
</template>

<script type="text/javascript">
import MescrollVue from 'mescroll.js/mescroll.vue';
import headTop from '../../components/headTop.vue';
import {time_post_list,time_post_detail} from '../../common/js/utils.js';
import nodata from '../../common/images/nodata.png';
	export default {
		components: {
			headTop,
      		MescrollVue, //以组件的形式使用
		},
		created() {
			this.$api.getUserInfo().then(res => {
				this.nickname = res.data.nickname;
				this.userid = res.data.uid;
				if(res.data.headimg == null) this.headimg = this.url_config.default_headimg_url;
       			else this.headimg = this.url_config.domain + '/' +res.data.headimg;
			})
		},
		data() {
			return {
				headimg: '',
				nickname: '',
				userid: '',
		        list: [],
		        mescroll: null, // mescroll实例对象
			    mescrollDown:{
			    	callback: this.downCallback,
			    },
			    mescrollUp: { // 上拉加载的配置.
			        callback: this.upCallback,
					page: {
						num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
					},
					empty: {
						warpId: "dataList", //父布局的id
						icon: nodata, 
						tip: this.$t('util.data')//提示
					}
			    }
			}
		},
		mounted() {
	      var container = this.$refs.container;
	      container.style.top = (48 + api.safeArea.top) + 'px';
	    },
		methods: {
		    mescrollInit (mescroll) {
		      this.mescroll = mescroll;
		    },
		    downCallback (mescroll) {
		    	mescroll.setPageNum(1);
		    	mescroll.resetUpScroll();// 触发下拉刷新的回调,加载第一页的数据
		    },
		    upCallback (page, mescroll) {
		    	if(page.num==1) {
		    		this.$api.getMyComments().then(res => {
			    		let arr = res.data;
			            mescroll.endSuccess(arr.length);
		            	this.list = []; 
		            	this.list = this.list.concat(arr); 
		            	this.handleCommentList(this.list);
			    	}).catch((e)=> {
			            mescroll.endErr();
			        });
		    	}else {
		    		let arr2 = [];
		    		mescroll.endSuccess(arr2.length);
		    		this.list = this.list.concat(arr2);
		    	}
		    },
		    handleCommentList(list) {
		    	for(let i=0; i<list.length; i++) {
		    		list[i].created_time2 = time_post_detail(list[i].created_time);
			    	if(list[i].pic!=null) list[i].pic = this.url_config.domain + '/' + list[i].pic;
			    	if(list[i].groupid!=null) {
			    		if(list[i].mentionid!=null) {
			    			this.$api.getCommentDetail(list[i].mentionid).then(res => {
				    			if(res.data == '') {
				    				this.$set(list[i], 'commentContent', this.$t('center.no_comment'));	
				    			}else {
					    			this.$set(list[i], 'commentContent', res.data[0].content);
					    			if(res.data[0].pic!=null) this.$set(list[i], 'commentContent', res.data[0].content + '[pic]');
				    			}
				    		})
			    		}else {
			    			this.$api.getCommentDetail(list[i].groupid).then(res => {
				    			if(res.data == '') {
				    				this.$set(list[i], 'commentContent', this.$t('center.no_comment'));	
				    			}else {
					    			this.$set(list[i], 'commentContent', res.data[0].content);
					    			if(res.data[0].pic!=null) this.$set(list[i], 'commentContent', res.data[0].content + '[pic]');
				    			}
				    		})
			    		}
			    	}//评论详情
			    	this.$api.queryPostDetail(list[i].postid).then(res => {
			    		if(res.status_code == 0) {
			    			this.$set(list[i], 'postTitle', this.$t('center.no_post'));
			    			this.$set(list[i], 'postType', 0);
			    		}else {
				    		this.$set(list[i], 'postTitle', res.data.title);
				    		this.$set(list[i], 'postType', res.data.post_type);
			    		}
			    	})//帖子情况是无论如何都要获取的
		    	}
		    },
		    deleteComment(id) {
		    	for(let i=0; i<this.list.length; i++) {
		    		if(this.list[i].id == id) {
		    			this.list.splice(i,1);
		    			let form = new FormData();
				    	form.append("commentid", id);
				    	this.$api.delAComment(form).then(res => {
				    		if(res.status_code == 1) {
				    			this.$toast(this.$t('util.delete_success'));
				    		}
				    	});
				    	break;
		    		}
		    	}
		    },
		    goto(postid, postType) {
		    	if(postType == 1) 
		    		this.$router.push({name: 'newsDetail', params: {id: postid}})
		    	else if(postType == 2)
		    		this.$router.push({name: 'informationDetail', params: {id: postid}})
		    	else if(postType == 3) 
		    		this.$router.push({name: 'discoverDetail', params: {id: postid}})
		    	else if(postType == 0)
		    		this.$toast(this.$t('center.no_post'));
		    }
		},
		beforeRouteEnter (to, from, next) {
	      next(vm => {
	        let curMescroll = vm.$refs['mescroll'];
	        curMescroll && curMescroll.beforeRouteEnter()
	      })
	    },
	    beforeRouteLeave (to, from, next) {
	      let curMescroll = this.$refs['mescroll'];
	      curMescroll && curMescroll.beforeRouteLeave()
	      next()
	    }
	}
</script>

<style lang='less'>
@import '../../common/style/collection.less';
</style>