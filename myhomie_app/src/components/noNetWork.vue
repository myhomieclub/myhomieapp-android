<template>
  <div class="noNet">
  	<img :src="noNetImg" class="noNetImg">
  	{{noNet}}
  </div>
</template>

<script>
import nonet from '../common/images/nonet.png';
	export default {
		data() {
			return {
				noNet: this.$t('util.noNet'),
				noNetImg: nonet,
			}
		}
	}
</script>

<style lang="less" scoped>
.noNet {
	position: fixed;
	top:0;
	bottom: 0;
	width: 100%;
	max-width: 680px;
	background-color: #FFF;
	font-size: 20px;
	color: #333;
	text-align: center; 
	line-height: 20px;
}
.noNetImg {
	display: block;
	margin: 120px auto 10px;
	width: 40%;
}
</style>