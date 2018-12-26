import Vue from 'vue';
import Vuex from 'vuex';
import { createTodoListModule } from './stores/TodoListStore';

Vue.use(Vuex);

let store = new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {}
});

store.registerModule("todos", createTodoListModule(store))

export default store