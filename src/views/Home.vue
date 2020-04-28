<template>
	<section class="container" :class="{'menu-open':menuOpen}">
		<section class="menu">
			<menus></menus>
		</section>
		<section>
			<div class="content-overlay" @click="updateMenu"></div>
			<div class="content-container">
				<router-view></router-view>
			</div>
		</section>
	</section>
</template> 
<script>
import Menus from '../components/menus'
export default {
	name: "Home",
	components: {
		Menus,
	},
	computed: {
		menuOpen() {
			return this.$store.state.menuOpen;
		}
	},
	methods: {
		updateMenu() {
			this.$store.dispatch('updateMenu')
		}
	},
};
</script>
<style lang="less">
@import '../common/style/layout.less';
</style>
