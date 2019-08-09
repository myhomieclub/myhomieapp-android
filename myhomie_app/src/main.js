// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'normalize.css'
import '../node_modules/swiper/dist/css/swiper.css'
import Vue from 'vue'
import App from './App'
import store from './vuex/store'
import router from './router'
import FastClick from 'fastclick'
import URL from './assets/url.js'
import ifApp from './assets/isApp.js'
// import toastRegistry from './components/util/toast'//自定义的toast
import axios from 'axios';
import api from './api/api.js';
import './common/js/api.js';
import i18n from './lang';
import md5 from 'js-md5';
import { Cell, CellGroup ,Icon, Button, Toast, Popup, Dialog, Actionsheet, Locale,SwitchCell,RadioGroup, Radio, Uploader} from 'vant'
Vue.use(Cell).use(CellGroup).use(Icon).use(Button).use(Toast).use(Popup).use(Dialog).use(Actionsheet).use(SwitchCell).use(RadioGroup).use(Radio).use(Uploader)
// Vue.use(toastRegistry);//////自定义toast弹窗组件
// import Mock from './mock'; // 引入mock模块
// Mock.start(); //并且执行初始化函数
FastClick.attach(document.body);

axios.defaults.baseURL = 'http://myhomie.chinaxueyun.com';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
Vue.prototype.$axios = axios;
Vue.prototype.$md5 = md5;

Vue.config.productionTip = false;
Vue.prototype.url_config = URL;
Vue.prototype.$api = api;

/* eslint-disable no-new */
if(ifApp()) { //判断当前设备是app还是网页，是APP则调用apiready确保app内调用apicloud接口正常运行
	// window.apiready = function () {
		new Vue({
		  el: '#app',
		  router,
		  store,
		  i18n,
		  components: { App },
		  template: '<App/>'
		})	
	// }
}else {
	new Vue({
	  el: '#app',
	  router,
	  store,
	  i18n,
	  components: { App },
	  template: '<App/>'
	})
}

