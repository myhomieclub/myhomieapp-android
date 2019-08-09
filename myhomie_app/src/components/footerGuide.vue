<template>
  <footer class="footer_guide">
    <div class="guide_item" 
    @click="goto('/news')" :class="{on: isCurrent('/news')}">
        <span class="item_icon">
            <i class="iconfont icon-home"></i>
        </span>
        <span>{{$t("home.item1")}}</span>
    </div>
    <div class="guide_item"
    @click="goto('/information')" :class="{on: isCurrent('/information')}">
        <span class="item_icon">
            <i class="iconfont icon-list"></i>
        </span>
        <span>{{$t("home.item2")}}</span>
    </div>
    <div class="guide_item"
    @click="goto('/selectPostType')" :class="{on: isCurrent('/selectPostType')}">
        <span class="item_icon">
            <i class="iconfont icon-roundadd"></i>
        </span>
        <span>{{$t("home.item3")}}</span>
    </div>
    <div class="guide_item"
    @click="goto('/discover')" :class="{on: isCurrent('/discover')}">
        <span class="item_icon">
            <i class="iconfont icon-discover"></i>
        </span>
        <span>{{$t("home.item4")}}</span>
    </div>
    <div class="guide_item"
    @click="goto('/center')" :class="{on: isCurrent('/center')}">
        <span class="item_icon">
            <i class="iconfont icon-profile"></i>
        </span>
        <span>{{$t("home.item5")}}</span>
    </div>
  </footer>
</template>

<script>
	export default {
		methods: {
            goto (path) {
                if(path === '/selectPostType') this.$router.push(path);
                else this.$router.replace(path);
            },
            isCurrent (path) {
                return this.$route.path === path
            }
        }
	}
</script>

<style lang="less">
@import '../common/icon/iconfont.css';
@import '../common/style/footerGuide.less';
</style>