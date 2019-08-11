<template>
    <section class="selectPostType">
        <div class="date">
            <span class="day">{{day}}</span>
            <span class="week">{{week}}</span>
            <span class="month">{{month}} / {{year}}</span>
        </div>
        <div class="weather">
            <span class="img_weather"><img :src="weather"></span>
            <span class="dushu">-15`C</span>
            <span class="distant">YuHang</span>
            <span>
        <iframe scrolling="no" src="https://tianqiapi.com/api.php?style=te&skin=sogou" frameborder="0" width="100%"
                height="48" allowtransparency="true"></iframe>
      </span>
        </div>
        <div class="send_choice">
            <div class="choice_item" @click="is_Inform">
                <span class="img_choice"><i class="iconfont icon-list"></i></span>
                <span>{{$t("sendpost.inform")}}</span>
            </div>
            <div class="choice_item" @click="toDiscover">
                <span class="img_choice"><i class="iconfont icon-discover"></i></span>
                <span>{{$t("sendpost.discover")}}</span>
            </div>
            <div class="choice_item" @click="sendNews" v-if="isAdmain">
                <span class="img_choice"><i class="iconfont icon-discover"></i></span>
                <span>{{$t("sendpost.news")}}</span>
            </div>

            <div class="infor_choice" v-show="isInform"><!--八种information-->
                <div class="infor_item" v-for="inform in informs" @click="gotoType(inform.page,inform.name)">
                    <span class="img_infor"><img :src="inform.icon"/></span>
                    <span>{{inform.name}}</span>
                </div>
                <div class="back_choice">
                    <i class="iconfont icon-back" @click="not_Inform"></i>
                </div>
            </div>

        </div>
        <div class="bottom_close"><i class="iconfont icon-close" @click="back"></i></div>
    </section>
</template>

<script>
    // import headTop from '../../components/headTop.vue';
    import qing from '../../common/images/weather/qing.png';
    import duoyun from '../../common/images/weather/duoyun.png';
    import yintian from '../../common/images/weather/yintian.png';
    import xiaoyu from '../../common/images/weather/xiaoyu.png';
    import dayu from '../../common/images/weather/dayu.png';
    import leidian from '../../common/images/weather/leidian.png';
    import xue from '../../common/images/weather/xue.png';
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
            // headTop,
        },
        data() {
            return {
                day: '01',
                month: '01',
                year: '2018',
                week: 'Monday',
                weather: '',
                isInform: false,
                informs: [
                    {name: this.$t('inform.item1'), icon: img_event, page: 'event'},
                    {name: this.$t('inform.item2'), icon: img_travel, page: 'travel'},
                    {name: this.$t('inform.item3'), icon: img_entre, page: 'entrepreneurship'},
                    {name: this.$t('inform.item4'), icon: img_chinese, page: 'chinese'},
                    {name: this.$t('inform.item5'), icon: img_house, page: 'house'},
                    {name: this.$t('inform.item6'), icon: img_2nd, page: 'secondhand'},
                    {name: this.$t('inform.item7'), icon: img_sales, page: 'sales'},
                    {name: this.$t('inform.item8'), icon: img_recruit, page: 'recruitment'},
                    // {name: this.$t('inform.item9'), icon: img_others, page: 'others'},
                ],
                isAdmain: true,
            }
        },
        methods: {
            back() {
                this.$router.go(-1)
            },
            is_Inform() {
                this.isInform = true;
            },
            not_Inform() {
                this.isInform = false;
            },
            gotoType(type, name) {
                this.$router.push({name: 'sendPost', params: {type: type, name: name}})
            },
            toDiscover() {
                this.$router.push('/sendDiscover');
            },
            sendNews() {
                this.$router.push('/sendNews');
            }
        },
        created() {
            // this.$api.isAdmain(res => {
            //   if(res == 1) {
            //     this.isAdmain = true;
            //   }
            // });
            var myDate = new Date();
            var monthResult = ['01', '02', '03', '04', '05', '06', '07', '08', '09'];
            var dayResult = ['', '01', '02', '03', '04', '05', '06', '07', '08', '09'];
            var weekResult = [this.$t('week.sun'), this.$t('week.mon'), this.$t('week.tue'), this.$t('week.wed'), this.$t('week.thu'), this.$t('week.fri'), this.$t('week.sat')];
            this.year = myDate.getFullYear();//获取完整的年份(4位,1970-????)
            if (myDate.getMonth() < 9) this.month = monthResult[myDate.getMonth()];
            else this.month = myDate.getMonth() + 1;//获取当前月份(0-11,0代表1月)
            if (myDate.getDate() < 10) this.day = dayResult[myDate.getDate()];
            else this.day = myDate.getDate();//获取当前日期(1-31)
            this.week = weekResult[myDate.getDay()];//获取当前星期X(0-6,0代表星期天)
            this.weather = leidian;
        }
    }
</script>

<style lang="less">
    @import '../../common/style/selectPostType.less';
</style>