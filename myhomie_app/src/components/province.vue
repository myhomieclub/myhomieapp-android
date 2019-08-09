<template>
	<section class="province">
	  <div class="back_block">
          <div class="selection_box">
            <div class="select_list" v-for="(pro, index) in provinces" @click="select_pro(pro.name, index)" v-show="show_pro">{{pro.name}}
              <span class="select_btn" 
                  :class="{isCheck: pro.isCheck}">
              </span>
            </div>
            <div class="select_list" v-for="(tem, index) in citys_temp.city" @click="select_city(tem.nam, index)" v-show="show_city">{{tem.nam}}
              <span class="select_btn" :class="{isCheck: tem.isCheck}"></span>
            </div>
          </div>
      </div>
	</section>
</template>

<script type="text/javascript">
import {provinces, citys} from '../assets/province.js';
	export default {
		data() {
			return {
				citys_temp: [],
				show_pro: true,
				show_city: false,
				provinces: provinces,
				citys: citys,
			}
		},
		methods: {
			select_pro(key, index) {
				var that = this;
		        this.provinces.forEach(function(res) {
		          res.isCheck = false; //初始化将所有的item项目的可选变为false
		        });
		        this.provinces.some(function(res) {
		          if(res.name === key) {
		            res.isCheck = true;
		            that.$emit("proChange", res.name);
		            res.isCheck = true;
		            return true;
		          }
		        });
		        this.citys.forEach(function(res) {
		        	if(res.pro === key) {
		        		that.citys_temp = res;
		        		window.setTimeout(function() {
				          that.show_pro = !that.show_pro;
		        		  that.show_city = !that.show_city;		  
				        },100); 
		        	}
		        });
			},
			select_city(key, index) {
				var that = this;
				that.citys_temp.city.forEach(function(res) {
		          res.isCheck = false;
		        });
		        that.citys_temp.city.some(function(res) {
		          if(res.nam === key) {
		            res.isCheck = true;
		            that.$emit("cityChange", res.nam);
		            return true;
		          }
		        });
		        window.setTimeout(function() {
        		  that.show_city = !that.show_city;
        		  that.show_pro = !that.show_pro;
		        },100); 
			}
		}
	}
</script>

<style lang="less">
@import '../common/style/sendPost.less';
</style>