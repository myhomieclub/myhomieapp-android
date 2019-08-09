<template>
	<div style="width:100%; max-width: 680px;">
		<van-popup v-model="show" @click-overlay="cancelReport" class="report" style="width: 80%;padding: 15px;font-size: 14px;">
	      <div class="report_title" style="font-size: 16px; line-height: 24px;margin-bottom: 10px;">{{$t('report.title')}}</div>
	      <van-radio-group v-model="radio" style="line-height: 24px;z-index: 9999">
	        <van-radio name="1" @click="radio = '1'">{{$t('report.item1')}}</van-radio>
	        <van-radio name="2" @click="radio = '2'">{{$t('report.item2')}}</van-radio>
	        <van-radio name="3" @click="radio = '3'">{{$t('report.item3')}}</van-radio>
	        <van-radio name="4" @click="radio = '4'">{{$t('report.item4')}}</van-radio>
	      </van-radio-group>
	      <van-button @click="reportPostComment" class="report_button" style="width:100%;background-color: #fe8f2d;color: #fff;margin-top: 10px;border-radius: 5px;">{{$t('report.report')}}</van-button>
	    </van-popup>
	</div>
</template>

<script type="text/javascript">
	export default {
		props: {
			show: Boolean,
			reportId: String,
			reportType: Number,
		},
		data() {
			return {
				radio: '',
			}
		},
		methods: {
			cancelReport() {
				this.radio = '';
				this.$emit("reportFinish", false);
			},
			reportPostComment() {
				this.$api.isLogin().then(res => {
		        	if(res == 1) {
		        		if(this.radio == '') {
		        			this.$toast('choose reason');
		        		}else {
		        			this.$emit("reportFinish", false);
				            if(this.reportType == 0) {
								let form = new FormData();
						        form.append('postid', this.reportId);
						        form.append('reason', this.$t('report.item'+this.radio));
						        this.$api.reportAPost(form).then(res => {
						          if(res.status_code == 1) {
						            this.$toast("report success");
						            this.radio = '';			          
						          }
						        })
							}else {
								let form = new FormData();
						        form.append('commentid', this.reportId);
						        form.append('reason', this.$t('report.item'+this.radio));
						        this.$api.reportAComment(form).then(res => {
						          if(res.status_code == 1) {
						            this.$toast("report success");
						            this.radio = '';
						          }
						        })
							}
		        		}
			        }else {
			            this.$router.push({path:'/login_register',query: {redirect: this.$route.path}});
			        }
			    });
		    }
		}
	}
</script>

<style lang="less">
</style>