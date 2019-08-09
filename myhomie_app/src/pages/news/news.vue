<template>
  <section class="news">
    <!--headTop内容-->
    <headTop v-bind:headBtn='false'>
      <span class="header_search" slot="search" @click="search">
        <i class="iconfont icon-search"></i>
        <span>say something</span>
      </span>
      <span class="header_right" slot="right">
        <span class="title_text">HangZhou</span>
        <i class="iconfont icon-unfold"></i>
      </span>
    </headTop>
    <!--顶部的分类category-->
    <div ref="tabsContent" class="category">
      <div style="display:inline-block">
        <div class="category_list">
          <span :ref="tab.ref" class="category_item" v-for="(tab,index) in tabs"
          :class="{active:nowIndex === index}" @click="changeTab(index)">
          {{$t(tab.name)}}</span>
        </div>
      </div>
    </div>
    </van-popup> -->
    <!--swiper内容-->
    <div class="container">
      <!--轮播-->
      <swiper ref="mySwiper" :options="swiperOption">
        <!--首页-->
        <swiper-slide>
          <mescroll-vue id="dataList0" ref="mescroll0" :down="getMescrollDown(0)" :up="getMescrollUp(0)" @init="mescrollInit(0,arguments)">
            <div class="news_list" v-for="(post,index) in tabs[0].list" :key="index">
              <div class="news_item">
                <div class="top" @click="goto(post.id)" v-if="post.picVideo != 'onepic'">{{post.title}}</div>
                <div class="middle" @click="goto(post.id)" v-if="post.picVideo == 'video'">
                  <video :src="post.video" controls controlsList="nodownload"></video>
                </div>
                <div class="middle" @click="goto(post.id)" v-if="post.picVideo == 'onepic'">
                  <div class="left_title">{{post.title}}</div>
                  <div class="right_img"><img :src="post.srcList[0]"></div>
                </div>
                <div class="middle" @click="goto(post.id)" v-if="post.picVideo == 'threepic'">
                  <div class="three_img"><img :src="post.srcList[0]"></div>
                  <div class="three_img"><img :src="post.srcList[1]"></div>
                  <div class="three_img"><img :src="post.srcList[2]"></div>
                </div>
                <div class="bottom">
                  <!-- <span class="tip">hot</span> -->
                  <span>{{post.author.nickname||post.uid}}</span>
                  <span v-show="post.comments!=0">{{post.comments}}{{$t("news.com")}}</span>
                  <span>{{post.created_time2}}</span>
                  <span class="more" @click="complaint(post.id)"><van-icon name="ellipsis" /></span>
                </div>
              </div>
            </div>
          </mescroll-vue>
        </swiper-slide>
        <!--中文-->
        <swiper-slide>
          <mescroll-vue id="dataList1" ref="mescroll1" :down="getMescrollDown(1)" :up="getMescrollUp(1)" @init="mescrollInit(1,arguments)">
            <div class="news_list" v-for="(post,index) in tabs[1].list" :key="index">
              <div class="news_item">
                <div class="top" @click="goto(post.id)" v-if="post.picVideo != 'onepic'">{{post.title}}</div>
                <div class="middle" @click="goto(post.id)" v-if="post.picVideo == 'video'">
                  <video :src="post.video" controls controlsList="nodownload"></video>
                </div>
                <div class="middle" @click="goto(post.id)" v-if="post.picVideo == 'onepic'">
                  <div class="left_title">{{post.title}}</div>
                  <div class="right_img"><img :src="post.srcList[0]"></div>
                </div>
                <div class="middle" @click="goto(post.id)" v-if="post.picVideo == 'threepic'">
                  <div class="three_img"><img :src="post.srcList[0]"></div>
                  <div class="three_img"><img :src="post.srcList[1]"></div>
                  <div class="three_img"><img :src="post.srcList[2]"></div>
                </div>
                <div class="bottom">
                  <!-- <span class="tip">hot</span> -->
                  <span>{{post.author.nickname||post.uid}}</span>
                  <span v-show="post.comments!=0">{{post.comments}}{{$t('news.com')}}</span>
                  <span>{{post.created_time2}}</span>
                  <span class="more" @click="complaint(post.id)"><van-icon name="ellipsis" /></span>
                </div>
              </div>
            </div>
          </mescroll-vue>
        </swiper-slide>
        <!--第三个tab-->
        <swiper-slide>
          <mescroll-vue id="dataList2" ref="mescroll2" :down="getMescrollDown(2)" :up="getMescrollUp(2)" @init="mescrollInit(2,arguments)">
            <div class="news_list" v-for="(post,index) in tabs[2].list" :key="index">
              <div class="news_item">
                <div class="top" @click="goto(post.id)" v-if="post.picVideo != 'onepic'">{{post.title}}</div>
                <div class="middle" @click="goto(post.id)" v-if="post.picVideo == 'video'">
                  <video :src="post.video" controls controlsList="nodownload"></video>
                </div>
                <div class="middle" @click="goto(post.id)" v-if="post.picVideo == 'onepic'">
                  <div class="left_title">{{post.title}}</div>
                  <div class="right_img"><img :src="post.srcList[0]"></div>
                </div>
                <div class="middle" @click="goto(post.id)" v-if="post.picVideo == 'threepic'">
                  <div class="three_img"><img :src="post.srcList[0]"></div>
                  <div class="three_img"><img :src="post.srcList[1]"></div>
                  <div class="three_img"><img :src="post.srcList[2]"></div>
                </div>
                <div class="bottom">
                  <!-- <span class="tip">hot</span> -->
                  <span>{{post.author.nickname||post.uid}}</span>
                  <span v-show="post.comments!=0">{{post.comments}}{{$t('news.com')}}</span>
                  <span>{{post.created_time2}}</span>
                  <span class="more" @click="complaint(post.id)"><van-icon name="ellipsis" /></span>
                </div>
              </div>
            </div>
          </mescroll-vue>
        </swiper-slide>
        <!--第四个tab-->
        <swiper-slide>
          <mescroll-vue id="dataList3" ref="mescroll3" :down="getMescrollDown(3)" :up="getMescrollUp(3)" @init="mescrollInit(3,arguments)">
            <div class="news_list" v-for="(post,index) in tabs[3].list" :key="index">
              <div class="news_item">
                <div class="top" @click="goto(post.id)" v-if="post.picVideo != 'onepic'">{{post.title}}</div>
                <div class="middle" @click="goto(post.id)" v-if="post.picVideo == 'video'">
                  <video :src="post.video" controls controlsList="nodownload"></video>
                </div>
                <div class="middle" @click="goto(post.id)" v-if="post.picVideo == 'onepic'">
                  <div class="left_title">{{post.title}}</div>
                  <div class="right_img"><img :src="post.srcList[0]"></div>
                </div>
                <div class="middle" @click="goto(post.id)" v-if="post.picVideo == 'threepic'">
                  <div class="three_img"><img :src="post.srcList[0]"></div>
                  <div class="three_img"><img :src="post.srcList[1]"></div>
                  <div class="three_img"><img :src="post.srcList[2]"></div>
                </div>
                <div class="bottom">
                  <!-- <span class="tip">hot</span> -->
                  <span>{{post.author.nickname||post.uid}}</span>
                  <span v-show="post.comments!=0">{{post.comments}}{{$t('news.com')}}</span>
                  <span>{{post.created_time2}}</span>
                  <span class="more" @click="complaint(post.id)"><van-icon name="ellipsis" /></span>
                </div>
              </div>
            </div>
          </mescroll-vue>
        </swiper-slide>
        <!--第五个tab-->
        <swiper-slide>
          <mescroll-vue id="dataList4" ref="mescroll4" :down="getMescrollDown(4)" :up="getMescrollUp(4)" @init="mescrollInit(4,arguments)">
            <div class="news_list" v-for="(post,index) in tabs[4].list" :key="index">
              <div class="news_item">
                <div class="top" @click="goto(post.id)" v-if="post.picVideo != 'onepic'">{{post.title}}</div>
                <div class="middle" @click="goto(post.id)" v-if="post.picVideo == 'video'">
                  <video :src="post.video" controls controlsList="nodownload"></video>
                </div>
                <div class="middle" @click="goto(post.id)" v-if="post.picVideo == 'onepic'">
                  <div class="left_title">{{post.title}}</div>
                  <div class="right_img"><img :src="post.srcList[0]"></div>
                </div>
                <div class="middle" @click="goto(post.id)" v-if="post.picVideo == 'threepic'">
                  <div class="three_img"><img :src="post.srcList[0]"></div>
                  <div class="three_img"><img :src="post.srcList[1]"></div>
                  <div class="three_img"><img :src="post.srcList[2]"></div>
                </div>
                <div class="bottom">
                  <!-- <span class="tip">hot</span> -->
                  <span>{{post.author.nickname||post.uid}}</span>
                  <span v-show="post.comments!=0">{{post.comments}}{{$t('news.com')}}</span>
                  <span>{{post.created_time2}}</span>
                  <span class="more" @click="complaint(post.id)"><van-icon name="ellipsis" /></span>
                </div>
              </div>
            </div>
          </mescroll-vue>
        </swiper-slide>
        <!--第六个tab-->
        <swiper-slide>
          <mescroll-vue id="dataList5" ref="mescroll5" :down="getMescrollDown(5)" :up="getMescrollUp(5)" @init="mescrollInit(5,arguments)">
            <div class="news_list" v-for="(post,index) in tabs[5].list" :key="index">
              <div class="news_item">
                <div class="top" @click="goto(post.id)" v-if="post.picVideo != 'onepic'">{{post.title}}</div>
                <div class="middle" @click="goto(post.id)" v-if="post.picVideo == 'video'">
                  <video :src="post.video" controls controlsList="nodownload"></video>
                </div>
                <div class="middle" @click="goto(post.id)" v-if="post.picVideo == 'onepic'">
                  <div class="left_title">{{post.title}}</div>
                  <div class="right_img"><img :src="post.srcList[0]"></div>
                </div>
                <div class="middle" @click="goto(post.id)" v-if="post.picVideo == 'threepic'">
                  <div class="three_img"><img :src="post.srcList[0]"></div>
                  <div class="three_img"><img :src="post.srcList[1]"></div>
                  <div class="three_img"><img :src="post.srcList[2]"></div>
                </div>
                <div class="bottom">
                  <!-- <span class="tip">hot</span> -->
                  <span>{{post.author.nickname||post.uid}}</span>
                  <span v-show="post.comments!=0">{{post.comments}}{{$t('news.com')}}</span>
                  <span>{{post.created_time2}}</span>
                  <span class="more" @click="complaint(post.id)"><van-icon name="ellipsis" /></span>
                </div>
              </div>
            </div>
          </mescroll-vue>
        </swiper-slide>
        <!--第七个tab-->
        <swiper-slide>
          <mescroll-vue id="dataList6" ref="mescroll6" :down="getMescrollDown(6)" :up="getMescrollUp(6)" @init="mescrollInit(6,arguments)">
            <div class="news_list" v-for="(post,index) in tabs[6].list" :key="index">
              <div class="news_item">
                <div class="top" @click="goto(post.id)" v-if="post.picVideo != 'onepic'">{{post.title}}</div>
                <div class="middle" @click="goto(post.id)" v-if="post.picVideo == 'video'">
                  <video :src="post.video" controls controlsList="nodownload"></video>
                </div>
                <div class="middle" @click="goto(post.id)" v-if="post.picVideo == 'onepic'">
                  <div class="left_title">{{post.title}}</div>
                  <div class="right_img"><img :src="post.srcList[0]"></div>
                </div>
                <div class="middle" @click="goto(post.id)" v-if="post.picVideo == 'threepic'">
                  <div class="three_img"><img :src="post.srcList[0]"></div>
                  <div class="three_img"><img :src="post.srcList[1]"></div>
                  <div class="three_img"><img :src="post.srcList[2]"></div>
                </div>
                <div class="bottom">
                  <!-- <span class="tip">hot</span> -->
                  <span>{{post.author.nickname||post.uid}}</span>
                  <span v-show="post.comments!=0">{{post.comments}}{{$t('news.com')}}</span>
                  <span>{{post.created_time2}}</span>
                  <span class="more" @click="complaint(post.id)"><van-icon name="ellipsis" /></span>
                </div>
              </div>
            </div>
          </mescroll-vue>
        </swiper-slide>
        <swiper-slide>
          <mescroll-vue id="dataList7" ref="mescroll7" :down="getMescrollDown(7)" :up="getMescrollUp(7)" @init="mescrollInit(7,arguments)">
            <div class="news_list" v-for="(post,index) in tabs[7].list" :key="index">
              <div class="news_item">
                <div class="top" @click="goto(post.id)" v-if="post.picVideo != 'onepic'">{{post.title}}</div>
                <div class="middle" @click="goto(post.id)" v-if="post.picVideo == 'video'">
                  <video :src="post.video" controls controlsList="nodownload"></video>
                </div>
                <div class="middle" @click="goto(post.id)" v-if="post.picVideo == 'onepic'">
                  <div class="left_title">{{post.title}}</div>
                  <div class="right_img"><img :src="post.srcList[0]"></div>
                </div>
                <div class="middle" @click="goto(post.id)" v-if="post.picVideo == 'threepic'">
                  <div class="three_img"><img :src="post.srcList[0]"></div>
                  <div class="three_img"><img :src="post.srcList[1]"></div>
                  <div class="three_img"><img :src="post.srcList[2]"></div>
                </div>
                <div class="bottom">
                  <!-- <span class="tip">hot</span> -->
                  <span>{{post.author.nickname||post.uid}}</span>
                  <span v-show="post.comments!=0">{{post.comments}}{{$t('news.com')}}</span>
                  <span>{{post.created_time2}}</span>
                  <span class="more" @click="complaint(post.id)"><van-icon name="ellipsis" /></span>
                </div>
              </div>
            </div>
          </mescroll-vue>
        </swiper-slide>
        <swiper-slide>
          <mescroll-vue id="dataList8" ref="mescroll8" :down="getMescrollDown(8)" :up="getMescrollUp(8)" @init="mescrollInit(8,arguments)">
            <div class="news_list" v-for="(post,index) in tabs[8].list" :key="index">
              <div class="news_item">
                <div class="top" @click="goto(post.id)" v-if="post.picVideo != 'onepic'">{{post.title}}</div>
                <div class="middle" @click="goto(post.id)" v-if="post.picVideo == 'video'">
                  <video :src="post.video" controls controlsList="nodownload"></video>
                </div>
                <div class="middle" @click="goto(post.id)" v-if="post.picVideo == 'onepic'">
                  <div class="left_title">{{post.title}}</div>
                  <div class="right_img"><img :src="post.srcList[0]"></div>
                </div>
                <div class="middle" @click="goto(post.id)" v-if="post.picVideo == 'threepic'">
                  <div class="three_img"><img :src="post.srcList[0]"></div>
                  <div class="three_img"><img :src="post.srcList[1]"></div>
                  <div class="three_img"><img :src="post.srcList[2]"></div>
                </div>
                <div class="bottom">
                  <!-- <span class="tip">hot</span> -->
                  <span>{{post.author.nickname||post.uid}}</span>
                  <span v-show="post.comments!=0">{{post.comments}}{{$t('news.com')}}</span>
                  <span>{{post.created_time2}}</span>
                  <span class="more" @click="complaint(post.id)"><van-icon name="ellipsis" /></span>
                </div>
              </div>
            </div>
          </mescroll-vue>
        </swiper-slide>
      </swiper>
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
    <!--swiper结束-->
  </section>
</template>

<script>
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.css';
  import { swiper, swiperSlide } from 'vue-awesome-swiper'; //swiper的vue组件应用
  import MescrollVue from 'mescroll.js/mescroll.vue';
  import headTop from '../../components/headTop.vue';
  import report from '../../components/report.vue';
  import {time_post_list,time_post_detail} from '../../common/js/utils.js';
  import nodata from '../../common/images/nodata.png';
  export default {
    components: {
      headTop,
      swiper, //以组件的形式使用
      swiperSlide, //以组件的形式使用
      MescrollVue, //以组件的形式使用
      report,
    },
    computed: {
      swiper () { // 轮播对象
        return this.$refs.mySwiper.swiper
      },
    },
    data() {
      return {
        tabs: [
          {name: 'news.item1', mescroll: null, list: [], isListInit: false, num: 0, ref: 'item0', val: 'hot'},
          {name: 'news.item2', mescroll: null, list: [], isListInit: false, num: 0, ref: 'item1', val: 'daily'},
          {name: 'news.item3', mescroll: null, list: [], isListInit: false, num: 0, ref: 'item2', val: 'arts'},
          {name: 'news.item4', mescroll: null, list: [], isListInit: false, num: 0, ref: 'item3', val: 'sports'},
          {name: 'news.item5', mescroll: null, list: [], isListInit: false, num: 0, ref: 'item4', val: 'business'},
          {name: 'news.item6', mescroll: null, list: [], isListInit: false, num: 0, ref: 'item5', val: 'culture'},
          {name: 'news.item7', mescroll: null, list: [], isListInit: false, num: 0, ref: 'item6', val: 'policy'},
          {name: 'news.item8', mescroll: null, list: [], isListInit: false, num: 0, ref: 'item7', val: 'sci-tech'},
          {name: 'news.item9', mescroll: null, list: [], isListInit: false, num: 0, ref: 'item8', val: 'others'},
        ],
        tabScrollLeft: 0, // 菜单滚动条的位置
        show: false,
        nowIndex: 0, //当前tab的下标
        swiperOption: { // 轮播配置
          on: {
            transitionEnd: () => {
              this.changeTab(this.swiper.activeIndex)
            }
          }
        },
        actionsheet: false,
        actions: [
            {name: this.$t('report.report')}
        ],
        reportId: '',
      }
    },
    mounted() {
      var cate = this.$refs.tabsContent;
      var swiperContent = this.$refs.mySwiper;
      cate.style.top = (48 + api.safeArea.top) + 'px';
      swiperContent.top = (92 + api.safeArea.top) + 'px';
    },
    methods: {
      search() {
        this.$router.push({name: 'search', params: {type: 1}});
      },
      complaint(id) {
        this.actionsheet = true;
        this.reportId = id;
      },
      onSelect() {
        this.actionsheet = false;
        this.show = true;
        console.log(this.show);
      },
      onCancel() {

      },
      handleReport(val) {
        this.show = val;
        console.log(this.show);
      },
      goto (id) {
        this.$router.push({name: 'newsDetail', params: {id: id}})
      },
      changeTab(tabIndex) {
        if (this.nowIndex === tabIndex) return; // 避免重复调用
        let nowTab = this.tabs[this.nowIndex];// 当前列表
        let newTab = this.tabs[tabIndex];// 新转换的列表
        nowTab.mescroll && nowTab.mescroll.hideTopBtn(); // 隐藏当前列表的回到顶部按钮
        this.nowIndex = tabIndex; // 切换菜单
        this.swiper.slideTo(tabIndex,100,false);
        // 菜单项居中动画
        if (nowTab.mescroll) {
          let tabsContent = this.$refs.tabsContent;
          let tabDom = this.$refs[this.tabs[tabIndex].ref];//获取dom
          let star = this.tabScrollLeft;//当前位置0
          let end = tabDom[0].offsetLeft + tabDom[0].clientWidth / 2 - document.body.clientWidth / 2;//居中
          this.tabScrollLeft = end;
          nowTab.mescroll.getStep(star, end, function (step) {
            tabsContent.scrollLeft = step; //从当前位置逐渐移动到中间位置,默认时长300ms
          });
        }
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
          callback: this.upCallback, // 上拉回调,此处可简写; 相当于 callback: function (page) { upCallback(page); }
          noMoreSize: 4,
          empty: {
            warpId: emptyWarpId, // 父布局的id;
            icon: nodata, // 图标,默认null
            tip: this.$t('util.data'), // 提示
          },
          toTop: { // 配置回到顶部按钮
            src: 'http://www.mescroll.com/img/mescroll-totop.png' // 图片路径,默认null (建议写成网络图,不必考虑相对路径)
          }
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
        this.tabs[mescroll.tabIndex].isListInit = true;//标记列表已初始化,保证列表只初始化一次
        let index = mescroll.tabIndex; //当前为哪个页面
        let queryCategory = this.tabs[mescroll.tabIndex].val;
        let startPage = this.tabs[mescroll.tabIndex].num;
        if(index==0) {
          this.$api.queryPosts('sort=hot&startPage='+startPage+'&post_type=1').then(res => {
            let arr = res.data;
            mescroll.endSuccess(arr.length);
            if (startPage === 0) this.tabs[mescroll.tabIndex].list = []; 
            this.tabs[mescroll.tabIndex].list = this.tabs[mescroll.tabIndex].list.concat(arr); 
            this.handlePostList(mescroll.tabIndex);
            this.tabs[mescroll.tabIndex].num++;
          }).catch((e)=> {
            if (startPage === 0) this.tabs[mescroll.tabIndex].isListInit = false;
            mescroll.endErr();
          }) 
        }else {
          this.$api.queryPosts('sort=latest&category='+queryCategory+'&startPage='+startPage+'&post_type=1').then(res => {
            let arr = res.data;
            mescroll.endSuccess(arr.length);
            if (startPage === 0) this.tabs[mescroll.tabIndex].list = []; 
            this.tabs[mescroll.tabIndex].list = this.tabs[mescroll.tabIndex].list.concat(arr); 
            this.handlePostList(mescroll.tabIndex);
            this.tabs[mescroll.tabIndex].num++;
          }).catch((e)=> {
            if (startPage === 0) this.tabs[mescroll.tabIndex].isListInit = false;
            mescroll.endErr();
          }) 
        }
      },
      handlePostList(index) {
        for(let i=0; i<this.tabs[index].list.length; i++) {
          // let form = new FormData();
          // form.append("postid", this.tabs[index].list[i].id);
          // this.$api.getGroupComments(form).then(res => {
          //   this.$set(this.tabs[index].list[i],'comments',res.data.length);
          // });
          // this.$api.getUserInfoById(this.tabs[index].list[i].userid).then(res => {
          //   this.$set(this.tabs[index].list[i],'author.nickname',res.data.author.nickname);
          // });
          this.tabs[index].list[i].created_time2 = time_post_detail(this.tabs[index].list[i].created_time);
          let con = this.tabs[index].list[i].content;
          let urls = /('|")\/?(\b((?!https?|ftp|file:\/\/)\w)+\b)[-A-Za-z0-9+&@#/%?=~_|!:.;\\]+[-A-Za-z0-9+&@#/%=~_|]('|")/g;
          con=con.replace(urls,function(a){
            return '"http://myhomie.chinaxueyun.com'+a.substr(1);
          });
          let videoList = this.videoArr(con);
          if(videoList.length!=0){
            this.tabs[index].list[i].picVideo = 'video';
            this.tabs[index].list[i].video = videoList[0];
          }else { //没有视频
            let srcList = this.imgArr(con);
            if(srcList.length == 0) this.tabs[index].list[i].picVideo = 'nopic';
            else if(srcList.length < 3) {
              this.tabs[index].list[i].picVideo = 'onepic';
              this.tabs[index].list[i].srcList = srcList;
            }
            else if(srcList.length >= 3) {
              this.tabs[index].list[i].picVideo = 'threepic';
              this.tabs[index].list[i].srcList = srcList;
            }
          }
        }
      },
      imgArr(str) {
        var imgReg = /<img.*?(?:>|\/>)/gi;//  
        var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i; // 
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
        if (vm.$refs.tabsContent) vm.$refs.tabsContent.scrollLeft = vm.tabScrollLeft;
      })
    },
    beforeRouteLeave (to, from, next) {
      let curMescroll = this.$refs['mescroll' + this.nowIndex];
      curMescroll && curMescroll.beforeRouteLeave()
      next()
    }
  }
</script>

<style lang="less">
@import '../../common/style/news.less';
@import '../../../node_modules/mescroll.js/mescroll.min.css';
@import '../../common/style/newsItem.less';
</style>