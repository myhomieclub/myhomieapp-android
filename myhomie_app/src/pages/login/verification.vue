<template>
    <section class="login_register">
        <headTop :title="$t('login_register.verifi_code')" :backBtn='true'></headTop>
        <div class="input">
            <div class="discribe">{{$t('login_register.message1')}}： {{tel}}<br>{{$t('login_register.message2')}}</div>
            <div class="code">
                <input class="input_code" type="tel" maxlength="4" v-model.number="codenumber">
                <div class="line">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div class="countdown" v-show="isCount">{{time}}s</div>
                <div class="countdown" v-show="!isCount" @click="send">{{resend}}</div>
            </div>
        </div>
        <!--div class="util_btn" @click="binding_next">Next</div-->
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
                codenumber: '',
                time: 60,
                resend: this.$t('login_register.resend'),
                isCount: true,
                tel: '',
                password: '',
                captcha: '',
                typeLogin: '',
                redirect: ''
            }
        },
        created() {
            var form = this.$route.params.data; //进入页面时
            this.tel = form.get("tel");
            this.password = form.get("password");
            this.captcha = form.get("captcha");
            this.typeLogin = form.get("type");
            this.redirect = form.get("redirect");
            console.log(this.redirect);
            this.setInterval();
        },
        mounted() {
        },
        watch: {
            codenumber: function () {
                if (this.codenumber.toString().length === 4) { ////判断验证码是否正确
                    var form3 = new FormData();
                    form3.append("tel", this.tel);
                    form3.append("password", this.password);
                    form3.append("code", this.codenumber);
                    if (this.typeLogin == 'register') { ////从注册页面过来的
                        this.$api.register(form3).then(res => {
                            if (res.status_code == '1') {
                                this.$toast.success(this.$t('login_register.success_register'));
                                this.login();
                            } else {
                                var msg = res.msg;
                                if (msg == '验证码错误') this.$toast(this.$t('login_register.wrong_code'));
                                else if (msg == '该手机号已注册') this.$toast("手机号已注册");
                            }
                        })
                    } else if (this.typeLogin == 'resetPassword') { //从重置密码过来的
                        this.$api.resetPass(form3).then(res => {
                            if (res.status_code == '1') {
                                this.$toast.success(this.$t('login_register.success_reset'));
                                this.login();
                            } else {
                                var msg = res.msg;
                                if (msg == '验证码错误') this.$toast(this.$t('login_register.wrong_code'));
                                else if (msg == '用户不存在') this.$toast(this.$t('login_register.wrong_user'));
                            }
                        })
                    }
                }
            }
        },
        methods: {
            send() {
                this.time = 60;
                this.isCount = true;
                this.setInterval();
                this.sendCode();
            },
            setInterval() {
                var that = this;
                var interval = window.setInterval(function () {
                    that.time--;
                    if (that.time === -1) {
                        that.isCount = false;
                        window.clearInterval(interval);
                    }
                }, 1000);
                if (this.time === 0) this.resend = 'Resend';
            },
            sendCode(data) {
                var form2 = new FormData();
                form2.append("captcha", this.captcha);
                form2.append("tel", this.tel);
                form2.append("redirect", this.redirect);
                this.$api.sendSMS(form2).then(res => {
                    if (res.status_code == '1') {
                        this.$toast(this.$t('login_register.code_send'));
                    } else {
                        this.$toast(this.$t('login_register.wrong_graphic'));
                    }
                });
            },
            login() {
                var form1 = new FormData();
                form1.append("username", this.tel);
                form1.append("password", this.password);
                const toast1 = this.$toast.loading({
                    duration: 0,
                    forbidClick: true,
                    message: this.$t('util.load')
                });
                this.$api.login(form1).then(res => {
                    toast1.clear();
                    this.$toast(res);
                    if (res.status_code == '1') {
                        //记录用户的登录信息
                        if (ifApp()) {
                            let data = {
                                username: this.tel,
                                password: this.password,
                                unionid: '',
                            };
                            let login_data = JSON.stringify(data);
                            this.$store.dispatch('setLogin', login_data);
                            api.setPrefs({
                                key: 'loginMessage',
                                value: login_data
                            });
                        } else {
                            let data = {
                                username: this.tel,
                                password: this.password,
                                unionid: '',
                            };
                            let login_data = JSON.stringify(data);
                            this.$store.dispatch('setLogin', login_data);
                        }
                        //记录用户的登录信息
                        if (this.redirect != '') {
                            this.$router.go(1);
                            this.$router.replace(this.redirect);
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
</script>

<style lang="less">
    @import '../../common/style/login.less';
</style>