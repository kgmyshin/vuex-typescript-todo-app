import Vue from 'vue';
import Vuex from 'vuex';
import { createTodoListModule } from './stores/TodoListStore';

Vue.use(Vuex);

const store = new Vuex.Store({});

store.registerModule('todos', createTodoListModule(store));

export default store;
