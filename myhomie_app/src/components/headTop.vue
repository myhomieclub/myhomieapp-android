<template>
    <header class="header">
        <!-- 插槽是父组件与子组件的通讯方式，子组件中的slot可以显示父组件传递给子组件的内容 -->
        <span class="header_back" v-show="backBtn === true">
  			<i class="iconfont icon-back" @click="back();"></i>
  		</span>
        <slot name="search"></slot>
        <slot name="right"></slot>
        {{title}}
    </header>
</template>

<script>
    export default {
        props: {
            title: String,
            backBtn: Boolean,
        },
        created() {
            var head = document.getElementsByTagName('header')[0];
            head.style.paddingTop = api.safeArea.top + 'px';
        },
        mounted() {
            var head = document.getElementsByTagName('header')[0];
            head.style.paddingTop = api.safeArea.top + 'px';
        },
        activated() {
            var head = document.getElementsByTagName('header')[0];
            head.style.paddingTop = api.safeArea.top + 'px';
        },
        methods: {
            back() {
                this.$router.go(-1)
            },
        }
    }
</script>

<style lang="less">
    @import '../common/style/util/headTop.less';
</style>