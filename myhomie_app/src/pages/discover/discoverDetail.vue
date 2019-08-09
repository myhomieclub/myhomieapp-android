<template>
    <section class="news_detail">
        <div class="topBlank" ref="top"></div>
        <headTop title="Detail" v-bind:backBtn='true'>
            <span class="header_right" slot="right">
                <van-icon @click="complaint(postComment)" name="ellipsis" style="line-height: 48px"/>
            </span>      
        </headTop>
        <div class="detail" ref="detail">
            <div class="news_news">
                <div class="news_title">{{postDetail.title}}</div>
                <div class="news_describe">
                    <img :src="postDetail.headimg">
                    <span class="author">{{postDetail.nickname||postDetail.userid}}</span>
                    <span class="time">{{postDetail.created_time}}</span>
                </div>
                <div class="news_content" ref="newsContent">
 
                </div>
                <div class="note"></div>
            </div>

            <div class="action" ref="comment_action">
                <div class="item">
                    <div class="action_item" @click="likePost" 
                        :class="{'borderorange':isPostLike}">
                        <div class="like_dislike"
                            :class="{beorange:isPostLike}">
                            <i class="iconfont icon-appreciate" :class="{'icon-appreciatefill':isPostLike}">
                            </i>
                            <div>{{postDetail.likes+postLike}}</div>
                        </div>
                    </div>
                </div>
                <div class="item">
                    <div class="action_item">
                        <div class="like_dislike">
                            <i class="iconfont icon-comment"></i>
                            <div>{{commentCount}}</div>
                        </div>
                    </div>
                </div>      
            </div>   

            <comment 
              @comment-someone="commentSomeone"
              :post-id="postComment" 
              @finish="finishRefresh"
              :refresh="refresh_comment"
              @commentCount="handleCount"
              >
            </comment>
        </div>  
        <commentInput ref="comment_input"
            :comment-count="commentCount"
            isPostComment="true"
            :post-id="postComment"
            :isPostFavor="isPostFavor"
            @isPostFavor="handleFavor"
            :isPostLike="isPostLike"
            @isPostLike="handleLike"
            @popupShow="handlePopup"
            @sendFinish="finishSend"
            :toSomeone="toSomeone"
            :groupId="groupId"
            :mentionId="mentionId"
            :show="show"
            @scrollToTop="handleScroll"
            :isLogin="isLogin">
        </commentInput>
        <div class="bottomBlank"></div>
        <van-actionsheet
          v-model="actionsheet"
          :actions="actions"
          :cancel-text="$t('search.cancel')"
          @select="onSelect"
          @cancel="onCancel"
        />
        <!--举报弹窗-->
        <report :show="show2" :report-id="reportId" :report-type="0" @reportFinish="handleReport"></report>
    </section>
</template>

<script>
import headTop from '../../components/headTop.vue';
import comment from '../../components/comment.vue';
import report from '../../components/report.vue';
import commentInput from '../../components/commentInput.vue';
import {time_post_list, time_post_detail} from '../../common/js/utils.js';
export default {
    components: {
      headTop,
      comment,
      commentInput,
      report
    },
    data() {
        return {
            postDetail: [],
            commentCount: '',
            postComment: this.$route.params.id, //帖子的id
            isPostLike: false, //帖子是否点赞
            isPostFavor: false, //帖子是否收藏
            postLike: 0, //帖子点赞数量
            toSomeone: this.$t('util.com'), //input框的默认显示值
            show: false, //是否显示底部弹框
            groupId: '', //回复性的评论的评论id
            mentionId: '',//@someone
            isLogin: false,
            refresh_comment: false,
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
        this.init();
    },
    mounted() {
        var top = this.$refs.top;
        top.style.height = (48 + api.safeArea.top) + 'px';
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
        handleCount(val) {
            this.commentCount = val;
        },
        handleLike(val) {
            let temp = val;
            if(temp == true) {
                this.isPostLike = true;
                this.postLike++;
            }else {
                this.isPostLike = false;
                this.postLike--;
            }
        },
        handleFavor(val) {
            this.isPostFavor = val; //true or false
        },
        handlePopup(val) {
            this.show = val.show;
            this.toSomeone = val.toSomeone;
            this.groupId = val.groupId;
        },
        finishRefresh(val) {
            this.refresh_comment = val;
        },
        finishSend(val) {
            this.refresh_comment = val;
        },
        handleScroll(val) {
            let el = this.$refs.comment_action;
            document.documentElement.scrollTop = el.offsetTop;
        },
        init() {
            this.postComment = this.$route.params.id;
            this.postDetail = [];
            this.isPostLiked();
            this.isPostFavored();
            this.getPostDetail();
        },
        commentSomeone(msg) { //回复某个人的评论
            if(this.isLogin == true) {
                this.show = true;
                this.$api.getUserInfoById(msg.userid).then(res => {
                    this.toSomeone = '@' + res.data.nickname||msg.userid;
                });
                this.groupId = msg.id;
                this.$refs.comment_input.inputFocus();
            }else {
                this.$router.push({path:'/login_register',query: {redirect: this.$route.path}});
            }
        },
        isPostLiked() {//初始化时判断页面显示是否点赞
            var form = new FormData();
            form.append('postid', this.postComment);
            this.$api.isPostLiked(form).then(res => {
                this.postLike = 0;
                var status = res.like_status;
                if(status == 1) { this.isPostLike = true; }
                else { this.isPostLike = false; }
            });
        },
        isPostFavored() {//初始化时判断帖子是否收藏
            this.$api.isFav(this.postComment).then(res => {
                var status = res.data;
                if(status == '1') { this.isPostFavor = true; }
                else { this.isPostFavor = false; }
            });
        },
        likePost() { //点击 为一个帖子点赞或取消点赞
            var form = new FormData();
            form.append('postid', this.postComment);
            this.$api.likePost(form).then(res => {
                if(res.status_code == '1') {
                    var status = res.like_status;
                    if(status == '1') { this.isPostLike = true;this.postLike++; }
                    else { this.isPostLike = false;this.postLike--; }
                }else {
                    this.$router.push({path:'/login_register',query: {redirect: this.$route.path}});
                }
            });
        },
        getPostDetail() {//初始化获得帖子详情
            this.$api.queryPostDetail(this.postComment+'&isView=1').then(res => {
                this.postDetail = res.data;
                this.$api.getUserInfoById(this.postDetail.userid).then(res => {
                    this.$set(this.postDetail, 'nickname', res.data.nickname);
                    if(res.data.headimg == null) 
                        this.$set(this.postDetail, 'headimg', this.url_config.default_headimg_url);
                    else if(res.data.headimg != null) 
                        this.$set(this.postDetail, 'headimg', this.url_config.domain + '/' +res.data.headimg);
                })
                this.postDetail.created_time = time_post_detail(this.postDetail.created_time);
                let con = this.postDetail.content;
                let urls = /('|")\/?(\b((?!https?|ftp|file:\/\/)\w)+\b)[-A-Za-z0-9+&@#/%?=~_|!:.;\\]+[-A-Za-z0-9+&@#/%=~_|]('|")/g;
                con=con.replace(urls,function(a){
                    return '"http://myhomie.chinaxueyun.com'+a.substr(1);
                });
                this.$refs.newsContent.innerHTML = con;    
            });
        },
    },
  }
</script>

<style lang="less">
@import '../../common/style/newsDetail.less';
@import '../../common/style/comment.less';
</style>