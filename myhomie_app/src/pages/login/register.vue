<template>
	<section class="login_register">
		<headTop :title="$t('login_register.register')" :backBtn='true'></headTop>
		<div class="input">
			<div class="input_item">
				<i class="iconfont icon-mobile"></i>
				<input type="tel" maxlength="11" v-model.number="phone" :placeholder="$t('login_register.tel')" @keyup="notnull">
				<span v-show="phone!=''"><i class="iconfont icon-close" @click="delete_input"></i></span>
			</div>
			<div class="input_item">
				<i class="iconfont icon-lock"></i>
				<input type="password" maxlength="20" v-model="password" :placeholder="$t('login_register.password')" @keyup="notnull">
			</div>
			<div class="input_item">
				<i class="iconfont icon-hot"></i>
				<input type="tel" maxlength="4" v-model.number="imgCode" :placeholder="$t('login_register.graphic_code')" @keyup="notnull">
				<img ref="img" class="imgCode" @click="identify">
			</div>
		</div>
		<van-button size="large" :disabled="isdisabled" class="util_btn" @click="next">{{$t('login_register.next')}}</van-button>
	</section>
</template>

<script type="text/javascript">
import headTop from '../../components/headTop.vue';
	export default {
		components: {
			headTop,
		},
		data() {
			return {
				phone: '',
				password: '',
				imgCode: '',
				isdisabled: true,
				redirect: ''
			}
		},
		created() {
			if(this.$route.query.redirect) this.redirect = this.$route.query.redirect;
		},
		mounted() {
			this.identify();
		},
		methods: {
			notnull() {
				if(this.phone === ''||this.password === ''||this.imgCode === '') {
					this.isdisabled = true;
				}else this.isdisabled = false;
			},
			delete_input() {
				this.phone = '';
			},
			identify() {
				var que = Math.random();
				// this.$refs.img.src = this.url_config.base_url+"/login/index/getImageCode?query="+que;
				this.$refs.img.src = this.$api.getImgCode;
			},
			next() {
				var phone = this.phone;
				var password = this.password;
				var imgCode = this.imgCode;
				if(phone.toString().length != 11) {
		        	this.$toast(this.$t('login_register.wrong_tel'));
		        }
		        else if(password.toString().length < 6){
		        	this.$toast(this.$t('login_register.wrong_setpassword'));
		        }
		        else {
		        	this.sendCode();
		        }
			},
			sendCode() {
				var form = new FormData();
				form.append("captcha", this.imgCode);
				form.append("tel", this.phone);
				form.append("password", this.$md5(this.password));
				form.append("type", "register");
				form.append("redirect", this.redirect);
				this.$api.sendSMS(form).then(res => {
					//检验图形验证码是否正确，正确则发送手机验证码
					if(res.status_code == '1') {
						this.$toast(this.$t('login_register.code_send'));
						this.$router.replace({name: 'verification', params: {data: form}});
					}else {
						this.$toast(this.$t('login_register.wrong_graphic'));
					}
				});
			}
		}
	}
</script>

<style lang="less">
@import '../../common/style/login.less';
</style>