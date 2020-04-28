<template>
	<div class="list-todos">
		<a
			@click="goList(item.id)"
			class="list-todo activeListClass list"
			:class="{'active': item.id === todoId}"
			v-for="(item,index) in todoList"
			:key="index"
		>
			<span class="icon-lock" v-if="item.locked"></span>
			<span class="count-list" v-if="item.count">{{item.count || 0}}</span>
			{{item.title}}
		</a>
		<a class="link-list-new" @click="addTodoList">
			<span class="icon-plus"></span>
			新增
		</a>
	</div>
</template>
<script>
import { addTodo } from '../api/api';
export default {
	data() {
		return {
			items: [],
			todoId: '',
			//todoNum: 0 //判断todo数据
		};
	},
	watch: {
		'todoId'(id) {
			this.$router.push({ name: 'todo', params: { id: id } })
		}
	},
	computed: {
		todoList() {
			// this.todoNum = this.$store.getters.getTodoList.length;
			if (this.$store.getters.getTodoList.length < this.todoNum) {
				this.goList(this.$store.getters.getTodoList[0].id);
			}
			return this.$store.getters.getTodoList;
		}
	},
	methods: {
		goList(id) {
			this.todoId = id;
		}
		,
		addTodoList() {
			addTodo({}).then(() => {
				this.$store.dispatch('getTodo').then(() => {
					this.$nextTick(() => {
						setTimeout(() => {
							this.goList(this.todoList[this.todoList.length - 1].id);
						}, 100);
					});
				});
			});
		}
	},
	created() {
		this.$store.dispatch('getTodo').then(() => {
			this.$nextTick(() => {
				this.goList(this.todoList[0].id);
			});
		});
	},
};
</script>
<style lang="less">
@import '../common/style/menu.less';
</style>