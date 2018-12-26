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
import { mapState, mapGetters, mapActions, createNamespacedHelpers } from 'vuex';
import { Todo } from '@/models/Todo';
import { ITodoState, ITodoGetters } from '@/stores/TodoStore';

@Component
export default class TodoVue extends Vue {
  @Prop() id!: string

  beforeCreate() {
    let _this = this;

    this.$options.computed = {
      ...mapState({
        state(state: any) {
          return state[`todos`][`${_this.id}`];
        },
        todo(state: any) {
          return state[`todos`][`${_this.id}`].todo;
        },
        hasDone(state: any, getters: any) {
          return getters[`todos/${_this.id}/hasDone`]
        }
      })
    }
    this.$options.methods = {
      ...mapActions({
        done(dispatch: any, payload: any) {
          return dispatch(`todos/${_this.id}` + "/done", payload)
        },
        undone(dispatch: any, payload: any) {
          return dispatch(`todos/${_this.id}` + "/undone", payload)
        },
      })
    }
  }
}
</script>

