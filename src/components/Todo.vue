<template>
  <div>
    <input 
    type="checkbox"
    :checked="hasDone"
    @click="hasDone ? undone() : done()"
    > 
    {{ todo.body }}
    <button @click="remove">削除</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ITodoState, ITodoGetters } from '@/stores/TodoStore';
import { createNamespacedFnHelpers } from '@/vuexz/mapper';

@Component
export default class Todo extends Vue {
  @Prop() private id!: string;
  public beforeCreate() {
    const { mapState, mapGetters, mapActions } = createNamespacedFnHelpers(() => `todos/${this.id}`);
    this.$options.computed = {
      ...mapState(['todo']),
      ...mapGetters(['hasDone']),
    };
    this.$options.methods = {
      ...mapActions(['done', 'undone', 'remove']),
    };
  }
}
</script>

