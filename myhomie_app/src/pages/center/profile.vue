<template>
    <section class="profile">
        <headTop :title="$t('center.profile')" :backBtn="true"></headTop>
        <div class="center_header">
            <div class="bg_img"><!--背景页-->
                <img :src="bgimg">
            </div>
            <!-- <input type="file" accept="jpg/png/jpeg" class="bg_input" @change="handleChange" ref="headimgInput"> -->
            <van-uploader :after-read="insertImg" accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                          style="margin: 116px auto 10px;margin-left: 50%;transform: translate(-50%,0);">
                <div class="headimg"><img :src="headimg"></div>
            </van-uploader>
            <div class="head_content">
                <div class="inform">
                    <span class="name">{{nickname}}</span><br>
                    <span class="sign">{{signature}}</span>
                </div>
            </div>
        </div>
        <div class="item_list">
            <div class="item">
                <span class="left">{{$t('center.nickname')}}</span>
                <input type="text" class="input_change" ref="input" placeholder="your nickname" maxlength="20"
                       v-model.lazy="nickname">
            </div>
            <div class="item">
                <span class="left">{{$t('center.sign')}}</span>
                <input type="text" class="input_change" ref="input" placeholder="your signature"
                       v-model.lazy="signature" maxlength="40">
            </div>
        </div>
        <div class="item_list">
            <div class="item">
                <span class="left">{{$t('center.gender')}}</span>
                <input type="text" class="input_change" readonly="readonly" v-model="radio" @click="sexSelect">
            </div>
            <van-popup v-model="showSex" class="sexPopup">
                <van-radio-group v-model="radio">
                    <van-cell-group>
                        <van-cell :title="$t('center.male')" clickable
                                  @click="radio = this.$t('center.male');showSex = false">
                            <van-radio :name="$t('center.male')" checked-color="#fe8f2d"/>
                        </van-cell>
                        <van-cell :title="$t('center.female')" clickable
                                  @click="radio = this.$t('center.female');showSex = false">
                            <van-radio :name="$t('center.female')" checked-color="#fe8f2d"/>
                        </van-cell>
                    </van-cell-group>
                </van-radio-group>
            </van-popup>
            <div class="item">
                <span class="left">{{$t('center.nationality')}}</span>
                <input type="text" class="input_change" readonly="readonly" v-model="radio2" @click="natSelect">
            </div>
            <van-popup v-model="showNationality" class="sexPopup natPopup">
                <van-radio-group v-model="radio2">
                    <van-cell-group>
                        <van-cell :title="nat" v-for="(nat,index) in nationality" :key="index" clickable
                                  @click="selectNat(index)">
                            <van-radio :name="nat" checked-color="#fe8f2d"/>
                        </van-cell>
                    </van-cell-group>
                </van-radio-group>
            </van-popup>
        </div>
    </section>
</template>

<script type="text/javascript">
    import headTop from '../../components/headTop.vue';
    import nationality from '../../assets/nationality.js';

    export default {
        components: {
            headTop,
        },
        data() {
            return {
                currentValue: '',
                isOnComposition: false,
                valueBeforeComposition: '',
                nickname: '',
                signature: '',
                headimg: '',
                bgimg: '',
                showSex: false,
                showNationality: false,
                radio: '',
                radio2: '',
                nationality: nationality,
            }
        },
        created() {
            this.$api.getUserInfo().then(res => {
                if (res.status_code == '1') {
                    this.isLogin = true;
                    let result = res.data;
                    if (result.nickname != null) this.nickname = result.nickname;
                    else if (result.nickname == null) this.nickname = 'who are you';
                    if (result.signature != null) this.signature = result.signature;
                    if (result.sex != null) {
                        if (result.sex == 1) this.radio = this.$t('center.male');
                        if (result.sex == 2) this.radio = this.$t('center.female');
                    }
                    if (result.nationality != null) this.radio2 = result.nationality;
                    if (result.headimg == null) this.headimg = this.url_config.default_headimg_url;
                    else if (result.headimg != null) this.headimg = this.url_config.domain + '/' + result.headimg;
                    if (result.bgimg == null) this.bgimg = this.url_config.default_bgimg_url;
                    else if (result.bgimg != null) this.bgimg = this.url_config.domain + '/' + result.bgimg;
                } else {
                    this.isLogin = false;
                }
            });
        },
        beforeRouteLeave(to, from, next) {
            next(false);
            var sexsex = this.radio;
            var form = new FormData();
            form.append("nickname", this.nickname);
            form.append("signature", this.signature);
            form.append("headimg", this.headimg);
            if (sexsex == this.$t('center.male')) form.append("sex", 1);
            else if (sexsex == this.$t('center.female')) form.append("sex", 2);
            form.append("nationality", this.radio2);
            this.$api.updateUserInfo(form).then(res => {
            });
            next();
        },
        methods: {
            sexSelect() {
                this.showSex = !this.showSex;
            },
            natSelect() {
                this.showNationality = !this.showNationality;
            },
            selectNat(index) {
                this.radio2 = this.nationality[index];
                this.showNationality = false;
            },
            insertImg(file) {
                this.headimg = file.content;
                var form2 = new FormData();
                form2.append("headimg", file.file);
                this.$api.updateUserInfo(form2).then(res => {
                });
            },
            // handleBlur(event) {
            // 	this.handleInput(event);
            // },
            // handleInput(event) {
            // 	const value = event.target.value;
            // 	this.currentValue = value;
            // 	console.log(this.currentValue);
            // },
            // handleComposition(event) {
            // 	if(event.type === 'compositionend') {
            // 		this.isOnComposition = false;
            // 		this.currentValue = this.valueBeforeComposition;
            // 		this.valueBeforeComposition = null;
            // 		this.handleInput(event);
            // 	}else {
            // 		const text = event.target.value;
            // 		this.isOnComposition = true;
            // 		if(this.isOnComposition && event.type === 'compositionstart') {
            // 			this.valueBeforeComposition = text;
            // 		}
            // 		console.log("brfore: "+this.valueBeforeComposition);
            // 	}
            // },
            // limit(val) {
            // 	var myLen = this.getStrLength(10,value);
            // },
            // limitLength(byteLength,index) {
            // 	var value = $('input')[index].value;
            // 	var myLen = this.getStrLength(byteLength,value);
            // 	console.log(myLen);
            // 	if(myLen>byteLength*2) {
            // 		$('input')[index].value = value.substring(0,value.length-1);
            // 	}else {

            // 	}
            // },
            // getStrLength(byteLength,str) {
            // 	var myLen = 0;
            // 	for(var i=0; (i<str.length)&&(myLen<=byteLength*2); i++) {
            // 		if(str.charCodeAt(i)>0 && str.charCodeAt(i)<128) {
            // 			myLen++;
            // 		}else {
            // 			myLen+=2;
            // 		}
            // 	}
            // 	return myLen;
            // }
        }
    }
</script>

<style lang="less" scoped>
    @import '../../common/style/center.less';

    .header {
        background-color: rgba(0, 0, 0, 0) !important;
        border-bottom: none;
        color: #fff;
    }
</style>