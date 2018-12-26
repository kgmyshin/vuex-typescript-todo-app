<template>
  <div>
    <NewTodoVue />
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <TodoVue
          v-bind:id="todo.id"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapState, mapGetters, mapActions, createNamespacedHelpers } from 'vuex';
import { Todo } from '@/models/Todo';
import TodoVue from './Todo.vue'
import NewTodoVue from './NewTodo.vue'
import { ITodoListState } from '@/stores/TodoListStore';

@Component({
  components: {
    TodoVue,
    NewTodoVue
  }
})
export default class TodoListVue extends Vue {
  beforeCreate() {
    let { mapState } = createNamespacedHelpers("todos")
    this.$options.computed = {
      ...mapState(["todos"])
    }
  }
}
</script>

