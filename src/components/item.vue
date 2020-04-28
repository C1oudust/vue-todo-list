<template>
	<transition>
		<div
			class="list-item editingClass editing"
			:class="{checked: item.checked}"
			v-show="!item.isDelete"
		>
			<label class="checkbox">
				<input
					type="checkbox"
					v-model="item.checked"
					name="checked"
					@change="onChange"
					:disabled="locked"
				/>
				<span class="checkbox-custom"></span>
			</label>
			<input
				type="text"
				v-model="item.text"
				placeholder="写点什么"
				:disabled="item.checked || locked"
				@keyup.enter="onChange"
			/>
			<a class="delete-item" v-if="item.checked && locked" @click="item.isDelete = true;onChange()">
				<span class="icon-trash"></span>
			</a>
		</div>
	</transition>
</template>
<script>
import { editRecord } from '../api/api'
export default {
	props: {
		item: {
			type: Object,
			default: () => {
				return {
					checked: false,
					text: '新增事项'
				}
			}
		},
		'index': {
		},
		'id': {
		},
		'init': {
		},
		'locked': {
		}

	},
	methods: {
		onChange() {
			editRecord({
				id: this.id, record: this.item, index: this.index
			}).then(() => {
				this.init();
				this.$store.dispatch('getTodo')
			})
		}
	}
};
</script>
<style lang="less">
@import '../common/style/list-item.less';
.slide-fade-enter-active {
	transition: all 0.3s ease;
}
.slide-fade-leave-active {
	transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-active {
	transform: translateX(10px);
	opacity: 0;
}
</style>