<template>
  <section class="informationList">
  	<headTop :title="inforType" v-bind:backBtn='true'>
  		<span class="header_right" slot="right">
          <i class="iconfont icon-search" @click="search" style="font-size: 20px;"></i>
      </span>
  	</headTop>
    <!--swiper内容-->
    <div class="container">
      <div class="information_container" ref="container">
        <mescroll-vue id="dataList" ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
          <!--information列表-->
          <div class="information_list" v-for="(post,index) in list" :key="post.id">
            <div class="information_item">
              <div class="middle" @click="goto(post.id)">
                <div class="left_title">{{post.title}}</div>
                <div class="right_img"><img :src="post.oneimg"></div>
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
  import {time_post_list,time_post_detail} from '../../common/js/utils.js';
  import report from '../../components/report.vue';
  import default_img from '../../common/images/111.jpg';
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
        mescroll: null, // mescroll实例对象
        mescrollDown:{
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
            warpId : 'dataList' , 
            icon : nodata, 
            tip : this.$t('util.data') , 
            btntext : "" , 
          }
        },
        inforType: this.$route.query.name,
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
        console.log(this.show);
      },
      onCancel() {

      },
      handleReport(val) {
        this.show = val;
      },
      search() {
        this.$router.push({name: 'search', params: {type: 2}, query: {cate: this.$route.params.type}});
      },
      goto (id) {
        this.$router.push({name: 'informationDetail', params: {id: id}})
      },
      mescrollInit (mescroll) {
        this.mescroll = mescroll;
      },
      downCallback (mescroll) {
        mescroll.setPageNum(1);
        mescroll.resetUpScroll();
      },
      upCallback (page, mescroll) {
        let startPage = page.num-1;
        let queryCategory = this.$route.params.type;
        this.$api.queryPosts('sort=latest&category='+queryCategory+'&startPage='+startPage+'&post_type=2').then(res => {
          let arr = res.data;
          mescroll.endSuccess(arr.length);
          if (startPage === 0) this.list = []; 
          this.list = this.list.concat(arr); 
          this.handlePostList(this.list);
        }).catch((e)=> {
          mescroll.endErr();
        }) 
      },
      handlePostList(postlist) {
        for(let i=0; i<postlist.length; i++) {
          postlist[i].created_time2 = time_post_detail(postlist[i].created_time);
          let con = postlist[i].content;
          // con = con.replace(/src="/g,'src="http://myhomie.chinaxueyun.com/');
          let srcList = this.imgArr(con);
          if(srcList.length == 0) postlist[i].oneimg = default_img;
          else{
            postlist[i].oneimg = srcList[0];
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
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$refs.mescroll && vm.$refs.mescroll.beforeRouteEnter()
      })
    },
    beforeRouteLeave (to, from, next) { // 
      this.$refs.mescroll && this.$refs.mescroll.beforeRouteLeave()
      next()
    }
  }
</script>

<style lang="less">
@import '../../common/style/information.less';
</style>