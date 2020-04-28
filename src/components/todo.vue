<template>
	<div class="page lists-show" v-show="!todo.isDelete">
		<nav>
			<!-- 当用户浏览窗口尺寸小于40em时候，显示手机端的菜单图标 -->
			<div class="form list-edit-form" v-show="isUpdate">
				<!-- 当用户点击标题进入修改状态，就显示当前内容可以修改 -->
				<input type="text" v-model="todo.title" @keyup.enter="updateTitle" :disabled="todo.locked" />
				<div class="nav-group right">
					<a class="nav-item" @click="isUpdate = false">
						<span class="icon-close"></span>
					</a>
				</div>
			</div>
			<div class="nav-group" @click="updateMenu" v-show="!isUpdate">
				<!--移动端的菜单图标-->
				<a class="nav-item">
					<span class="icon-list-unordered"></span>
				</a>
			</div>
			<h1 class="title-page" @click="isUpdate = true" v-show="!isUpdate">
				<span class="title-wrapper" :disabled="todo.locked">{{todo.title}}</span>
				<span class="count-list">{{todo.count || 0}}</span>
			</h1>
			<div class="nav-group right" v-show="!isUpdate">
				<div class="options-web">
					<a class="nav-item" @click="onlock">
						<span class="icon-lock" v-if="todo.locked"></span>
						<span class="icon-unlock" v-else></span>
					</a>
					<a class="nav-item">
						<span class="icon-trash" @click="onDelete"></span>
					</a>
				</div>
			</div>

			<div class="form todo-new input-symbol">
				<input
					type="text"
					v-model="text"
					placeholder="请输入"
					@keyup.enter="onAdd"
					:disabled="todo.locked"
				/>
				<span class="icon-add"></span>
			</div>
		</nav>
		<div class="content-scrollable list-items">
			<div v-for="(item,index) in items" :key="index">
				<item :item="item" :index="index" :id="todo.id" :init="init" :locked="todo.locked"></item>
			</div>
		</div>
	</div>
</template>
<script>
import Item from './item'
import { getTodo, addRecord, editTodo } from '../api/api'
export default {
	components: {
		Item
	},
	data() {
		return {
			todo: { //详情内容
				title: '星期一',
				count: 12,
				locked: false
			},
			items: [],
			text: '',//新增代办单项绑定的值
			// 修改状态
			isUpdate: false,
		}
	},

	methods: {
		updateMenu() {
			this.$store.dispatch('updateMenu')
		},
		init() {
			const ID = this.$route.params.id;
			getTodo({ id: ID }).then(res => {
				let { id, title, count, isDelete, locked, record } = res.data.todo;
				this.items = record;
				this.todo = {
					id,
					title,
					count,
					locked,
					isDelete
				}
			})
		},
		onAdd() {
			const ID = this.$route.params.id;
			addRecord({ id: ID, text: this.text }).then(() => {
				this.text = ''
				this.init()
				this.$store.dispatch('getTodo');
			})
		},
		updateTodo() {
			let _this = this;
			editTodo({
				todo: this.todo
			}).then(() => {
				// _this.init();
				_this.$store.dispatch('getTodo');
			});
		},
		updateTitle() {
			this.updateTodo();
			this.isUpdate = false;
		},
		onDelete() {
			this.todo.isDelete = true;
			this.updateTodo();
		},
		onlock() {
			this.todo.locked = !this.todo.locked;
			this.updateTodo();
		}
	},
	watch: {
		'$route.params.id'() {
			// 监听$route.params.id的变化，如果这个id即代表用户点击了其他的待办项需要重新请求数据。
			this.init();
		}
	},
	created() {
		this.init();
	},
}
</script>
<style lang = "less">
@import '../common/style/nav.less';
@import '../common/style/form.less';
@import '../common/style/todo.less';
</style>