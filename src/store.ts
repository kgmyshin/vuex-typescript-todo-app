import Vue from 'vue';
import Vuex from 'vuex';
import { createTodoListModule } from './stores/TodoListStore';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    todos: createTodoListModule()
  }
});
