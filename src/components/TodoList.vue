<template>
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      <TodoVue
        v-bind:id="todo.id"
      />
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapState, mapGetters, mapActions, createNamespacedHelpers } from 'vuex';
import { Todo } from '@/models/Todo';
import TodoVue from './Todo.vue'
import { ITodoListState } from '@/stores/TodoListStore';

@Component({
  components: {
    TodoVue
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

