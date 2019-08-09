<template>
  <section class="sendPost">
    <div class="topBlank" ref="top"></div>
    <headTop title="SendDiscover" v-bind:backBtn = 'true'>
    </headTop>
    <van-cell-group>
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
      <van-field
        v-model="title"
        label="Title"
        placeholder="Please input title"
      >
      </van-field>
    </van-cell-group>
    <div class="richText">
      <div class="rich_content left">
        <div ref="edit_content" class="edit_content" contentEditable="true" @click="inputBegin" @mouseup="selectText" @keyup="inputText">{{richContent}}</div>
        <span class="note" v-show="isInput">{{note}}</span>
      </div>
      <!-- <div class="bottomBlank"></div> -->
      <div class="edit_option">
        <div class="option">
          <input id="insert_bold" type="button" @click="SetToBold" value='click'>
          <i class="iconfont icon-post" @click="bold" :class="{on:isBold}" ></i>
        </div>
        <div class="option">
          <input id="insert_img" type="file" accept="image/gif, image/jpeg, image/jpg, image/png, image/svg" @change="insert_img">
          <i class="iconfont icon-pic"></i>
        </div>
        <div class="option">
          <input id="insert_video" type="file" accept="video/mp4" @change="insert_video">
          <i class="iconfont icon-record"></i>
        </div>
        <div class="save" @click="send">
          SEND
        </div>
      </div>
    </div>
<!--     <div class="send_bg">
        <van-button size="large" class="send" @click="send">SEND</van-button>        
    </div> -->
    <!--选项弹窗-->
    <div class="back_block" v-show="isShow" @click="hidden">
        <div class="selection_box">
          <div class="select_list" v-for="(item, index) in categoryList" :key="index" @click="select_click(item, index)">
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
        title: '',
        category: '',
        category2: '',
        content: '',
        categoryList: [
          {name: this.$t('news.item2'), isCheck: false, val: 'daily'},
          {name: this.$t('news.item3'), isCheck: false, val: 'arts'},
          {name: this.$t('news.item4'), isCheck: false, val: 'sports'},
          {name: this.$t('news.item5'), isCheck: false, val: 'business'},
          {name: this.$t('news.item6'), isCheck: false, val: 'culture'},
          {name: this.$t('news.item7'), isCheck: false, val: 'policy'},
          {name: this.$t('news.item8'), isCheck: false, val: 'sci-tech'},
          {name: this.$t('news.item9'), isCheck: false, val: 'others'},
        ],
        isShow: false,
        note: 'news detail',
        selectedText: '',
        richContent: '',
        isInput: true,
        isBold: false,
      }
    },
    mounted() {
      var top = this.$refs.top;
      top.style.height = (48 + api.safeArea.top) + 'px';
    },
    methods: {
      hidden() {  ////点击空白区域，隐藏弹出框
        var that = this;
        window.setTimeout(function() {
          that.isShow = !that.isShow;
        },100);  
      },
      display() {  ////折叠选项展开
        this.isShow = !this.isShow;
        var that = this;
        this.categoryList.forEach(function(item) {
          item.isCheck = false;
          if(that.category == item.name) {
            item.isCheck = true;
          }
        });  
      },
      select_click(item, index) { ////弹出选项的选择
        this.categoryList.forEach(function(res) {
          res.isCheck = false;
        });
        item.isCheck = true;
        this.category = item.name;
        this.category2 = item.val;
      },
      send() {////获取所有的input的值，post上传到数据库，然后清空input框内容
        var judge = 0;
        console.log(this.$refs.edit_content);
        this.content = this.$refs.edit_content.innerHTML;
        if(this.title == '') this.$toast("title cannot be empty");
        else if(this.category == '') this.$toast("category cannot be empty");
        else if(this.content == '') this.$toast("content cannot be empty");
        else judge = 1;
        if(judge == 1) {
          const toast1 = this.$toast.loading({
            duration: 0,
                forbidClick: true,
                message: this.$t('util.load')
          });
          new Promise(resolve=> {
            resolve();
          }).then(() => {
            var form = new FormData();
            form.append("post_type", "1");
            form.append("title", this.title);
            form.append("category", this.category2);
            form.append("content", this.content);
            this.$api.sendPost(form).then(res => {
              if(res.status_code == '1') {
                this.title = '';
                this.content = '';
                this.category = '';
                this.category2 = '';
                this.$toast(this.$t('util.send_success'));
                toast1.clear();
              }else {
                this.$toast(this.$t('util.send_false'));
              }
              this.$router.replace('/news');
            }).catch(err => {
              this.$toast("upload false");
              this.$router.replace('/news');
            });
          })
        }
      },
      inputBegin() {
        this.isInput = false;
      },
      selectText() { ////鼠标抬起事件，监控点击和选择
        this.selectedText = this.getSelectedContents();
      },
      getSelectedContents() {  ////鼠标抬起事件，监控点击和选择
        var that = this;
        if(window.getSelection) {
          var range=window.getSelection().getRangeAt(0);
          var startValue = range.startContainer.nodeValue;
          var endValue = range.endContainer.nodeValue;
          var startName = range.startContainer.parentNode.localName;
          var endName = range.endContainer.parentNode.localName;
          var localName = range.endContainer.localName;
          var endOffset = range.endOffset;
          var endLength = range.endContainer.length;
          if(range.collapsed === true) { //光标点击
            if(that.lastEditRange === range) {
              that.isBold = that.isBold;
            }else {
              if(startName === 'b' || startName === 'span') {
                that.isBold = true;
              }
              else if(localName === 'b') that.isBold = true;
              else that.isBold = false;
            }
          }
          else { /////选择一些文本，而不是点击
            if(startValue === endValue) { //选择单种文本
              if(startName === 'b' || startName === 'span') {
                that.isBold = true;
              }
              else that.isBold = false;
            }
            else { //选择多种文本
              if(startName === endName) {
                if(startName === 'b'||startName ==='span') that.isBold = true;
                else that.isBold = false;
              }else {
                that.isBold = false;
              }
            }
          }
          that.lastEditRange = range;
          var container = document.createElement('div');
          container.appendChild(range.cloneContents());
          return container.innerHTML;
        }
        else if (document.getSelection) { //其他
          var range=window.getSelection().getRangeAt(0);
          var startValue = range.startContainer.nodeValue;
          var endValue = range.endContainer.nodeValue;
          var startName = range.startContainer.parentNode.localName;
          var endName = range.endContainer.parentNode.localName;
          var localName = range.endContainer.localName;
          var endOffset = range.endOffset;
          var endLength = range.endContainer.length;

          if(range.collapsed === true) { //光标点击
            if(that.lastEditRange === range) {
              that.isBold = that.isBold;
            }else {
              if(startName === 'b' || startName === 'span') {
                that.isBold = true;
              }
              else if(localName === 'b') that.isBold = true;
              else that.isBold = false;
            }
          }
          else { /////选择一些文本，而不是点击
            if(startValue === endValue) { //选择单种文本
              if(startName === 'b' || startName === 'span') {
                that.isBold = true;
              }
              else that.isBold = false;
            }
            else { //选择多种文本
              if(startName === endName) {
                if(startName === 'b'||startName ==='span') that.isBold = true;
                else that.isBold = false;
              }else {
                that.isBold = false;
              }
            }
          }
          that.lastEditRange = range;
          var container = document.createElement('div');
          container.appendChild(range.cloneContents());
          return container.innerHTML;
        }
        else if (document.selection) { //IE特有的
          return document.selection.createRange().htmlText;
        }
      },
      inputText() { ////键盘事件，持续记录最后一次在的光标位置
        this.lastEditRange = window.getSelection().getRangeAt(0);
      },
      SetToBold () {  //加粗按钮按下后的操作
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
        if(!files.length) return;
        var form = new FormData();
        form.append('img',files[0]);
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
        if(!files.length) return;
        var form = new FormData();
        form.append('video',files[0]);
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
        bigVideo.controls='controls';
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
      },
    }
  }
</script>

<style lang="less">
@import '../../common/style/sendPost.less';
</style>