<template>
	<section class="my_collection">
		<headTop :title="$t('center.my_collect')" :backBtn='true'></headTop>
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
		        	<mescroll-vue id="dataList0" ref="mescroll0" :down="getMescrollDown(0)" :up="getMescrollUp(0)" @init="mescrollInit(0,arguments)">
			        	<div class="news_list" v-for="(post,index) in tabs[0].list" :key="index">
			              <div class="news_item" @click="goto(post.postid)">
			                <div class="top" v-if="post.picVideo != 'onepic'">{{post.title}}</div>
			                <div class="middle" v-if="post.picVideo == 'video'">
			                  <video :src="post.video" controls></video>
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
			                  <span>{{post.nickname||post.uid}}</span>
			                  <span v-show="post.comments!=0">{{post.comments}}{{$t("news.com")}}</span>
			                  <span>{{post.created_time2}}</span>
			                </div>
			              </div>
			            </div>
			        </mescroll-vue>
		        </swiper-slide>
		        <swiper-slide>
		        	<mescroll-vue id="dataList1" ref="mescroll1" :down="getMescrollDown(1)" :up="getMescrollUp(1)" @init="mescrollInit(1,arguments)">
			        	<div class="information_list" v-for="(post,index) in tabs[1].list" :key="index">
				            <div class="information_item" @click="goto(post.id)" >
				              <div class="middle">
				                <div class="left_title">{{post.title}}</div>
				                <div class="right_img"><img :src="post.oneimg"></div>
				              </div>
				              <div class="bottom">
				                <span>{{post.nickname||post.uid}}</span>
				                <span>{{post.created_time2}}</span>
				              </div>
				            </div>
				        </div>
			        </mescroll-vue>
		        </swiper-slide>
		        <swiper-slide>
		        	<mescroll-vue id="dataList2" ref="mescroll2" :down="getMescrollDown(2)" :up="getMescrollUp(2)" @init="mescrollInit(2,arguments)">
			        	<div class="discover_list" v-for="(post,index) in tabs[2].list" :key="index">
				            <div class="discover_item" @click="goto(post.postid)">
				              <div class="author">
				                <div class="headimg"><img :src="post.headimg2"></div>
				                <div class="nickname">{{post.nickname||post.userid}}</div>
				                <div class="time">{{post.created_time2}}</div>
				              </div>
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
				              <div class="note">
				                <span class="browse"><van-icon name="eye-o" style="line-height: 34px;"/> {{post.seen}}</span>
				                <span class="com">
				                  <i class="iconfont icon-comment"></i>
				                  <span>{{post.comments}}</span>
				                </span>
				                <span class="like">
				                  <i class="iconfont icon-like"></i>
				                  <span>{{post.likes}}</span>
				                </span>
				              </div>
				            </div>
				        </div>
			        </mescroll-vue>
		        </swiper-slide>
	        </swiper>
	    </div>
	</section>
</template>

<script type="text/javascript">
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper'; //swiper的vue组件应用
import MescrollVue from 'mescroll.js/mescroll.vue';
import headTop from '../../components/headTop.vue';
import {time_post_list,time_post_detail} from '../../common/js/utils.js';
import default_img from '../../common/images/111.jpg';
import nodata from '../../common/images/nodata.png';
	export default {
		components: {
			headTop,
			swiper, //以组件的形式使用
      		swiperSlide, //以组件的形式使用
      		MescrollVue, //以组件的形式使用
		},
		computed: {
	      swiper () { // 轮播对象
	        return this.$refs.mySwiper.swiper
	      },
	    },
		data() {
			return {
				tabs: [
		          {name: 'util.news', mescroll: null, list: [], isListInit: false, num: 0}, 
		          {name: 'util.information', mescroll: null, list: [], isListInit: false, num: 0}, 
		          {name: 'util.discover', mescroll: null, list: [], isListInit: false, num: 0}, 
		        ],
		        nowIndex: 0, //当前tab的下标
		        swiperOption: { // 轮播配置
		          on: {
		            transitionEnd: () => {
		              this.changeTab(this.swiper.activeIndex)
		            }
		          }
		        },
		        actionSheet: false, //底部弹框
		        actions: [
		        {name: 'Cancel the collection'}
		        ],
			}
		},
		mounted() {
	      var cate = this.$refs.cate;
	      var swiperContent = this.$refs.mySwiper;
	      cate.style.top = (48 + api.safeArea.top) + 'px';
	      swiperContent.top = (92 + api.safeArea.top) + 'px';
	    },
		methods: {
			goto (id) {
		        this.$router.push({name: 'newsDetail', params: {id: id}})
		    },
			toNews(id) {
				this.$router.push({name: 'newsDetail', params: {id: id}});
			},
			toInform(id) {
				this.$router.push({name: 'informationDetail', params: {id: id}});
			},
			toDiscover(id) {
				this.$router.push({name: 'discoverDetail', params: {id: id}});
			},
			handleMore() {
				this.actionSheet = true;
			},
			onSelect() {
				this.actionSheet = false;
				this.$dialog.confirm({
					message: 'Be sure to delete?'
				}).then(() => {
					//执行删除操作
				}).catch(() => {

				});
			},
			onCancel() {

			},
			changeTab(tabIndex) {
		        if (this.nowIndex === tabIndex) return; // 避免重复调用
		        let nowTab = this.tabs[this.nowIndex];// 当前列表
        		let newTab = this.tabs[tabIndex];// 新转换的列表
		        this.nowIndex = tabIndex; // 切换菜单
		        this.swiper.slideTo(tabIndex,100,false);

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
		    getMescrollDown (tabIndex) {
		        let isAuto = tabIndex === 0; // 第一个mescroll传入true,列表自动加载
		        return {
		          auto: isAuto,
		          callback: this.downCallback
		        }
		    },
		        // mescroll上拉加载的配置
		    getMescrollUp (tabIndex) {
		        let emptyWarpId = 'dataList' + tabIndex;
		        return {
		          auto: false,
		          callback: this.upCallback,
		          empty: {
		            warpId: emptyWarpId, // 父布局的id;
		            icon: nodata,
		            tip: this.$t('util.data'), // 提示
		          },
		        }
		    },
		      // mescroll初始化的回调
		    mescrollInit (tabIndex, arg) {
		        this.tabs[tabIndex].mescroll = arg[0]; // 传入mescroll对象
		        this.tabs[tabIndex].mescroll.tabIndex = tabIndex; // 加入标记,便于在回调中取到对应的list
		    },
		    downCallback (mescroll) {
		    	this.tabs[mescroll.tabIndex].num = 0;
		        mescroll.resetUpScroll();// 触发下拉刷新的回调,加载第一页的数据
		    },
		    upCallback (page, mescroll) {
		    	var index = mescroll.tabIndex;
		        this.tabs[mescroll.tabIndex].isListInit = true;
		        if(this.tabs[mescroll.tabIndex].num==0) {
		        	this.$api.getAllFav(index+1).then(res => {
						let arr = res.data;
			            mescroll.endSuccess(arr.length);
			            this.tabs[mescroll.tabIndex].list = [];
			            this.tabs[mescroll.tabIndex].list = this.tabs[mescroll.tabIndex].list.concat(arr); 
			            this.handleList(this.tabs[mescroll.tabIndex].list,index);
			            this.tabs[mescroll.tabIndex].num++;
			        }).catch((e)=> {
			          if (this.tabs[mescroll.tabIndex].num == 0) this.tabs[mescroll.tabIndex].isListInit = false;
			          mescroll.endErr();
			        }) 
		        }else {
		    		let arr2 = [];
		    		mescroll.endSuccess(arr2.length);
		    		this.tabs[mescroll.tabIndex].list = this.tabs[mescroll.tabIndex].list.concat(arr2);
		    	}
		    },
		    handleList(postlist,index) {
		    	if(index == 0) { //分类情况 news
		    		for(let i=0; i<postlist.length; i++) { 
		    		//此处的postlist是指favor列表 ，不包括帖子的详情
		    	      this.$api.queryPostDetail(postlist[i].postid).then(res => {
				          postlist[i].title = res.data.title;
				          postlist[i].created_time2 = time_post_detail(res.data.created_time);
				          let con = res.data.content;
				          let urls = /('|")\/?(\b((?!https?|ftp|file:\/\/)\w)+\b)[-A-Za-z0-9+&@#/%?=~_|!:.;\\]+[-A-Za-z0-9+&@#/%=~_|]('|")/g;
				          con=con.replace(urls,function(a){
				            return '"http://myhomie.chinaxueyun.com'+a.substr(1);
				          });
				          let videoList = this.videoArr(con);
				          if(videoList.length!=0) { //有视频
				            postlist[i].picVideo = 'video';
				            postlist[i].video = videoList[0];
				          }else { //没有视频
				            let srcList = this.imgArr(con);
				            if(srcList.length == 0) postlist[i].picVideo = 'nopic';
				            else if(srcList.length < 3) {
				              postlist[i].picVideo = 'onepic';
				              postlist[i].srcList = srcList;
				            }
				            else if(srcList.length >= 3) {
				              postlist[i].picVideo = 'threepic';
				              postlist[i].srcList = srcList;
				            }
				          }
					  });
					}
		    	}
		    	if(index == 1) {
		    		for(let i=0; i<postlist.length; i++) {
		    		  this.$api.queryPostDetail(postlist[i].postid).then(res => {
				          postlist[i].title = res.data.title;
				          postlist[i].created_time2 = time_post_detail(res.data.created_time);
				          let con = res.data.content;
				          let urls = /('|")\/?(\b((?!https?|ftp|file:\/\/)\w)+\b)[-A-Za-z0-9+&@#/%?=~_|!:.;\\]+[-A-Za-z0-9+&@#/%=~_|]('|")/g;
					      con=con.replace(urls,function(a){
					        return '"http://myhomie.chinaxueyun.com'+a.substr(1);
					      });
				          let srcList = this.imgArr(con);
				          if(srcList.length == 0) postlist[i].oneimg = default_img;
				          else{
				            postlist[i].oneimg = srcList[0];
				          }
					  });
			        }
		    	}
		    	if(index == 2) {
		    		for(let i=0; i<postlist.length; i++) {
		    		  this.$api.queryPostDetail(postlist[i].postid).then(res => {
				          postlist[i].title = res.data.title;
				          postlist[i].seen = res.data.seen;
				          postlist[i].likes = res.data.likes;
				          postlist[i].headimg2 = this.url_config.domain + '/' + postlist[i].author.headimg;
				          postlist[i].created_time2 = time_post_detail(res.data.created_time);
				          let con = res.data.content;
				          let urls = /('|")\/?(\b((?!https?|ftp|file:\/\/)\w)+\b)[-A-Za-z0-9+&@#/%?=~_|!:.;\\]+[-A-Za-z0-9+&@#/%=~_|]('|")/g;
				          con=con.replace(urls,function(a){
				            return '"http://myhomie.chinaxueyun.com'+a.substr(1);
				          });
				          let srcList = this.imgArr(con);
				          if(srcList.length == 0) postlist[i].picVideo = 'nopic';
				          else if(srcList.length == 1) { 
				            postlist[i].picVideo = 'onepic';
				            postlist[i].srcList = srcList;
				          }
				          else if(srcList.length == 2||srcList.length == 4) {
				            postlist[i].picVideo = 'two_four';
				            postlist[i].srcList = srcList;
				          }
				          else if(srcList.length == 3||srcList.length > 4) {
				            postlist[i].picVideo = 'threepic';
				            postlist[i].srcList = srcList;
				          }
					  });
			        }
		    	}
		    },
		    imgArr(str) {
		        var imgReg = /<img.*?(?:>|\/>)/gi;
		        var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
		        var arr = str.match(imgReg);
		        if(arr !=null) {
		          var src = [];
		          for(var i = 0; i<arr.length; i++) {
		            var temp = arr[i].match(srcReg);
		            src.push(temp[1]);
		          }
		        }else src = [];
		        return src;
		    },
		    videoArr(str) {
		        var videoReg = /<video.*?(?:>|\/>)/gi;//  
		        var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i; // 
		        var arr = str.match(videoReg);
		        if(arr !=null) {
		          var src = [];
		          for(var i = 0; i<arr.length; i++) {
		            var temp = arr[i].match(srcReg);
		            src.push(temp[1]);
		          }
		        }else src = [];
		        return src;
		    }
		},
		beforeRouteEnter (to, from, next) {
	      next(vm => {
	        let curMescroll = vm.$refs['mescroll' + vm.nowIndex];
	        curMescroll && curMescroll.beforeRouteEnter()
	      })
	    },
	    beforeRouteLeave (to, from, next) {
	      let curMescroll = this.$refs['mescroll' + this.nowIndex];
	      curMescroll && curMescroll.beforeRouteLeave()
	      next()
	    }
	}
</script>

<style lang='less'>
@import '../../common/style/collection.less';
@import '../../common/style/newsItem.less';
</style>