<template>
  <div>
    <input 
    type="checkbox"
    :checked="hasDone"
    @click="hasDone ? undone() : done()"
    > 
    {{ todo.body }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Todo } from '@/models/Todo';
import { ITodoState, ITodoGetters } from '@/stores/TodoStore';
import { createNamespacedFnHelpers } from '@/utils/mapper'

@Component
export default class TodoVue extends Vue {
  @Prop() id!: string
  beforeCreate() {
    let { mapState, mapGetters, mapActions } = createNamespacedFnHelpers(() => { return `todos/${this.id}` })
    this.$options.computed = {
      ...mapState(["todo"]),
      ...mapGetters(["hasDone"])
    }
    this.$options.methods = {
      ...mapActions(["done", "undone"])
    }
  }
}
</script>

