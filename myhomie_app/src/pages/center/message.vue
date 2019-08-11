<template>
    <section class="message">
        <headTop :title="$t('center.notice')" :backBtn='true'></headTop>
        <div class="category" ref="cate">
            <div style="display:inline-block;width: 100%;">
                <div class="category_list">
			        <span class="category_item" v-for="(tab,index) in tabs"
                          :class="{active:nowIndex === index}" @click="changeTab(index)">
			        {{$t(tab.name)}}</span>
                </div>
            </div>
        </div>
        <!--swiper内容-->
        <div class="container">
            <swiper ref="mySwiper" :options="swiperOption">
                <swiper-slide>
                    <mescroll-vue id="dataList0" ref="mescroll0" :down="getMescrollDown(0)" :up="getMescrollUp(0)"
                                  @init="mescrollInit(0,arguments)">
                        <div class="my_comment_list" v-for="(message,index) in tabs[0].list">
                            <div class="headimg"><img :src="message.headimg2"></div>
                            <div class="content" @click="goto(message.postid,message.postType)">
                                <div class="content_detail">
                                    <div class="top">
                                        <span class="nickname">{{message.nickname||message.userid}}</span>
                                        <span class="time">{{message.created_time2}}</span>
                                    </div>
                                    <div class="middle">{{message.content}}</div>
                                    <div class="comment_pic" v-show="message.pic">
                                        <img :src="message.pic">
                                    </div>
                                    <div class="bottom" v-if="message.groupid!=null">my comment:
                                        {{message.commentContent}}
                                    </div>
                                    <div class="my_post" v-if="message.groupid==null">My post: {{message.postTitle}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </mescroll-vue>
                </swiper-slide>
                <swiper-slide>
                    <mescroll-vue id="dataList1" ref="mescroll1" :up="getMescrollUp(1)"
                                  @init="mescrollInit(1,arguments)">
                        <div class="like_list" v-for="(message,index) in tabs[1].list">
                            <div class="headimg"><img :src="message.headimg2"></div>
                            <div class="content" @click="goto(message.postid,message.postType)">
                                <div class="content_detail">
                                    <div class="top">
                                        <span class="nickname">{{message.nickname||message.userid}}</span>
                                        <span class="time">{{message.created_time2}}</span>
                                    </div>
                                    <div class="text" v-if="message.type == 'post'">liked your post:
                                        {{message.postTitle}}
                                    </div>
                                    <div class="text" v-if="message.type != 'post'">liked your comment:
                                        {{message.commentContent}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </mescroll-vue>
                </swiper-slide>
                <swiper-slide>
                    <mescroll-vue id="dataList2" ref="mescroll2" :up="getMescrollUp(2)"
                                  @init="mescrollInit(2,arguments)">
                        <div class="like_list" v-for="(message,index) in tabs[2].list">
                        </div>
                    </mescroll-vue>
                </swiper-slide>
            </swiper>
        </div>
    </section>
</template>

<script type="text/javascript">
    import 'swiper/dist/css/swiper.css';
    import {swiper, swiperSlide} from 'vue-awesome-swiper'; //swiper的vue组件应用
    import MescrollVue from 'mescroll.js/mescroll.vue';
    import {time_post_list, time_post_detail} from '../../common/js/utils.js';
    import headTop from '../../components/headTop.vue';
    import nodata from '../../common/images/nomessage.png';

    export default {
        components: {
            headTop,
            swiper, //以组件的形式使用
            swiperSlide, //以组件的形式使用
            MescrollVue, //以组件的形式使用
        },
        computed: {
            swiper() { // 轮播对象
                return this.$refs.mySwiper.swiper
            },
        },
        data() {
            return {
                tabs: [
                    {name: 'center.mess_comment', mescroll: null, list: [], isListInit: false, num: 0},
                    {name: 'center.mess_like', mescroll: null, list: [], isListInit: false, num: 0},
                    {name: 'center.mess_system', mescroll: null, list: [], isListInit: false, num: 0},
                ],
                nowIndex: 0, //当前tab的下标
                swiperOption: { // 轮播配置
                    on: {
                        transitionEnd: () => {
                            this.changeTab(this.swiper.activeIndex)
                        }
                    }
                },
            }
        },
        mounted() {
            var cate = this.$refs.cate;
            var swiperContent = this.$refs.mySwiper;
            cate.style.top = (48 + api.safeArea.top) + 'px';
            swiperContent.top = (92 + api.safeArea.top) + 'px';
        },
        methods: {
            changeTab(tabIndex) {
                if (this.nowIndex === tabIndex) return; // 避免重复调用
                let nowTab = this.tabs[this.nowIndex];// 当前列表
                let newTab = this.tabs[tabIndex];// 新转换的列表
                this.nowIndex = tabIndex; // 切换菜单
                this.swiper.slideTo(tabIndex, 100, false);

                if (newTab.mescroll) {
                    if (!newTab.isListInit) {
                        // 加载列表
                        newTab.mescroll.triggerDownScroll();
                    } else {
                        // 检查新转换的列表是否需要显示回到到顶按钮
                        var that = this;
                        setTimeout(() => {
                            let curScrollTop = newTab.mescroll.getScrollTop();
                            if (curScrollTop >= newTab.mescroll.optUp.toTop.offset) {
                                newTab.mescroll.showTopBtn();
                            } else {
                                newTab.mescroll.hideTopBtn();
                            }
                        }, 30)
                    }
                }
            },
            // 多mescroll的配置,需通过方法获取,保证每个配置是单例
            getMescrollDown(tabIndex) {
                let isAuto = tabIndex === 0; // 第一个mescroll传入true,列表自动加载
                return {
                    auto: isAuto,
                    callback: this.downCallback
                }
            },
            // mescroll上拉加载的配置
            getMescrollUp(tabIndex) {
                let emptyWarpId = 'dataList' + tabIndex;
                return {
                    auto: false,
                    callback: this.upCallback, // 上拉回调,此处可简写; 相当于 callback: function (page) { upCallback(page); }
                    noMoreSize: 10,
                    empty: {
                        warpId: emptyWarpId, // 父布局的id;
                        icon: nodata,
                        tip: this.$t('util.data'), // 提示
                    },
                }
            },
            // mescroll初始化的回调
            mescrollInit(tabIndex, arg) {
                this.tabs[tabIndex].mescroll = arg[0]; // 传入mescroll对象
                this.tabs[tabIndex].mescroll.tabIndex = tabIndex; // 加入标记,便于在回调中取到对应的list
            },
            downCallback(mescroll) {
                this.tabs[mescroll.tabIndex].num = 0;
                mescroll.resetUpScroll();// 触发下拉刷新的回调,加载第一页的数据
            },
            upCallback(page, mescroll) {
                this.tabs[mescroll.tabIndex].isListInit = true;
                if (this.tabs[mescroll.tabIndex].num == 0) {
                    if (mescroll.tabIndex == 0) {
                        this.$api.getReceivedComments().then(res => {
                            let arr = res.data;
                            mescroll.endSuccess(arr.length);
                            this.tabs[mescroll.tabIndex].list = [];
                            this.tabs[mescroll.tabIndex].list = this.tabs[mescroll.tabIndex].list.concat(arr);
                            this.handleComment(this.tabs[mescroll.tabIndex].list);
                            this.tabs[mescroll.tabIndex].num++;
                        }).catch((e) => {
                            if (this.tabs[mescroll.tabIndex] == 0) this.tabs[mescroll.tabIndex].isListInit = false;
                            mescroll.endErr();
                        })
                    }
                    if (mescroll.tabIndex == 1) {
                        this.$api.queryLikes().then(res => {
                            let arr = res.data;
                            mescroll.endSuccess(arr.length);
                            this.tabs[mescroll.tabIndex].list = [];
                            this.tabs[mescroll.tabIndex].list = this.tabs[mescroll.tabIndex].list.concat(arr);
                            this.handleLike(this.tabs[mescroll.tabIndex].list);
                            this.tabs[mescroll.tabIndex].num++;
                        }).catch((e) => {
                            if (this.tabs[mescroll.tabIndex] == 0)
                                this.tabs[mescroll.tabIndex].isListInit = false;
                            mescroll.endErr();
                        })
                    }
                    if (mescroll.tabIndex == 2) {
                        let arr2 = [];
                        mescroll.endSuccess(arr2.length);
                        this.tabs[mescroll.tabIndex].list = [];
                        this.tabs[mescroll.tabIndex].num++;
                    }
                } else {
                    let arr2 = [];
                    mescroll.endSuccess(arr2.length);
                    this.tabs[mescroll.tabIndex].list = this.tabs[mescroll.tabIndex].list.concat(arr2);
                }
            },
            handleComment(list) {
                for (let i = 0; i < list.length; i++) {
                    list[i].headimg2 = this.url_config.domain + '/' + list[i].author.headimg;
                    list[i].created_time2 = time_post_detail(list[i].created_time);
                    if (list[i].pic != null) list[i].pic = this.url_config.domain + '/' + list[i].pic;
                    this.$api.queryPostDetail(list[i].postid).then(res => {
                        if (res.status_code == 0) {
                            this.$set(list[i], 'postTitle', this.$t('center.no_post'));
                            this.$set(list[i], 'postType', 0);
                        } else {
                            this.$set(list[i], 'postTitle', res.data.title);
                            this.$set(list[i], 'postType', res.data.post_type);
                        }
                    });
                    if (list[i].groupid != null) {
                        if (list[i].mentionid != null) {
                            this.$api.getCommentDetail(list[i].mentionid).then(res => {
                                if (res.data == '') {
                                    this.$set(list[i], 'commentContent', this.$t('center.no_comment'));
                                } else {
                                    this.$set(list[i], 'commentContent', res.data[0].content);
                                    if (res.data[0].pic != null) this.$set(list[i], 'commentContent', res.data[0].content + '[pic]');
                                }
                            })
                        } else {
                            this.$api.getCommentDetail(list[i].groupid).then(res => {
                                if (res.data == '') {
                                    this.$set(list[i], 'commentContent', this.$t('center.no_comment'));
                                } else {
                                    this.$set(list[i], 'commentContent', res.data[0].content);
                                    if (res.data[0].pic != null) this.$set(list[i], 'commentContent', res.data[0].content + '[pic]');
                                }
                            })
                        }
                    }
                }
            },
            handleLike(list) {
                for (let i = 0; i < list.length; i++) {
                    list[i].headimg2 = this.url_config.domain + '/' + list[i].author.headimg;
                    list[i].created_time2 = time_post_detail(list[i].created_time);
                    if (list[i].type == 'comment') {
                        this.$api.getCommentDetail(list[i].id).then(res => {
                            if (res.data == '') {
                                this.$set(list[i], 'commentContent', this.$t('center.no_comment'));
                                this.$set(list[i], 'postid', '');
                                this.$set(list[i], 'postType', 0);
                            } else {
                                this.$set(list[i], 'commentContent', res.data[0].content);
                                if (res.data[0].pic != null) this.$set(list[i], 'commentContent', res.data[0].content + '[pic]');
                                this.$set(list[i], 'postid', res.data[0].postid);
                                this.$api.queryPostDetail(res.data[0].postid).then(res => {
                                    if (res.status_code == 0) {
                                        this.$set(list[i], 'postType', 0);
                                    } else {
                                        this.$set(list[i], 'postType', res.data.post_type);
                                    }
                                });
                            }
                        });
                    } else {//type为post时，id为postid
                        list[i].postid = list[i].id;
                        this.$api.queryPostDetail(list[i].id).then(res => {
                            if (res.status_code == 0) {
                                this.$set(list[i], 'postTitle', this.$t('center.no_post'));
                                this.$set(list[i], 'postType', 0);
                            } else {
                                this.$set(list[i], 'postTitle', res.data.title);
                                this.$set(list[i], 'postType', res.data.post_type);
                            }
                        });
                    }
                }
            },
            goto(postid, postType) {
                if (postType == 1)
                    this.$router.push({name: 'newsDetail', params: {id: postid}})
                else if (postType == 2)
                    this.$router.push({name: 'informationDetail', params: {id: postid}})
                else if (postType == 3)
                    this.$router.push({name: 'discoverDetail', params: {id: postid}})
                else if (postType == 0)
                    this.$toast(this.$t('center.no_post'));
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                let curMescroll = vm.$refs['mescroll' + vm.nowIndex];
                curMescroll && curMescroll.beforeRouteEnter()
            })
        },
        beforeRouteLeave(to, from, next) {
            let curMescroll = this.$refs['mescroll' + this.nowIndex];
            curMescroll && curMescroll.beforeRouteLeave()
            next()
        }
    }
</script>

<style lang='less'>
    @import '../../common/style/message.less';
</style>