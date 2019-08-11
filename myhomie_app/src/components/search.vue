<template>
    <div class="search">
        <form action="/" class="search_box" ref="search">
            <van-search ref="searchBox"
                        background="#fff"
                        v-model="searchValue"
                        :placeholder="$t('search.content')"
                        show-action
                        @search="onSearch"
                        @cancel="onCancel"
            />
        </form>
        <div class="topBlank" ref="top"></div>
        <div v-if="showSearchItem">
            <div class="hot_search">
                <div class="auto_title">{{$t('search.hot')}}</div>
                <div class="hot_list">
                    <span class="hot_item" v-for="hot in hotSearch" @click="searchThis(hot.item)">{{hot.item}}</span>
                </div>
            </div>
            <div class="my_search">
                <div class="auto_title">{{$t('search.my')}}
                    <span class="clear_all" @click="clearAll">{{$t('search.clear')}}</span>
                </div>
                <div class="search_item" v-show="index>0?my.item!=mySearch[index-1].item:my.item"
                     v-for="(my,index) in mySearch" :key="index">
                    <span class="item_name" @click="searchThis(my.item)">{{my.item}}</span>
                    <span class="delete_search" @click="deleteASearch(my.id,index)"><i class="iconfont icon-close"></i></span>
                </div>
            </div>
        </div>
        <div class="search_result left" v-if="!showSearchItem">
            <div class="null"
                 style="width: 100%; height: 50px;line-height: 50px;font-size: 16px;text-align: center; color: #333;"
                 v-show="noData">
                <img :src="noDataImg" style="display: block; margin: 20px auto 0;width: 40%;">
                {{$t('util.nodata')}}
            </div>
            <!--搜索结果为新闻-->
            <div class="news_list left" v-if="post_type==1" v-for="(post,index) in list" :key="index">
                <div class="news_item" @click="goto(post.id)">
                    <div class="top" v-if="post.picVideo != 'onepic'">{{post.title}}</div>
                    <div class="middle" v-if="post.picVideo == 'video'">
                        <video :src="post.video"></video>
                    </div>
                    <div class="middle" v-if="post.picVideo == 'onepic'">
                        <div class="left_title">{{post.title}}</div>
                        <div class="right_img"><img :src="post.srcList[0]"></div>
                    </div>
                    <div class="middle" v-if="post.picVideo == 'threepic'">
                        <div class="three_img"><img :src="post.srcList[0]"></div>
                        <div class="three_img"><img :src="post.srcList[1]"></div>
                        <div class="three_img"><img :src="post.srcList[2]"></div>
                    </div>
                    <div class="bottom">
                        <!-- <span class="tip">hot</span> -->
                        <span>{{post.author.nickname||post.uid}}</span>
                        <span v-show="post.comments!=0">{{post.comments}}{{$t('news.com')}}</span>
                        <span>{{post.created_time2}}</span>
                    </div>
                </div>
            </div>
            <!--搜索结果为信息-->
            <div class="information_list left" v-if="post_type==2" @click="goto(post.id)" v-for="(post,index) in list"
                 :key="post.id">
                <div class="information_item">
                    <div class="middle">
                        <div class="left_title">{{post.title}}</div>
                        <div class="right_img"><img :src="post.oneimg"></div>
                    </div>
                    <div class="bottom">
                        <span>{{post.author.nickname||post.uid}}</span>
                        <span>{{post.created_time2}}</span>
                    </div>
                </div>
            </div>
            <!--搜索结果为发现-->
            <div class="discover_list left" v-if="post_type==3" v-for="(post,index) in list" :key="post.id">
                <div class="discover_item">
                    <div class="author" @click="goto(post.id)">
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
                        <span class="browse"><van-icon name="eye-o"/> {{post.seen}}</span>
                        <span class="like" @click="likePost(index)"
                              :class="{'beorange':post.isPostLike}">
	                  <i class="iconfont icon-appreciate" :class="{'icon-appreciatefill':post.isPostLike}">
	                  </i>
	                  <span>{{post.likes+postLike[index]}}</span>
	                </span>
                        <span class="com">
	                  <i class="iconfont icon-comment"></i>
	                  <span>{{post.comments}}</span>
	                </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
    import Vue from 'vue';
    import {search} from 'vant';

    Vue.use(search);
    import {time_post_list, time_post_detail} from '../common/js/utils.js';
    import headTop from './headTop.vue';
    import default_img from '../common/images/111.jpg';
    import nodata from '../common/images/nosearch.png';

    export default {
        components: {
            headTop
        },
        data() {
            return {
                hotSearch: [],
                mySearch: [],
                searchValue: '',
                post_type: '',
                infor_category: '',
                showSearchItem: true,
                list: [],
                postLike: [],
                noData: false,
                noDataImg: nodata,
            }
        },
        watch: {
            searchValue() {
                if (this.searchValue == '') {
                    this.showSearchItem = true;
                    this.noData = false;
                }
            }
        },
        created() {
            this.init();
        },
        activated() {
            this.init();
            var top = this.$refs.top;
            top.style.height = (48 + api.safeArea.top) + 'px';
            var search = this.$refs.search;
            search.style.top = api.safeArea.top + 'px';
        },
        mounted() {
            var el = this.$refs.searchBox;
            el.focus();
            var top = this.$refs.top;
            top.style.height = (48 + api.safeArea.top) + 'px';
            var search = this.$refs.search;
            search.style.top = api.safeArea.top + 'px';
        },
        methods: {
            init() {
                this.post_type = this.$route.params.type;
                this.infor_category = this.$route.query.cate;
                console.log(this.infor_category);
                this.getHotSearch();
                this.getAllAvailableSearches();
            },
            getHotSearch() {
                this.$api.getHotSearch(this.post_type).then(res => {
                    this.hotSearch = res.data;
                })
            },
            getAllAvailableSearches() {
                this.$api.getAllAvailableSearches().then(res => {
                    this.mySearch = res.data;
                })
            },
            clearAll() {
                this.$api.deleteAllSearches().then(res => {
                });
                this.mySearch = [];
            },
            deleteASearch(id, index) {
                this.$api.deleteASearch(id).then(res => {
                });
                this.mySearch.splice(index, 1);
            },
            searchThis(item) {
                this.searchValue = item;
                this.showSearchItem = false;
                var type = this.post_type;
                var category = this.infor_category;
                if (type == 2) {
                    this.$api.queryPostsBySearchItem('&category=' + category + '&item=' + item + '&post_type=' + this.post_type).then(res => {
                        this.list = res.data;
                        if (res.data.length == 0) {
                            this.noData = true;
                        } else this.noData = false;
                        this.handlePostList2(this.list);
                        this.mySearch.splice(0, 0, item);
                    })
                } else {
                    this.$api.queryPostsBySearchItem('&item=' + item + '&post_type=' + this.post_type).then(res => {
                        this.list = res.data;
                        if (res.data.length == 0) {
                            this.noData = true;
                        } else this.noData = false;
                        if (this.post_type == 1) {
                            this.handlePostList1(this.list);
                        }
                        if (this.post_type == 3) {
                            this.handlePostList3(this.list);
                        }
                        this.mySearch.splice(0, 0, item);
                    })
                }
            },
            onSearch() {
                this.showSearchItem = false;
                var item = this.searchValue;
                var type = this.post_type;
                this.$api.queryPostsBySearchItem('&item=' + item + '&post_type =' + this.post_type).then(res => {
                    this.list = res.data;
                    if (res.data.length == 0) {
                        this.noData = true;
                    } else this.noData = false;
                    if (this.post_type == 1) {
                        this.handlePostList1(this.list);
                    }
                    if (this.post_type == 2) {
                        this.handlePostList2(this.list);
                    }
                    if (this.post_type == 3) {
                        this.handlePostList3(this.list);
                    }
                    this.mySearch.splice(0, 0, item);
                })
            },
            handlePostList1(list) {
                for (let i = 0; i < list.length; i++) {
                    list[i].created_time2 = time_post_detail(list[i].created_time);
                    let con = list[i].content;
                    let urls = /('|")\/?(\b((?!https?|ftp|file:\/\/)\w)+\b)[-A-Za-z0-9+&@#/%?=~_|!:.;\\]+[-A-Za-z0-9+&@#/%=~_|]('|")/g;
                    con = con.replace(urls, function (a) {
                        return '"http://myhomie.chinaxueyun.com' + a.substr(1);
                    });
                    let videoList = this.videoArr(con);
                    if (videoList.length != 0) {
                        list[i].picVideo = 'video';
                        list[i].video = videoList[0];
                    } else { //没有视频
                        let srcList = this.imgArr(con);
                        if (srcList.length == 0) list[i].picVideo = 'nopic';
                        else if (srcList.length < 3) {
                            list[i].picVideo = 'onepic';
                            list[i].srcList = srcList;
                        } else if (srcList.length >= 3) {
                            list[i].picVideo = 'threepic';
                            list[i].srcList = srcList;
                        }
                    }
                }
            },
            handlePostList2(postlist) {
                for (let i = 0; i < postlist.length; i++) {
                    postlist[i].created_time2 = time_post_detail(postlist[i].created_time);
                    let con = postlist[i].content;
                    let urls = /('|")\/?(\b((?!https?|ftp|file:\/\/)\w)+\b)[-A-Za-z0-9+&@#/%?=~_|!:.;\\]+[-A-Za-z0-9+&@#/%=~_|]('|")/g;
                    con = con.replace(urls, function (a) {
                        return '"http://myhomie.chinaxueyun.com' + a.substr(1);
                    });
                    let srcList = this.imgArr(con);
                    if (srcList.length == 0) postlist[i].oneimg = default_img;
                    else {
                        postlist[i].oneimg = srcList[0];
                    }
                }
            },
            handlePostList3(postlist) {
                for (let i = 0; i < postlist.length; i++) {
                    postlist[i].headimg2 = this.url_config.domain + '/' + postlist[i].author.headimg;
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
                    console.log(res.status_code);
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
                var imgReg = /<img.*?(?:>|\/>)/gi;//
                var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i; //
                var arr = str.match(imgReg);
                if (arr != null) {
                    var src = [];
                    for (var i = 0; i < arr.length; i++) {
                        var temp = arr[i].match(srcReg);
                        src.push(temp[1]);
                    }
                } else src = [];
                return src;
            },
            videoArr(str) {
                var videoReg = /<video.*?(?:>|\/>)/gi;//
                var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i; //
                var arr = str.match(videoReg);
                if (arr != null) {
                    var src = [];
                    for (var i = 0; i < arr.length; i++) {
                        var temp = arr[i].match(srcReg);
                        src.push(temp[1]);
                    }
                } else src = [];
                return src;
            },
            onCancel() {
                this.$router.go(-1);
            },
            goto(postid) {
                if (this.post_type == 1) {
                    this.$router.push({name: 'newsDetail', params: {id: postid}})
                }
                if (this.post_type == 2) {
                    this.$router.push({name: 'informationDetail', params: {id: postid}})
                }
                if (this.post_type == 3) {
                    this.$router.push({name: 'discoverDetail', params: {id: postid}})
                }
            }
        }
    }
</script>

<style type="text/css" lang="less" scoped>
    @import '../common/style/search.less';
    @import '../common/style/newsItem.less';
</style>