<template>
    <div id="app">
        <keep-alive>
            <!--transition name="fade" mode="out-in"-->
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
        <footerGuide v-show="$route.meta.showFooter"></footerGuide>
        <noNetWork v-show="!$store.state.netWork"></noNetWork>
    </div>
</template>

<script>
    import footerGuide from './components/footerGuide.vue'
    import noNetWork from './components/noNetWork.vue'
    // 引入底部组件并注册
    export default {
        components: {
            footerGuide,
            noNetWork
        },
    }
</script>

<style lang="less">
    .bott {
        width: 100%;
        height: 50px;
    }

    .fade-enter-active {
        transition: opacity .2s;
    }

    .fade-enter {
        opacity: 0;
    }

    .fade-leave {
        opacity: 1;
    }

    .fade-leave-active {
        opacity: 0;
        transition: opacity .2s;
    }
</style>
