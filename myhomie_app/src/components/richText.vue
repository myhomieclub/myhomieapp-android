<template>
    <section class="richText">
        <div class="topBlank left"></div>
        <headTop title="Edit Content" v-bind:backBtn='true'></headTop>
        <div class="rich_content left">
            <div ref="edit_content" class="edit_content" contentEditable="true" @click="inputBegin"
                 @mouseup="selectText" @keyup="inputText">{{richContent}}
            </div>
            <span class="note" v-show="isInput">{{note}}</span>
        </div>
        <div class="edit_option">
            <div class="option">
                <input id="insert_bold" type="button" @click="SetToBold" value='click'>
                <i class="iconfont icon-post" @click="bold" :class="{on:isBold}"></i>
            </div>
            <div class="option">
                <input id="insert_img" type="file" accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                       @change="insert_img">
                <i class="iconfont icon-pic"></i>
            </div>
            <div class="option">
                <input id="insert_video" type="file" accept="video/mp4" @change="insert_video">
                <i class="iconfont icon-record"></i>
            </div>
            <div class="save" @click="display">
                SAVE
            </div>
        </div>
        <div class="bottomBlank"></div>
    </section>
</template>

<script>
    import headTop from './headTop.vue';

    export default {
        components: {
            headTop,
        },
        data() {
            return {
                isBold: false,
                isInput: true,
                selectedText: '',
                lastEditRange: {},
                note: 'say something',
                richContent: '',
                postType: '',
                dis: ''
            }
        },
        created() {
            this.init();
        },
        activated() {
            this.init();
        },
        methods: {
            init() {
                this.postType = this.$route.query.type;
                this.richContent = sessionStorage.getItem("session_content");
                if (this.richContent != '') this.inputBegin();
            },
            inputBegin() { /////最开始点击，作用是隐藏提示信息
                var selection = window.getSelection();
                // this.lastEditRange = selection.getRangeAt(0);
            },
            SetToBold() {  //加粗按钮按下后的操作
                this.bold();
                var selection = window.getSelection();
                if (this.lastEditRange) {
                    // 存在最后光标对象，选定对象清除所有光标并添加最后光标还原之前的状态
                    selection.removeAllRanges();
                    selection.addRange(this.lastEditRange);
                    document.execCommand('bold', false, null); ////document的原生功能
                }
            },
            bold() {
                this.isBold = !this.isBold;
            },
            insert_img(e) { ////上传图片
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length) return;
                var form = new FormData();
                form.append('img', files[0]);
                const toast1 = this.$toast.loading({
                    duration: 0,
                    forbidClick: true,
                    message: 'Uploading...'
                });
                var that = this;
                this.$api.uploadImg(form).then(res => {
                    toast1.clear();
                    var img_url = that.url_config.domain + '/' + res.link;
                    that.creatImage(img_url);
                });
            },
            creatImage(url) {  ////上传并插入图片
                var that = this;
                var img = document.createElement("img");   //创建一个video元素
                img.src = url;
                var br = document.createElement("br");
                var selection = window.getSelection();
                if (that.lastEditRange) {
                    selection.removeAllRanges();
                    selection.addRange(that.lastEditRange);
                    var range = selection.getRangeAt(0);
                    range.insertNode(br);
                    range.insertNode(img);
                }
                //var image = new Image();
                // var reader = new FileReader();
                // reader.onload = (e) => {
                //   var br = document.createElement("br");
                //   var selection = window.getSelection();
                //   if (that.lastEditRange) {
                //       // 存在最后光标对象，选定对象清除所有光标并添加最后光标还原之前的状态
                //       selection.removeAllRanges();
                //       selection.addRange(that.lastEditRange);
                //       document.execCommand('insertimage', 0, e.target.result);
                //       var range = selection.getRangeAt(0);
                //       range.insertNode(br);
                //   }
                // };
                // reader.readAsDataURL(file);
            },
            insert_video(e) { ////上传视频
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length) return;
                var form = new FormData();
                form.append('video', files[0]);
                const toast2 = this.$toast.loading({
                    duration: 0,
                    forbidClick: true,
                    message: 'Uploading...'
                });
                var that = this;
                this.$api.uploadVideo(form).then(res => {
                    toast2.clear();
                    var video_url = that.url_config.domain + '/' + res.link;
                    that.creatVideo(video_url);
                });
            },
            creatVideo(url) {   ////上传并插入视频
                var that = this;
                var bigVideo = document.createElement("video");   //创建一个video元素
                bigVideo.src = url;
                bigVideo.controls = 'controls';
                var br = document.createElement("br");
                var selection = window.getSelection();
                if (that.lastEditRange) {
                    // 存在最后光标对象，选定对象清除所有光标并添加最后光标还原之前的状态
                    selection.removeAllRanges();
                    selection.addRange(that.lastEditRange);
                    var range = selection.getRangeAt(0);
                    range.insertNode(br);
                    range.insertNode(bigVideo);
                }
                // var video = document.createElement('video');
                // var reader = new FileReader();
                // reader.onload = (e) => {
                //   var bigVideo = document.createElement("video");   //创建一个video元素
                //   bigVideo.src=e.target.result;
                //   bigVideo.controls='controls';
                //   var selection = window.getSelection();
                //   if (that.lastEditRange) {
                //       // 存在最后光标对象，选定对象清除所有光标并添加最后光标还原之前的状态
                //       selection.removeAllRanges();
                //       selection.addRange(that.lastEditRange);
                //       var range = selection.getRangeAt(0);
                //       range.insertNode(bigVideo);
                //   }
                // };
                // reader.readAsDataURL(file);
            },
            display() { ////save保存，将content信息传给sendpost页面
                console.log(this.$refs.edit_content);
                console.log(this.$refs['edit_content']);
                this.dis = this.$refs.edit_content.html();
                sessionStorage.setItem("session_content", this.dis);
                this.$router.replace({path: '/sendPost/' + this.postType});
            },
            inputText() { ////键盘事件，持续记录最后一次在的光标位置
                this.lastEditRange = window.getSelection().getRangeAt(0);
            },
            selectText() { ////鼠标抬起事件，监控点击和选择
                this.selectedText = this.getSelectedContents();
            },
            getSelectedContents() {  ////鼠标抬起事件，监控点击和选择
                var that = this;
                if (window.getSelection) {
                    var range = window.getSelection().getRangeAt(0);
                    var startValue = range.startContainer.nodeValue;
                    var endValue = range.endContainer.nodeValue;
                    var startName = range.startContainer.parentNode.localName;
                    var endName = range.endContainer.parentNode.localName;
                    var localName = range.endContainer.localName;
                    var endOffset = range.endOffset;
                    var endLength = range.endContainer.length;
                    if (range.collapsed === true) { //光标点击
                        if (that.lastEditRange === range) {
                            that.isBold = that.isBold;
                        } else {
                            if (startName === 'b' || startName === 'span') {
                                that.isBold = true;
                            } else if (localName === 'b') that.isBold = true;
                            else that.isBold = false;
                        }
                    } else { /////选择一些文本，而不是点击
                        if (startValue === endValue) { //选择单种文本
                            if (startName === 'b' || startName === 'span') {
                                that.isBold = true;
                            } else that.isBold = false;
                        } else { //选择多种文本
                            if (startName === endName) {
                                if (startName === 'b' || startName === 'span') that.isBold = true;
                                else that.isBold = false;
                            } else {
                                that.isBold = false;
                            }
                        }
                    }
                    that.lastEditRange = range;
                    var container = document.createElement('div');
                    container.appendChild(range.cloneContents());
                    return container.innerHTML;
                } else if (document.getSelection) { //其他
                    var range = window.getSelection().getRangeAt(0);
                    var startValue = range.startContainer.nodeValue;
                    var endValue = range.endContainer.nodeValue;
                    var startName = range.startContainer.parentNode.localName;
                    var endName = range.endContainer.parentNode.localName;
                    var localName = range.endContainer.localName;
                    var endOffset = range.endOffset;
                    var endLength = range.endContainer.length;

                    if (range.collapsed === true) { //光标点击
                        if (that.lastEditRange === range) {
                            that.isBold = that.isBold;
                        } else {
                            if (startName === 'b' || startName === 'span') {
                                that.isBold = true;
                            } else if (localName === 'b') that.isBold = true;
                            else that.isBold = false;
                        }
                    } else { /////选择一些文本，而不是点击
                        if (startValue === endValue) { //选择单种文本
                            if (startName === 'b' || startName === 'span') {
                                that.isBold = true;
                            } else that.isBold = false;
                        } else { //选择多种文本
                            if (startName === endName) {
                                if (startName === 'b' || startName === 'span') that.isBold = true;
                                else that.isBold = false;
                            } else {
                                that.isBold = false;
                            }
                        }
                    }
                    that.lastEditRange = range;
                    var container = document.createElement('div');
                    container.appendChild(range.cloneContents());
                    return container.innerHTML;
                } else if (document.selection) { //IE特有的
                    return document.selection.createRange().htmlText;
                }
            },
        },
        beforeRouteLeave(to, from, next) {
            this.dis = this.$refs.edit_content.html();
            if (to.fullPath == '/sendPost/' + this.postType) {
                next();
            } else {
                next(false);
                if (this.dis == this.richContent) {
                    this.$router.replace({path: '/sendPost/' + this.postType});
                } else {
                    this.$dialog.confirm({
                        message: 'Save your content ?'
                    }).then(() => {
                        sessionStorage.setItem("session_content", this.dis);
                        this.$router.replace({path: '/sendPost/' + this.postType});
                    }).catch(() => {
                        sessionStorage.setItem("session_content", this.richContent);
                        this.$router.replace({path: '/sendPost/' + this.postType});
                    });
                }

            }
        }
    }
</script>

<style lang="less">
    @import '../common/style/sendPost.less';
</style>