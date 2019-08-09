<template>
	<section class="login_register">
		<div class="choice">
			<div class="logo"><img src="../../common/images/logo.png" /></div>
			<van-button size="large" class="item" @click="goto('/login')">{{$t('login_register.login')}}</van-button>
			<van-button size="large" class="item white" @click="goto('/register')">{{$t('login_register.register')}}</van-button>
			<!--div class="guest">guest</div-->
		</div>
		<div class="others_way">
			<div class="text">---- {{$t('login_register.others')}} ----</div>
			<div class="others">
				<div class="other">
					<div class="way" @click="wechatLogin">
						<i class="iconfont icon-friendfavor"></i>
					    <span>{{$t('login_register.wechat')}}</span>
					</div>
				</div>
				<div class="other">
					<div class="way" @click="goto('/news')">
						<i class="iconfont icon-friendfavor"></i>
						<span>{{$t('login_register.guest')}}</span>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script type="text/javascript">
	export default {
		data() {
			return {
				redirect: ''
			}
		},
		created() {				
			if(this.$route.query.redirect) {
				this.redirect = this.$route.query.redirect;
			}
			//获取记录的登录信息进行登录
			let data = api.getPrefs({
			    sync: true,
			    key: 'loginMessage'
			});
			if(data!=null) {
				let login_data = JSON.parse(data);
				if(login_data.unionid!='') {//微信登录的
					this.$api.isLogin().then(res => {
		        		if(res == 1) {
		        			this.$router.replace('/news');
		        		}else {
		        			let form = new FormData();
							form.append("unionid", login_data.unionid);
							this.wechat(form, login_data.unionid);
		        		}
		        	}
				}else {//手机号登录的
					var form = new FormData();
					form.append("username", login_data.username);
					form.append("password", login_data.password);
					this.login(form);
				}
			}
		},
		methods: {
			goto(id) {
				if(this.redirect != '') {
					this.$router.push({path: id, query: {redirect: this.redirect}});
				}else {
					this.$router.push(id);
				}
			},
			login(form) {
				const toast1 = this.$toast.loading({
				  duration: 0,
		          forbidClick: true, 
		          message: this.$t('util.load')
				});
				this.$api.login(form).then(res => {
					toast1.clear();
					if(res.status_code =='1') {
						this.$router.replace('/news');//登录成功
					}else {
						var msg = res.msg;
						if(msg == '密码错误') this.$toast(this.$t('login_register.wrong_password'));
						else if(msg == '用户不存在') this.$toast(this.$t('login_register.wrong_user'));
						else this.$toast("error");
					}
				});
			},
			wechat(form, unionid) {
				const toast2 = this.$toast.loading({
				  duration: 0,
		          forbidClick: true, 
		          message: this.$t('util.load')
				});
				this.$api.loginViaw(form).then(res => {
					toast2.clear();
					if(res.status_code =='1') {
						//记录用户的登录信息
					  	let data = {
							username: '',
							password: '',
							unionid: unionid,
						};
						let login_data = JSON.stringify(data);
						this.$store.dispatch('setLogin', login_data);
						api.setPrefs({
						    key: 'loginMessage',
						    value: login_data
						});
						//记录用户的登录信息
						this.$router.replace('/news');//登录成功
					}else {

					}
				})
			},
			wechatLogin() {
				var that = this;
				var wx = api.require('wx');
				wx.isInstalled(function(ret, err) {
				    if (ret.installed) {//检测是否安装微信
				        wx.auth({//微信授权登录
						}, function(ret, err) {
						    if (ret.status) {
						        that.$toast(ret.code);
						        var getCode = ret.code;
						        wx.getToken({//获得登录token
								    code: getCode
								}, function(ret, err) {
								    if (ret.status) {
								        var getAccessToken = ret.accessToken;
								        var getOpenId = ret.openId;
								        wx.getUserInfo({//获取用户信息
										    accessToken: getAccessToken,
										    openId: getOpenId
										}, function(ret, err) {
										    if (ret.status) {
										        let form = new FormData();
												form.append("unionid", ret.unionid);
												form.append("nickname", ret.nickname);
												form.append("sex", ret.sex);
												form.append("headimg", ret.headimgurl);
												that.wechat(form, ret.unionid);
										    } else {
										        that.$toast(err.code);
										    }
										});
								    } else {
								        that.$toast(err.code);
								    }
								});
						    } else {
						        that.$toast(err.code);
						    }
						});
				    } else {
				        that.$toast('未安装微信客户端');
				    }
				});
			}
		}
	}
</script>

<style lang="less" scoped>
@import '../../common/style/login.less';
.login_register {
	background-image: url(../../common/images/login_bg.png);
	background-size: cover;
}
</style>