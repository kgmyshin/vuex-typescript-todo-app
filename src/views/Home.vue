<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <TodoList/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TodoList from '@/components/TodoList.vue'; // @ is an alias to /src

@Component({
  components: {
    TodoList,
  },
})
export default class Home extends Vue {}
</script>
