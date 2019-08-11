<template>
    <section class="login_register">
        <headTop :title="$t('login_register.login')" :backBtn='true'></headTop>
        <div class="input">
            <div class="input_item">
                <i class="iconfont icon-mobile"></i>
                <input type="tel" maxlength="11" v-model.number="phone" :placeholder="$t('login_register.tel')"
                       @keyup="notnull">
                <span v-show="phone!=''"><i class="iconfont icon-close" @click="delete_input"></i></span>
            </div>
            <div class="input_item">
                <i class="iconfont icon-lock"></i>
                <input type="password" v-model="password" :placeholder="$t('login_register.password')" @keyup="notnull">
                <span @click="forgetPassword">{{$t('login_register.forget')}}?</span>
            </div>
        </div>
        <van-button size="large" :disabled="isdisabled" class="util_btn" @click="login">{{$t('login_register.login')}}
        </van-button>
    </section>
</template>

<script type="text/javascript">
    import headTop from '../../components/headTop.vue';
    import ifApp from '../../assets/isApp.js'

    export default {
        components: {
            headTop,
        },
        data() {
            return {
                phone: '',
                password: '',
                isdisabled: true,
                redirect: ''
            }
        },
        created() {
            if (this.$route.query.redirect) this.redirect = this.$route.query.redirect;
        },
        methods: {
            notnull() {
                if (this.phone === '' || this.password === '') {
                    this.isdisabled = true;
                } else this.isdisabled = false;
            },
            delete_input() {
                this.phone = '';
            },
            forgetPassword() {
                var form = new FormData();
                form.append("username", this.phone);
                form.append("redirect", this.redirect);
                this.$router.replace({name: 'resetPassword', params: {data: form}});
            },
            login() {
                if (this.phone.toString().length != 11) {
                    this.$toast(this.$t('login_register.wrong_tel'));
                } else if (this.password.toString().length < 6) {
                    this.$toast(this.$t('login_register.wrong_password'));
                } else {
                    var form = new FormData();
                    form.append("username", this.phone);
                    form.append("password", this.$md5(this.password));
                    const toast1 = this.$toast.loading({
                        duration: 0,
                        forbidClick: true,
                        message: this.$t('util.load')
                    });
                    this.$api.login(form).then(res => {
                        toast1.clear();
                        this.$toast(res);
                        if (res.status_code == '1') {
                            //记录用户的登录信息
                            let data = {
                                username: this.phone,
                                password: this.$md5(this.password),
                                unionid: '',
                            };
                            let login_data = JSON.stringify(data);
                            this.$store.dispatch('setLogin', login_data);
                            api.setPrefs({
                                key: 'loginMessage',
                                value: login_data
                            });
                            //记录用户的登录信息
                            if (this.redirect != '') {
                                this.$router.replace(this.redirect);
                                //this.$router.go(1);
                            } else {
                                this.$router.go(1);
                                this.$router.replace('/news');//登录成功
                            }
                        } else {
                            var msg = res.msg;
                            if (msg == '密码错误') this.$toast(this.$t('login_register.wrong_password'));
                            else if (msg == '用户不存在') this.$toast(this.$t('login_register.wrong_user'));
                            else this.$toast("error");
                        }
                    });
                }
            }
        }
    }
</script>

<style lang="less">
    @import '../../common/style/login.less';
</style>