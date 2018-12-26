<template>
  <div>
    <NewTodo />
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <Todo
          v-bind:id="todo.id"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { createNamespacedHelpers } from 'vuex';
import Todo from './Todo.vue';
import NewTodo from './NewTodo.vue';
import { ITodoListState } from '@/stores/TodoListStore';

@Component({
  components: {
    Todo,
    NewTodo,
  },
})
export default class TodoListVue extends Vue {
  public beforeCreate() {
    const { mapState } = createNamespacedHelpers('todos');
    this.$options.computed = {
      ...mapState(['todos']),
    };
  }
}
</script>
