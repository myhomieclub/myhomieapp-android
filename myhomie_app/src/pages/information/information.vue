<template>
    <div class="information">
        <headTop :title="$t('inform.name')" v-bind:headBtn='false'>
            <!-- <span class="header_right" slot="right">
            <i class="iconfont icon-search" @click="search" style="font-size: 20px;"></i>
          </span> -->
        </headTop>
        <div class="topBlank"></div>
        <div class="information_select">
            <div class="information_item" v-for="item in informations" @click="goto(item.page,item.name)">
                <div class="item_img"><img :src="item.icon"></div>
                <div class="cont">{{item.name}}</div>
            </div>
        </div>
        <div class="bottomBlank"></div>
    </div>
</template>

<script>
    import headTop from '../../components/headTop.vue';
    import img_event from '../../common/images/info_event.png';
    import img_travel from '../../common/images/info_travel.png';
    import img_entre from '../../common/images/info_event.png';
    import img_chinese from '../../common/images/info_chinese.png';
    import img_house from '../../common/images/info_house.png';
    import img_2nd from '../../common/images/info_event.png';
    import img_sales from '../../common/images/info_sales.png';
    import img_recruit from '../../common/images/info_recruit.png';
    import img_others from '../../common/images/info_others.png';

    export default {
        components: {
            headTop,
        },
        data() {
            return {
                informations: [
                    {name: this.$t('inform.item1'), icon: img_event, page: 'event'},
                    {name: this.$t('inform.item2'), icon: img_travel, page: 'travel'},
                    {name: this.$t('inform.item3'), icon: img_entre, page: 'entrepreneurship'},
                    {name: this.$t('inform.item4'), icon: img_chinese, page: 'chinese'},
                    {name: this.$t('inform.item5'), icon: img_house, page: 'house'},
                    {name: this.$t('inform.item6'), icon: img_2nd, page: 'secondhand'},
                    {name: this.$t('inform.item7'), icon: img_sales, page: 'sales'},
                    {name: this.$t('inform.item8'), icon: img_recruit, page: 'recruitment'},
                    // {name: this.$t('inform.item9'), icon: img_others, page: 'others'},
                ]
            }
        },
        methods: {
            search() {
                this.$router.push({name: 'search', params: {type: 2}});
            },
            goto(type, name) {
                this.$router.push({name: 'informationList', params: {type: type}, query: {name: name}});
            }
        }
    }
</script>

<style lang="less">
    @import '../../common/style/information.less';
</style>