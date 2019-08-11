<template>
    <section class="sendPost">
        <div class="topBlank" ref="top"></div>
        <headTop title="SendDiscover" v-bind:backBtn='true'>
        </headTop>
        <div class="enter_content">
            <textarea v-model="content" class="textarea" rows="6" placeholder="请输入留言"></textarea>
            <div class="img_input">
                <div v-for="(img, index) in imgList" :key="index" class="img_item">
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
        <van-cell-group class="field">
            <van-field
                    v-model="title"
                    label="Title"
                    placeholder="Please input title"
            >
            </van-field>
            <van-field
                    v-model="category"
                    label="Tag"
                    @click="display()"
                    placeholder="Chose one tag"
                    :readonly="true"
            >
                <template slot="icon">
                    <van-icon name="arrow" @click="display()"/>
                </template>
            </van-field>
        </van-cell-group>
        <div class="send_bg">
            <van-button size="large" class="send" @click="send">SEND</van-button>
        </div>
        <!--选项弹窗-->
        <div class="back_block" v-show="isShow" @click="hidden">
            <div class="selection_box">
                <div class="select_list" v-for="(item, index) in categoryList" :key="index"
                     @click="select_click(item, index)">
                    {{item.name}}
                    <span class="select_btn" :class="{isCheck: item.isCheck}"></span>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import headTop from '../../components/headTop.vue';

    export default {
        components: {
            headTop,
        },
        data() {
            return {
                content: '',
                content_img: '',
                imgList: [],
                fileList: [],
                isAddImg: true,
                title: '',
                category: '',
                categoryList: [
                    {name: 'emotion', isCheck: false},
                    {name: 'photo', isCheck: false},
                    {name: 'pet', isCheck: false}
                ],
                isShow: false,
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
        mounted() {
            var top = this.$refs.top;
            top.style.height = (48 + api.safeArea.top) + 'px';
        },
        methods: {
            hidden() {  ////点击空白区域，隐藏弹出框
                var that = this;
                window.setTimeout(function () {
                    that.isShow = !that.isShow;
                }, 100);
            },
            display() {  ////折叠选项展开
                this.isShow = !this.isShow;
                var that = this;
                this.categoryList.forEach(function (item) {
                    item.isCheck = false;
                    if (that.category == item.name) {
                        item.isCheck = true;
                    }
                });
            },
            select_click(item, index) { ////弹出选项的选择
                this.categoryList.forEach(function (res) {
                    res.isCheck = false;
                });
                item.isCheck = true;
                this.category = item.name;
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
                form.append("post_type", "3");
                form.append("title", this.title);
                form.append("category", this.category);
                form.append("content", this.content_img);
                console.log(this.content_img);
                this.$api.sendPost(form).then(res => {
                    if (res.status_code == '1') {
                        this.title = '';
                        this.content = '';
                        this.fileList = [];
                        this.imgList = [];
                        this.$toast(this.$t('util.send_success'));
                        toast.clear();
                    } else {
                        this.$toast(this.$t('util.send_false'));
                    }
                    this.$router.replace('/news');
                });
            }
        }
    }
</script>

<style lang="less">
    @import '../../common/style/sendPost.less';
</style>