<template>
  <div>
    <input
      type="text"
      :value="body"
      @input="update"
      v-on:keyup.enter="submit"
      >
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { createNamespacedHelpers, mapState, mapActions } from 'vuex';

@Component
export default class NewTodoVue extends Vue {
  beforeCreate() {
    let { mapState, mapActions } = createNamespacedHelpers("todos/new")
    this.$options.computed = {
      ...mapState(["body"])
    }
    this.$options.methods = {
      ...mapActions(["submit", "update"])
    }
  }
}
</script>
