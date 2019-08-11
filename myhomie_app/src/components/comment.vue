<template>
    <div class="comment">
        <div class="comment_title">
            COMMENT
            <span class="sum">{{commentCount}}</span>
        </div>
        <div class="blankComment" v-show="commentCount==0">
            <img src="../common/images/nocomment.png">
            <span @click="commentPost">{{$t('util.no_comment')}}</span>
        </div>
        <div class="comment_list" v-for="(comment,index) in nowList" :key="index">
            <div class="headimg">
                <img :src="comment.headimg2">
            </div>
            <div class="headright">
                <div class="comment_detail">
					<span class="report" @click="complaint(comment.id)">
						<van-icon name="ellipsis"/>
					</span>
                    <div class="username">{{comment.author.nickname||comment.userid}}</div>
                    <div class="comment_content">{{comment.content}}</div>
                    <div class="comment_img">
                        <img :src="comment.pic">
                    </div>
                    <div class="comment_inform">
                        <span class="time">{{comment.created_time2}}</span>
                        <span class="like">
							<i class="iconfont icon-comment" @click="replySomeone(comment.id,comment.userid)"></i>
							<span @click="likeComment(comment.id,index)" :class="{'bered':comment.isLike}">
							  <i class="iconfont icon-appreciate" :class="{'icon-appreciatefill bered':comment.isLike}">
							  </i>{{comment.likes+commentLike[index]}}
							</span> 
						</span>
                    </div>
                </div>
                <div class="reply_detail" v-show="comment.replyList!=''">
                    <div class="pb" v-for="(reply,index) in comment.replyList" v-if="index<2" @click="goto(comment.id)">
						<span class="user">
							<span>{{reply.author.nickname}}</span>
							<i class="iconfont icon-playfill" v-show="reply.mentionid != null"></i>
							<span>{{reply.mention.nickname}}</span> :
						</span>
                        {{reply.content}}
                    </div>
                    <div class="see_more" @click="goto(comment.id)" v-if="comment.replyLength>2">see more
                        {{comment.replyLength-2}} replies
                    </div>
                </div>
            </div>
        </div>
        <!--底部上拉菜单-->
        <van-actionsheet
                v-model="actionsheet"
                :actions="actions"
                :cancel-text="$t('search.cancel')"
                @select="onSelect"
                @cancel="onCancel"
        />
        <!--举报弹窗-->
        <report :show="show" :report-id="reportId" :report-type="1" @reportFinish="handleReport"></report>
    </div>
</template>

<script type="text/javascript">
    import report from '../components/report.vue';
    import {time_post_list, time_post_detail} from '../common/js/utils.js';

    export default {
        props: {
            postId: {
                type: String
            },
            refresh: {
                type: Boolean
            }
        },
        components: {
            report,
        },
        data() {
            return {
                nowList: [],
                commentLike: [],
                commentCount: '',
                show: false,
                actionsheet: false,
                actions: [
                    {name: this.$t('report.report')}
                ],
                reportId: '',
            }
        },
        watch: {
            refresh() {
                if (this.refresh == true) {
                    this.getCommentDetail();
                    this.$emit("finish", false);
                }
            }
        },
        created() {
            this.getCommentDetail();
        },
        methods: {
            complaint(id) {
                this.actionsheet = true;
                this.reportId = id;
            },
            onSelect() {
                this.actionsheet = false;
                this.show = true;
            },
            onCancel() {

            },
            handleReport(val) {
                this.show = val;
            },
            likeComment(id, index) { //点赞一个评论
                var form = new FormData();
                form.append('commentid', id);
                this.$api.likeComment(form).then(res => {
                    if (res.status_code == '1') {
                        if (res.like_status == '1') {
                            this.$set(this.nowList[index], 'isLike', true);
                            this.commentLike[index]++;
                            this.$set(this.commentLike, index, this.commentLike[index]++);
                        } else {
                            this.$set(this.nowList[index], 'isLike', false);
                            this.commentLike[index]--;
                            this.$set(this.commentLike, index, this.commentLike[index]--);
                        }
                    } else {
                        this.$router.push({path: '/login_register', query: {postid: this.postId}});
                    }
                });
            },
            getCommentDetail() {//初始化获得评论详情
                var form = new FormData();
                form.append("postid", this.postId);
                this.$api.getGroupComments(form).then(res => {
                    this.nowList = res.data;
                    this.commentCount = res.data.length;
                    this.$emit("commentCount", this.commentCount);
                    var that = this;
                    this.nowList.forEach((com, index) => {
                        that.isCommentLiked(com.id, index);
                        that.commentLike[index] = 0;
                    });
                    //this.getReplyDetail();
                    this.handlenowList(this.nowList);
                });
            },
            isCommentLiked(commentid, index) {//初始化时判断评论列表是否点赞
                if (this.nowList[index].pic != null)
                    this.nowList[index].pic = this.url_config.domain + '/' + this.nowList[index].pic;
                var form = new FormData();
                form.append('commentid', commentid);
                this.$api.isCommentLiked(form).then(res => {
                    var status = res.like_status;
                    if (status == 1) this.nowList[index].isLike = true;
                    else this.nowList[index].isLike = false;
                });
                this.nowList[index].headimg2 = this.url_config.domain + '/' + this.nowList[index].author.headimg;
            },
            handlenowList(list) {
                let list_length = Object.keys(list).length;
                for (let j = 0; j < list_length; j++) {
                    list[j].created_time2 = time_post_detail(list[j].created_time);
                    let form = new FormData();
                    form.append("commentid", list[j].id);
                    this.$api.getCommentReplies(form).then(res => {
                        this.$set(list[j], 'replyList', res.data);
                        let comment_length = Object.keys(list[j].replyList).length;
                        this.$set(list[j], 'replyLength', comment_length);
                        for (let i = 0; i < comment_length; i++) {
                            if (list[j].replyList[i].pic != null)
                                list[j].replyList[i].content = list[j].replyList[i].content + '[pic]';
                        }
                    });
                }
            },
            replySomeone(id, userid) {
                this.$emit('comment-someone', {id: id, userid: userid});
            },
            commentPost() {

            },
            goto(id) {
                this.$router.push({name: 'commentReply', params: {commentId: id}, query: {postId: this.postId}});
            },
        },
    }
</script>

<style lang="less">
    @import '../common/style/comment.less';
</style>