<template>
	<section>
		<!--页面底部的评论框+点赞收藏评论转发-->
		<div class="bottom_content">
			<input type="text" class="com2" readonly="readonly" :placeholder="$t('util.com')" @click="toComment()" v-if="isPostComment">
			<input type="text" class="com_reply" readonly="readonly" :placeholder="$t('util.com')" @click="toReply()" v-if="!isPostComment">
			<div v-if="isPostComment">
				<div class="right_item" @click="scrollToTop">
				    <i class="iconfont icon-comment"></i>
				    <span class="red_num">{{commentCount}}</span>
				</div>
				<div class="right_item">
					<i class="iconfont icon-favor" :class="{'icon-favorfill beyellow':isPostFavor}" @click="favorPost()"></i>
				</div>
				<div class="right_item">
					<i class="iconfont icon-appreciate" :class="{'icon-appreciatefill bered':isPostLike}" @click="likePost()"></i>
				</div>
				<div class="right_item">
					<i class="iconfont icon-share" @click="sharePost()"></i>
				</div>
			</div>
		</div>
		<!--评论输入框-->
		<van-popup v-model="show" position="bottom" :overlay="true" overlay-class="overlay_color" @click-overlay="closePopup" style="min-height:48px">
		  <div class="comment_input">
			<div class="com" @click="inputFocus()">
				<van-field
				    v-model="commentText"
				    type="textarea"
				    :placeholder="toSomeone" 
				    rows="1"
				    :autosize="{maxHeight: 60}"
				    class="wid"
				    :class="{if_image:isImageComment}"
				    ref="commentField"
				/>
				<div class="image" v-if="isImageComment">
					<img :src="imageContent"/>
					<div class="delete_img" @click="clearImage">
						<i class="iconfont icon-close"></i>
					</div>
				</div>
			</div>
			<van-button class="com_send" @click="sendComment">SEND</van-button>
			<div class="insert_img">
				<van-uploader :after-read="insertImg" accept="image/gif, image/jpeg, image/jpg, image/png, image/svg">
				    <van-icon name="photo-o" style="font-size: 24px"/>
				</van-uploader>
				<!-- <input type="file" accept="image/gif, image/jpeg, image/jpg, image/png, image/svg" @change="insertImg()"> -->
				<!-- <i class="iconfont icon-pic"></i> -->
			</div>
		  </div>
		</van-popup>
		<van-actionsheet v-model="share" title="分享到">
			<div class="share_to">
				<div class="share_item" @click="shareTo('session')"><van-icon name="friends-o"/>微信好友</div>
				<div class="share_item" @click="shareTo('timeline')"><van-icon name="circle"/>微信朋友圈</div>
			</div>
		</van-actionsheet>
	</section>
</template>

<script type="text/javascript">
	export default {
		props: {
			postId: String,//帖子的id
			commentCount: String,//评论总数量
			isPostComment: Boolean,//是否是帖子详情页面的评论框,帖子详情页or评论详情页
			isPostFavor: Boolean,//是否收藏了一个帖子
			isPostLike: Boolean,//是否点赞了一个帖子
			show: Boolean,//评论输入框是否弹出
			toSomeone: String,//评论框显示的提醒文字
			groupId: String,//评论某个人
			mentionId: String,//@someone
			isLogin: Boolean,
		},
		data() {
			return {
				commentText: '',//评论的文字内容
				imageContent: '',//图片评论的内容
				imageFile: '',//图片文件
				isImageComment: false, //评论是否有图片
				share: false,
			}
		},
		//始终有一个原则，子组件不能修改父组件的传值，即不能修改props的值
		methods: {
			scrollToTop() {
				this.$emit("scrollToTop", true);
			},
			likePost() { //点击 为一个帖子点赞或取消点赞
	    		var form = new FormData();
				form.append('postid', this.postId);
	    		this.$api.likePost(form).then(res => {
	    			if(res.status_code == '1') {
						if(res.like_status == '1') { this.$emit('isPostLike', true); }
						else { this.$emit('isPostLike', false);}
	    			}else {
	    				this.$router.push({path:'/login_register',query: {redirect: this.$route.path}});
	    			}
	    		});
	    	},
			favorPost() { //点击 收藏取消收藏一个帖子
				var form = new FormData();
				form.append("postid", this.postId);
				this.$api.fav(form).then(res => {
					if(res.status_code == '1'){
						if(res.fav_status == '1') this.$emit('isPostFavor', true);
						else this.$emit('isPostFavor', false);
					}else {
						this.$router.push({path:'/login_register',query: {redirect: this.$route.path}});
					}
				});
	    	},
	    	sharePost() {
	    		this.share = true;
	    	},
	    	shareTo(type) {
	    		this.share = false;
	    		var that = this;
	    		this.$api.queryPostDetail(this.postId).then(res => {
	    			var getTitle = res.data.title;
	    			var getType = res.data.post_type;
	    			var getPost = '';
	    			if(getType == 1) getPost = 'newsDetail';
	    			else if(getType == 2) getPost = 'informationDetail';
	    			else if(getType == 3) getPost = 'discoverDetail';
	    			var getPic = '';
	    			var getUrl = 'http://myhomie.chinaxueyun.com/myhomie/#/' + getPost + '/' + this.postId;
		    		var wx = api.require('wx');
					wx.shareWebpage({
					    scene: type,
					    title: getTitle,
					    description: '我在myhomie看新闻，快来和我一起吧',
					    thumb: getPic,
					    contentUrl: getUrl
					}, function(ret, err) {
					    if (ret.status) {
					        that.$toast('分享成功');
					    } else {
					        that.$toast(err.code);
					    }
					});
				});
	    	},
	    	inputFocus() {
	    		window.setTimeout(() => {
					var el = this.$refs.commentField;
					el.focus();
				},100);
	    	},
	    	toComment() { //评论一个帖子
	    		// this.show = true;
	    		if(this.isLogin == true){
					this.$emit("popupShow", {show: true, toSomeone: this.$t('util.com'), groupId: '', mentionId: ''});
	    			this.inputFocus();
	    		}else {
	    			this.$router.push({path:'/login_register',query: {redirect: this.$route.path}});
	    		}
	    	},
	    	toReply() {
    			if(this.isLogin == true) {
	    			this.$emit("popupShow", {show: true, toSomeone: this.toSomeone, groupId: this.groupId, mentionId: ''});
	    			this.inputFocus();
	    		}else {
	    			this.$router.push({path:'/login_register',query: {redirect: this.$route.path}});
	    		}
	    	},
	    	sendComment() { //发表评论
	    		var form = new FormData();
	    		form.append('postid', this.postId);
	    		if(this.groupId!='') form.append('groupid',this.groupId);
	    		form.append('content', this.commentText);
	    		if(this.imageFile != '') form.append('pic', this.imageFile);
	    		if(this.mentionId != '') form.append('mentionid', this.mentionId);
	    		this.$api.commentAPost(form).then(res => {
	    			this.$emit("popupShow", {show: false, toSomeone: this.$t('util.com'), groupId: '', mentionId: ''});
	    			this.$emit("sendFinish", true);
	    			this.commentText = '';
	    			this.clearImg();//发布成功后还原输入框内容
	    			this.$toast(this.$t('util.com_success'));
	    		});
	    	},
	    	clearImage() { //清除图片评论
	    		this.clearImg();
	    		this.inputFocus();
	    	},
	    	clearImg() {
	    		this.imageContent = '';
	    		this.imageFile = '';
	    		this.isImageComment = false;
	    	},
	    	insertImg(file) { ////上传图片
	            this.imageContent =  file.content;
	            this.imageFile = file.file;
	            this.isImageComment = true;
			    this.inputFocus();
		    },
		    closePopup() {
		    	this.commentText = '';
	    		this.clearImg();//发布成功后还原输入框内容
		    	this.$emit("popupShow", {show: false, toSomeone: this.$t('util.com'), groupId: '', mentionId: ''});
		    }
		}
	}
</script>

<style lang="less" scoped>
.share_to {
	width: 100%; 
	height: 120px;
	line-height: 30px; 
	font-size: 14px; 
	background-color: #FFF;
	border-radius: 5px 5px 0 0
}
.share_item {
	padding-top: 20px;
    float: left;
    color: #999;
    height: 80px;
    width: 30%;
    text-align: center;
    i {
    	font-size: 30px;
    	display: block;
    	color: #fe8f2d;
    }
}
</style>