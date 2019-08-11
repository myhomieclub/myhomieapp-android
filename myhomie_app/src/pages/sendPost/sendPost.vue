<template>
    <section class="sendPost">
        <div class="topBlank" ref="top"></div>
        <headTop :title="$route.params.name" v-bind:backBtn='true'>
        </headTop>
        <div class="content">
            <!--post title-->
            <van-cell-group>
                <van-field
                        v-model="title"
                        label="Title"
                        placeholder="Please input title"
                >
                </van-field>
            </van-cell-group>
            <!--post content 文字+图片-->
            <div class="detail_input">
                <textarea v-model="content" class="textarea" rows="5" placeholder="请输入留言"></textarea>
                <div class="img_input">
                    <div v-for="(img, index) in imgList" :key="index" class="img_display">
                        <img :src="img">
                        <div class="delete_img" @click="deleteImg(index)">
                            <i class="iconfont icon-close"></i>
                        </div>
                    </div>
                    <van-uploader v-show="isAddImg" :after-read="uploadImg"
                                  accept="image/gif, image/jpeg ,image/png" multiple class="load_img">
                        <img src="../../common/images/add.png">
                    </van-uploader>
                </div>
            </div>
            <!--循环列表项 categorychoice-->
            <van-cell-group class="field">
                <van-field v-for="(event, index) in categoryChoice" :key="index"
                           v-model="event.value"
                           :label="event.name"
                           :placeholder="event.placeholder"
                           @click="display(event, index)"
                           :readonly="event.isReadonly"
                >
                    <template slot="icon">
                        <van-icon name="arrow" v-show="event.isUnfold" @click="display(event, index)"/>
                    </template>
                </van-field>
            </van-cell-group>
            <!--location和contact-->
            <van-cell-group class="field">
                <van-field
                        v-model="location"
                        label="Location"
                        placeholder="Please choose the location"
                        @click="locationDisplay"
                        readonly="readonly"
                        icon="arrow"
                >
                </van-field>
            </van-cell-group>
            <!--发送按钮-->
            <div class="send_bg">
                <van-button size="large" class="send" @click="send">SEND</van-button>
            </div>

            <!--选项弹窗-->
            <div class="back_block" v-show="isShow" @click="hidden">
                <div class="selection_box">
                    <div class="select_list" v-for="(item, index) in category" :key="index"
                         @click="select_click(item, index)">
                        {{item.name}}
                        <span class="select_btn" :class="{isCheck: item.isCheck}"></span>
                    </div>
                </div>
            </div>
            <province v-show="isLocationShow" @click="hidden" @proChange="proChange" @cityChange="cityChange">
            </province>
            <!--选项弹窗-->
        </div>
    </section>
</template>

<script>
    import headTop from '../../components/headTop.vue';
    import province from '../../components/province.vue';
    import {
        events,
        secondHand,
        marketing,
        recruitment,
        travel,
        rent,
        commonweal,
        others,
        discover
    } from '../../assets/sendPost.js';
    import {Field} from 'vant';
    import Vue from 'vue';

    Vue.use(Field);
    export default {
        components: {
            headTop,
            province
        },
        data() {
            return {
                isShow: false,//折叠选项借助项
                isLocationShow: false,//地址选择借助项
                itemIndex: 0,//当前处理的是categoryChoice第几项
                //页面的几个固定值
                title: '',
                location: '',
                resultChoice: {pro: '', city: ''}, //location选择的结果
                content: '',
                content_img: '',
                imgList: [],
                fileList: [],
                isAddImg: true,
                category: [], //每个页面有多个unfold弹出框，当前显示的为哪个里面的category
                categoryChoice: [], //根据上个页面的地址决定显示哪个分类信息，页面最开始使用的
                //下面几个为信息分类的具体内容选项，页面最开始时使用，用于导入分类列表对应的数据
                events: events,
                secondHand: secondHand,
                marketing: marketing,
                recruitment: recruitment,
                travel: travel,
                rent: rent,
                commonweal: commonweal,
                others: others,
            }
        },
        watch: {
            imgList() {
                if (this.imgList.length >= 8) {
                    this.isAddImg = false;
                } else {
                    this.isAddImg = true;
                }
            }
        },
        created() {
            this.init();
        },
        mounted() {
            var top = this.$refs.top;
            top.style.height = (48 + api.safeArea.top) + 'px';
        },
        activated() {
            this.init();
            var top = this.$refs.top;
            top.style.height = (48 + api.safeArea.top) + 'px';
        },
        methods: {
            init() {
                var val = this.$route.params.type;
                if (val === 'event') this.categoryChoice = this.events;
                if (val === 'secondhand') this.categoryChoice = this.secondHand;
                if (val === 'market') this.categoryChoice = this.marketing;
                if (val === 'recruitment') this.categoryChoice = this.recruitment;
                if (val === 'travel') this.categoryChoice = this.travel;
                if (val === 'house') this.categoryChoice = this.rent;
                if (val === 'commonweal') this.categoryChoice = this.commonweal;
                if (val === 'others') this.categoryChoice = this.others;
            },
            uploadImg(file) {
                this.imgList.push(file.content);
                this.fileList.push(file.file);
            },
            deleteImg(index) {
                this.imgList.splice(index, 1);
                this.fileList.splice(index, 1);
            },
            send() {////获取所有的input的值，post上传到数据库，然后清空input框内容
                var judge = 0;
                if (this.title == '') this.$toast("title cannot be empty");
                else if (this.content == '') this.$toast("content cannot be empty");
                else if (this.category == '') this.$toast("category cannot be empty");
                else judge = 1;
                if (judge == 1) {
                    const toast1 = this.$toast.loading({
                        duration: 0,
                        forbidClick: true,
                        message: this.$t('util.upload')
                    });
                    this.content_img = this.content;
                    for (let i = 0; i < this.fileList.length; i++) {
                        let form = new FormData();
                        form.append('img', this.fileList[i]);
                        this.$api.uploadImg(form).then(res => {
                            let img_url = this.url_config.domain + '/' + res.link;
                            let img_tab = '<img src="' + img_url + '">';
                            this.content_img = this.content_img + img_tab;
                            if (i == this.fileList.length - 1) {
                                this.handleSend(toast1);
                            }
                        });
                    }
                }
            },
            handleSend(toast) {
                var form = new FormData();
                form.append("post_type", "2");
                form.append("title", this.title);
                form.append("category", this.$route.params.type);
                form.append("tag", "hangzhou");
                form.append("content", this.content_img);
                form.append("location", this.location);
                this.$api.sendPost(form).then(res => {
                    if (res.status_code == 1) {
                        this.title = '';
                        this.location = '';
                        this.resultChoice = {pro: '', city: ''};
                        this.content = '';
                        this.fileList = [];
                        this.imgList = [];
                        this.categoryChoice.forEach(cate => {
                            cate.value = '';
                            cate.isCheck = false;
                        });
                        toast.clear();
                        this.$toast(this.$t('util.send_success'));
                    } else {
                        this.$toast(this.$t('util.send_false'));
                    }
                    this.$router.replace('/news');
                });
            },
            display(event, index) {  ////折叠选项展开
                if (event.isUnfold === true) {
                    this.isShow = !this.isShow;
                    this.category = event.category;
                    this.itemIndex = index;
                    var that = this;
                    this.category.forEach(function (item) {
                        item.isCheck = false;
                        if (that.categoryChoice[index].value == item.name) {
                            item.isCheck = true;
                        }
                    });
                }
            },
            locationDisplay() {
                this.isLocationShow = !this.isLocationShow;
            },
            hidden() {  ////点击空白区域，隐藏弹出框
                var that = this;
                window.setTimeout(function () {
                    that.isShow = !that.isShow;
                }, 100);
            },
            select_click(item, index) { ////弹出选项的选择
                this.category.forEach(function (res) {
                    res.isCheck = false;
                });
                item.isCheck = true;
                this.categoryChoice[this.itemIndex].value = item.name;
            },
            proChange(data) {  ////省份选择
                this.resultChoice.pro = data;
            },
            cityChange(data) {  ////城市选择
                var that = this;
                this.resultChoice.city = data;
                this.location = this.resultChoice.pro + ' ' + this.resultChoice.city;
                window.setTimeout(function () {
                    that.isLocationShow = !that.isLocationShow;
                }, 100);
            }
        },
        beforeRouteLeave(to, from, next) {
            if (to.fullPath == "/richText?type=" + this.$route.params.type || to.fullPath == "/news") {
                next();
            } else {
                next(false);
                this.title = '';
                this.location = '';
                this.resultChoice = {pro: '', city: ''};
                this.content = '';
                this.imgList = [];
                this.fileList = [];
                this.categoryChoice.forEach(cate => {
                    cate.value = '';
                    cate.isCheck = false;
                });
                next();
            }
        }
    }
</script>

<style lang="less">
    @import '../../common/style/sendPost.less';
</style>