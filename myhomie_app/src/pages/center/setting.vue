<template>
  <section class="setting">
    <headTop :title="$t('setting.name')" :backBtn="true"></headTop>
    <div class="topBlank" ref="top"></div>
    <van-cell-group style="margin-top: 20px">
      <van-cell :title="$t('setting.self_edit')" is-link @click="toProfile"/>
      <van-cell :title="$t('setting.account')" is-link to=""/>
      <van-cell :title="$t('setting.about')" is-link @click="toWeb"/>
      <van-switch-cell v-model="checked" active-color="#fe8f2d" :title="$t('setting.language')" @change="handleLanguage"/>
    </van-cell-group>
    <van-cell-group style="margin-top: 40px;text-align: center;">
      <van-cell :title="$t('setting.logout')" @click="logout" style="color: #fe8f2d" />
    </van-cell-group>
    <div class="bottomBlank"></div>
  </section>
</template>

<script>
import headTop from '../../components/headTop.vue';
//import Cookies from 'js-cookie';
export default {
  components: {
    headTop,
  },
  data() {
    return {
      checked: false,
      isLogin: false
    }
  },
  created() {
    var switchValue = localStorage.getItem('switch');
    if(switchValue === '1') {
      this.checked = true;
    }else {
      this.checked = false;
    }
    
  },
  mounted() {
    var top = this.$refs.top;
    top.style.height = (48 + api.safeArea.top) + 'px';
  },
  methods: {
    handleLanguage() {
      if(this.checked === true) {
        this.$i18n.locale = 'zh';
        localStorage.setItem("Language", 'zh');
        localStorage.setItem("switch", '1');
      }else {
        this.$i18n.locale = 'en';
        localStorage.setItem("Language", 'en');
        localStorage.setItem("switch", '0');
      }
    },
    goto(url) {
      this.$router.push(url);
    },
    toProfile() {
      if(this.isLogin) {
        this.goto('/profile');
      }
    },
    toWeb() {
      this.$toast.loading({
        mask: true,
        message: 'loading...'
      });
      window.location.href = "http://www.myhomieclub.com";
    },
    logout() {
      this.$dialog.confirm({
        title: this.$t("setting.logout"),
        message: this.$t("setting.logout_message"),
        confirmButtonText: this.$t("setting.sure"),
        cancelButtonText: this.$t("setting.not")
      }).then(() => {
        this.$api.logout();
        this.$router.push("/login_register");
        //清除掉登录缓存信息
        this.$store.dispatch('setLogin', null);
        api.removePrefs({
            key: 'loginMessage'
        });
      }).catch(() => {
        // on cancel
      });
    }
  }
}
</script>

<style lang="less">
@import '../../common/style/center.less';
</style>