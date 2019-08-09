<template>
  <section class="center">
    <!--个人背景页+简要信息，可更换背景图片-->
    <div class="center_header">
      <div class="bg_img" @click="isLogin?show=!show:show=show"><!--背景页，点击更换图片-->
        <img :src="bgimg">
      </div>
      <input type="file" accept="jpg/png/jpeg" ref="bg_input" class="bg_input" @change="handleChange">
      <van-popup v-model="show">
        <div style="font-size: 16px;padding: 10px 15px; color: #333;" @click="change_bg">{{$t("center.change_bgimg")}}</div>
      </van-popup>
      <div class="headimg" @click="toProfile"><img :src="headimg"></div>
      <div class="head_content">
        <span class="login_regis" v-show="!isLogin" @click="goto('/login_register')">{{$t("center.login_register")}}</span>
        <div class="inform" v-show="isLogin">
          <span class="name">{{nickname}}</span><br>
          <span class="sign">{{signature}}</span>
        </div>
      </div>
    </div>
    <!--发布，评论，收藏-->
    <div class="substance">
      <div class="sub_item" @click="goto('/release')">
        <i class="iconfont icon-post"></i>
        <span>{{$t("center.my_publish")}}</span>
      </div>
      <div class="sub_item" @click="goto('/myComment')">
        <i class="iconfont icon-comment"></i>
        <span>{{$t("center.my_comment")}}</span>
      </div>
      <div class="sub_item" @click="goto('/collection')">
        <i class="iconfont icon-favor"></i>
        <span>{{$t("center.my_collect")}}</span>
      </div>
    </div>
    <van-cell-group style="margin-top: 20px">
      <van-cell is-link to="/private">
        <template slot="title">
          <i class="iconfont icon-evaluate"></i>
          <span class="custom-text">{{$t("center.private")}}</span>
        </template>
      </van-cell>
      <van-cell is-link to="/message">
        <template slot="title">
          <i class="iconfont icon-message"></i>
          <span class="custom-text">{{$t("center.notice")}}</span>
        </template>
      </van-cell>
      <van-cell is-link to="/setting">
        <template slot="title">
          <i class="iconfont icon-edit"></i>
          <span class="custom-text">{{$t("center.setting")}}</span>
        </template>
      </van-cell>
    </van-cell-group>
    <div class="bottomBlank"></div>
  </section>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      isLogin: false,
      show: false,
      nickname: '',
      signature: '',
      headimg: '',
      bgimg: '',
    }
  },
  created() {
    this.$api.getUserInfo().then(res => {
      if(res.status_code == '1') {
        this.isLogin = true;
        let result = res.data;
        if(result.nickname != null) this.nickname = result.nickname;
        else if(result.nickname == null) this.nickname = 'who are you';
        if(result.signature != null) this.signature = result.signature;
        if(result.headimg == null) this.headimg = this.url_config.default_headimg_url;
        else if(result.headimg != null) this.headimg = this.url_config.domain + '/' +result.headimg;
        if(result.bgimg == null) this.bgimg = this.url_config.default_bgimg_url;
        else if(result.bgimg != null) this.bgimg = this.url_config.domain + '/' + result.bgimg;
      }else {
        this.isLogin = false;
        this.headimg = this.url_config.default_headimg_url;
        this.bgimg = this.url_config.default_bgimg_url;
      }
    });
  },
  methods: {
    toProfile() {
      if(this.isLogin) { //登录的人才可以修改头像
        this.$router.push('/profile');
      }
    },
    goto(url) {
      this.$router.push(url);
    },
    change_bg() { //登录的人才可以修改背景图
      if(this.isLogin) {
        this.show = !this.show;
        this.$refs.bg_input.click();
      }
    },
    handleChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if(!files.length) return;
      var form = new FormData();
      form.append('img',files[0]);
      this.$api.uploadImg(form).then(res => {
        this.bgimg = this.url_config.domain + '/' +res.link;
      });
      var form2 = new FormData();
      form2.append("bgimg", files[0]);
      this.$api.updateUserInfo(form2).then(res => {
        this.$api.getUserInfo().then(res => {
          this.bgimg = this.url_config.domain + '/' + res.data.bgimg;
        })
      });
    },
  }
}
</script>

<style lang="less">
@import '../../common/style/center.less';
</style>