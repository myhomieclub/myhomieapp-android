<template>
    <section class="discover">
        <headTop :title="$t('sendpost.discover')" v-bind:backBtn='false'>
  		<span class="header_right" slot="right">
          <i class="iconfont icon-search" @click="search" style="font-size: 20px;"></i>
      </span>
        </headTop>
        <!--swiper内容-->
        <div class="container">
            <div class="discover_container" ref="container">
                <mescroll-vue id="dataList" ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
                    <!--discover列表-->
                    <div class="discover_list" v-for="(post,index) in list" :key="post.id">
                        <div class="discover_item">
                            <div class="author">
                                <div class="headimg"><img :src="post.headimg2"></div>
                                <div class="nickname">{{post.author.nickname||post.userid}}</div>
                                <div class="time">{{post.created_time2}}</div>
                            </div>
                            <div @click="goto(post.id)">
                                <div class="content">{{post.title}}</div>
                                <div class="item_img" v-if="post.picVideo == 'onepic'">
                                    <div class="one_img">
                                        <img :src="post.srcList[0]">
                                    </div>
                                </div>
                                <div class="item_img" v-if="post.picVideo == 'two_four'">
                                    <div class="two_four" v-for="img in post.srcList">
                                        <img :src="img">
                                    </div>
                                </div>
                                <div class="item_img" v-if="post.picVideo == 'threepic'">
                                    <div class="three_six_nine" v-for="img in post.srcList">
                                        <img :src="img">
                                    </div>
                                </div>
                            </div>
                            <div class="note">
                                <span class="browse"><van-icon name="eye-o"
                                                               style="line-height: 34px;"/> {{post.seen}}</span>
                                <span class="more"><van-icon @click="complaint(post.id)" name="ellipsis"
                                                             style="line-height: 34px"/></span>
                                <span class="com">
                  <i class="iconfont icon-comment"></i>
                  <span v-show="post.comments!=0">{{post.comments}}</span>
                </span>
                                <span class="like" @click="likePost(index)"
                                      :class="{'beorange':post.isPostLike}">
                  <i class="iconfont icon-appreciate" :class="{'icon-appreciatefill':post.isPostLike}">
                  </i>
                  <span>{{post.likes+postLike[index]}}</span>
                </span>
                            </div>
                        </div>
                    </div>
                </mescroll-vue>
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
        <report :show="show" :report-id="reportId" :report-type="0" @reportFinish="handleReport"></report>
    </section>
</template>

<script>
    import MescrollVue from 'mescroll.js/mescroll.vue';
    import headTop from '../../components/headTop.vue';
    import report from '../../components/report.vue';
    import {time_post_list, time_post_detail} from '../../common/js/utils.js';
    import nodata from '../../common/images/nodata.png';

    export default {
        components: {
            headTop,
            MescrollVue, //以组件的形式使用
            report,
        },
        data() {
            return {
                list: [],
                postLike: [],
                mescroll: null, // mescroll实例对象
                mescrollDown: {
                    callback: this.downCallback,
                    textInOffset: this.$t('util.pull_down'),
                    textOutOffset: this.$t('util.release'),
                    textLoading: this.$t('util.load'),
                },
                mescrollUp: { // 上拉加载的配置.
                    callback: this.upCallback,
                    page: {
                        num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
                    },
                    empty: {
                        warpId: 'dataList',
                        icon: nodata,
                        tip: this.$t('util.data'),
                        btntext: "",
                    }
                },
                show: false,
                actionsheet: false,
                actions: [
                    {name: this.$t('report.report')}
                ],
                reportId: '',
            }
        },
        mounted() {
            var container = this.$refs.container;
            container.style.top = (48 + api.safeArea.top) + 'px';
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
            search() {
                this.$router.push({name: 'search', params: {type: 3}});
            },
            goto(id) {
                this.$router.push({name: 'discoverDetail', params: {id: id}})
            },
            mescrollInit(mescroll) {
                this.mescroll = mescroll;
            },
            downCallback(mescroll) {
                mescroll.setPageNum(1);
                mescroll.resetUpScroll();// 触发下拉刷新的回调,加载第一页的数据
            },
            upCallback(page, mescroll) {
                var startPage = page.num - 1; //设置回调从0开始
                this.$api.queryPosts('sort=latest&startPage=' + startPage + '&post_type=3').then(res => {
                    let arr = res.data;
                    if (page.num == 1) this.list = [];
                    this.list = this.list.concat(arr);
                    this.handlePostList(this.list);
                    this.$nextTick(() => {
                        mescroll.endSuccess(arr.length)
                    })
                    console.log(page.num);
                }).catch((e) => {
                    mescroll.endErr();
                })
            },
            handlePostList(postlist) {
                for (let i = 0; i < postlist.length; i++) {
                    this.$set(postlist[i], 'headimg2', this.url_config.domain + '/' + postlist[i].author.headimg);
                    let form = new FormData();
                    form.append('postid', postlist[i].id);
                    this.$api.isPostLiked(form).then(res => {
                        this.postLike[i] = 0;
                        if (res.like_status == 1) {
                            this.$set(postlist[i], 'isPostLike', true);
                        } else {
                            this.$set(postlist[i], 'isPostLike', false);
                        }
                    });
                    // this.$api.getGroupComments(form).then(res => {
                    //   var commentList = res.data;
                    //   this.$set(this.list[i], 'commentNum', commentList.length);
                    // });
                    postlist[i].created_time2 = time_post_detail(postlist[i].created_time);
                    let con = postlist[i].content;
                    let urls = /('|")\/?(\b((?!https?|ftp|file:\/\/)\w)+\b)[-A-Za-z0-9+&@#/%?=~_|!:.;\\]+[-A-Za-z0-9+&@#/%=~_|]('|")/g;
                    con = con.replace(urls, function (a) {
                        return '"http://myhomie.chinaxueyun.com' + a.substr(1);
                    });
                    let srcList = this.imgArr(con);
                    if (srcList.length == 0) postlist[i].picVideo = 'nopic';
                    else if (srcList.length == 1) {
                        postlist[i].picVideo = 'onepic';
                        postlist[i].srcList = srcList;
                    } else if (srcList.length == 2 || srcList.length == 4) {
                        postlist[i].picVideo = 'two_four';
                        postlist[i].srcList = srcList;
                    } else if (srcList.length == 3 || srcList.length > 4) {
                        postlist[i].picVideo = 'threepic';
                        postlist[i].srcList = srcList;
                    }
                }
            },
            likePost(i) {
                let form = new FormData();
                form.append('postid', this.list[i].id);
                this.$api.likePost(form).then(res => {
                    if (res.status_code == '1') {
                        if (res.like_status == '1') {
                            this.list[i].isPostLike = true;
                            this.postLike[i]++;
                        } else {
                            this.list[i].isPostLike = false;
                            this.postLike[i]--;
                        }
                    } else {
                        this.$router.push({path: '/login_register', query: {redirect: this.$route.path}});
                    }
                });
            },
            imgArr(str) {
                var imgReg = /<img.*?(?:>|\/>)/gi;
                var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
                var arr = str.match(imgReg);
                if (arr != null) {
                    var src = [];
                    for (var i = 0; i < arr.length; i++) {
                        var temp = arr[i].match(srcReg);
                        src.push(temp[1]);
                    }
                } else src = [];
                return src;
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.$refs.mescroll && vm.$refs.mescroll.beforeRouteEnter()
            })
        },
        beforeRouteLeave(to, from, next) { //
            this.$refs.mescroll && this.$refs.mescroll.beforeRouteLeave()
            next()
        }
    }
</script>

<style lang="less">
    @import '../../common/style/discover.less';
</style>