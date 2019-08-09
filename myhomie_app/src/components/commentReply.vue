<template>
	<div class="comment reply">
		<div class="topBlank"></div>
		<headTop title="Reply Detail" v-bind:backBtn='true'/>
		<div class="comment_list">
			<div class="headimg">
				<img :src="comment.headimg">
			</div>
			<div class="headright">
				<div class="comment_detail">
					<span class="report" @click="complaint(comment.id)">
						<van-icon name="ellipsis"/>
					</span>
					<div class="username">{{comment.nickname||comment.userid}}</div>
					<div class="comment_content">{{comment.content}}</div>
					<div class="comment_img">
						<img :src="comment.pic">
					</div>
					<div class="comment_inform">
						<span class="time">{{comment.created_time}}</span>
						<span class="like">
							<i class="iconfont icon-comment" @click="replySomeone(comment.id,comment.userid)"></i>
							<span @click="likeComment()" :class="{'bered':comment.isLike}">
								<i class="iconfont icon-appreciate" :class="{'icon-appreciatefill bered': comment.isLike}">
								</i>{{comment.likes+commentLike}}
							</span>
						</span>
					</div>									
				</div>
			</div>
		</div>
		<div class="comment_title">
			{{replyList.length}} REPLY
		</div>
		<div class="reply_list" v-for="(reply,index) in replyList" :key="index">
			<div class="headimg">
				<img :src="reply.headimg2">
			</div>
			<div class="headright">
				<div class="comment_detail">
					<span class="report" @click="complaint(comment.id)">
						<van-icon name="ellipsis"/>
					</span>
					<div class="username">
						<span>{{reply.nickname||reply.userid}}</span>
						<i class="iconfont icon-playfill" v-show="reply.mentionid != null"></i>
						<span>{{reply.mentionNickname||reply.toUserId}}</span>
					</div>
					<div class="comment_content">{{reply.content}}</div>
					<div class="comment_img">
						<img :src="reply.pic">
					</div>
					<div class="comment_inform">
						<span class="time">{{reply.created_time}}</span>
						<span class="like">
							<i class="iconfont icon-comment" @click="replySomeone(reply.id,reply.userid)"></i>
							<span @click="likeReply(reply.id,index)" 
							:class="{'bered':reply.isLike}">
								<i class="iconfont icon-appreciate" :class="{'icon-appreciatefill bered':reply.isLike}">
								</i>{{reply.likes+replyLike[index]}}
							</span>
						</span>
					</div>									
				</div>
			</div>
		</div>
		<commentInput ref="comment_input"
		    :isPostComment="false"
		    :post-id="postId"
		    @popupShow="handlePopup"
		    :groupId="groupId"
		    :mentionId="mentionId"
		    @sendFinish="finishSend"
		    :toSomeone="toSomeone"
		    :show="show"
		    :isLogin="isLogin">
		    </commentInput>
		<div class="bottomBlank"></div>
		<!--底部上拉菜单-->
	    <van-actionsheet
	      v-model="actionsheet"
	      :actions="actions"
	      :cancel-text="$t('search.cancel')"
	      @select="onSelect"
	      @cancel="onCancel"
	    />
	    <!--举报弹窗-->
	    <report :show="show2" :report-id="reportId" :report-type="1" @reportFinish="handleReport"></report>
	</div>
</template>

<script type="text/javascript">
import headTop from '../components/headTop.vue';
import {getComment} from '../api/api';
import {time_post_list, time_post_detail} from '../common/js/utils.js';
import report from '../components/report.vue';
import commentInput from '../components/commentInput.vue';
	export default {
		components: {
			headTop,
			commentInput,
			report,
		},
		data() {
			return {
				commentId: '', //初始化记录
				postId: '', //初始化记录
				comment: [], //大评论
				replyList: [], //回复列表内容
				commentLike: 0,
				replyLike: [],
				show: false, //是否显示底部弹框
				show2: false,
    			groupId: this.$route.params.commentId, //回复性的评论的评论id
    			mentionId: '', //@someone
    			toSomeone: '', //input框的默认显示值
    			isLogin: false,
    			actionsheet: false,
		        actions: [
		            {name: this.$t('report.report')}
		        ],
		        reportId: '',
			}
		},
	    created() {
	    	this.$api.isLogin().then(res => {
	    		if(res == 1) {
	    			this.isLogin = true;
	    		}
	    	});
	    	this.commentId = this.$route.params.commentId;
	    	this.postId = this.$route.query.postId;
	        this.getComment();
	    	this.getReply();
   		},
	    methods: {
	    	complaint(id) {
		        this.actionsheet = true;
		        this.reportId = id;
		    },
		    onSelect() {
		        this.actionsheet = false;
		        this.show2 = true;
		    },
		    onCancel() {

		    },
		    handleReport(val) {
		        this.show2 = val;
		    },
	    	finishSend(val) {
	    		this.getReply();
	    	},
	    	handlePopup(val) {
	    		this.show = val.show;
	    		this.toSomeone = val.toSomeone;
	    		this.groupId = val.groupId;
	    		this.mentionId = val.mentionId;
	    	},
	    	replySomeone(id, userid) {
	    		console.log(id + ' ' + userid);
    			if(this.isLogin == true) {
	    			this.show = true;
	    			this.$api.getUserInfoById(userid).then(res => {
	    				this.toSomeone = '@' + res.data.nickname||userid;
	    			});
	    			if(id != this.comment.id) {//回复的不是大评论，而是reply
	    				this.groupId = this.comment.id;
		    			this.mentionId = id;//设置@某人，在回复下的再回复
		    		}
	    			else this.groupId = id;
	    			this.$refs.comment_input.inputFocus();
	    		}else {
	    			this.$router.push({path:'/login_register',query: {redirect: this.$route.path}});
	    		}
	    	},
	    	getComment() {//获得一个大评论
	    		var form = new FormData();
				form.append("postid", this.postId);
				var that = this;
				this.$api.getGroupComments(form).then(res => {//获得评论详情
					var commentList = res.data;
					commentList.forEach(com => {
						if(com.id == that.commentId) {
							that.comment = com;
							if(that.comment.pic!=null)
    							that.comment.pic = that.url_config.domain + '/' + that.comment.pic;
							that.comment.created_time = time_post_detail(that.comment.created_time);
							let form2 = new FormData();
							form2.append('commentid', that.commentId);
							that.$api.isCommentLiked(form2).then(res => {
								let status = res.like_status;
								if(status == 1) { that.comment.isLike = true;}
								else { that.comment.isLike = false;}
							});
							that.$api.getUserInfoById(that.comment.userid).then(res => {
								that.$set(that.comment, 'nickname', res.data.nickname);
								that.toSomeone = '@'+ res.data.nickname || that.comment.userid;
								if(res.data.headimg == null) that.$set(that.comment, 'headimg', that.url_config.default_headimg_url);
		                        else that.comment.headimg = that.$set(that.comment, 'headimg', that.url_config.domain + '/' + res.data.headimg);
							});
						}
					});
				});
	    	},
	    	getReply() { //获得大评论下的回复
                var form3 = new FormData();
                form3.append("commentid", this.commentId);
                this.$api.getCommentReplies(form3).then(res => {
                    this.replyList = res.data;
                    this.isCommentLiked(this.replyList);
                });
	    	},
	    	isCommentLiked(list) {//初始化时判断回复列表各个回复是否点赞
	    		for(let i = 0; i<list.length; i++) {
	    			this.replyLike[i] = 0;
	    			list[i].created_time = time_post_detail(list[i].created_time);
	    			if(list[i].pic!=null)
    					list[i].pic = this.url_config.domain + '/' + list[i].pic;
	    			let form = new FormData();
					form.append('commentid', list[i].id);
					this.$api.isCommentLiked(form).then(res => {
						let status = res.like_status;
						if(status == 1) this.$set(list[i],'isLike',true);
						else this.$set(list[i],'isLike',false);
					});
					list[i].headimg2 = this.url_config.domain + '/' + list[i].author.headimg;
					// this.$api.getUserInfoById(list[i].userid).then(res => {
					// 	this.$set(list[i],'nickname',res.data.nickname);
					// 	if(res.data.headimg == null) 
					// 		this.$set(list[i],'headimg', this.url_config.default_headimg_url);
     //                    else this.$set(list[i], 'headimg', this.url_config.domain + '/' + res.data.headimg);
					// });
					if(list[i].mention) {
						this.$api.getCommentDetail(list[i].mentionid).then(res => {
	                		let id = res.data[0].userid;
	                		console.log(res.data[0].userid);
	                		this.$api.getUserInfoById(id).then(res => {
								this.$set(list[i], 'mentionNickname',res.data.nickname);
								this.$set(list[i], 'toUserId',res.data.id);
							});
	                	})
					}
	    		}
			},
			likeComment() { //点赞大评论
	    		var form4 = new FormData();
				form4.append('commentid', this.commentId);
	    		this.$api.likeComment(form4).then(res => {
	    			if(res.status_code == '1') {
		    			let status = res.like_status;
						if(status == 1) { 
							this.comment.isLike = true; 
							this.commentLike++;
						}
						else { 
							this.comment.isLike = false;
							this.commentLike--;
						}
					}else {
						this.$router.push({path:'/login_register',query: {commentid: this.commentId}});
					}
		    	});
	    	},
	    	likeReply(id, index) { //点赞回复列表
	    		let form = new FormData();
				form.append('commentid', id);
	    		this.$api.likeComment(form).then(res => {
	    			if(res.status_code == '1') {
		    			let status = res.like_status;
		    			console.log(this.replyLike[index]);
						if(status == '1') { 
							this.$set(this.replyList[index],'isLike',true);
							this.replyLike[index]++;
						}
						else { 
							this.$set(this.replyList[index],'isLike',false);
							this.replyLike[index]--;
						}
					}else {
						this.$router.push({path:'/login_register',query: {commentid: this.commentId}});
					}
		    	});
	    	},
	    }
	}
</script>

<style lang="less" scrope>
@import '../common/style/comment.less';
@import '../common/style/commentInput.less';
.reply {
	.fixed;
	margin-top: 0;
}
</style>