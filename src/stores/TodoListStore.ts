import * as Vuex from 'vuex'
import { DefineGetters, DefineMutations, DefineActions } from 'vuex-type-helper'
import { Todo } from '@/models/Todo';
import { createTodoModule } from './TodoStore';
import uuid from 'uuid';

export interface ITodoListState {
  todos: Todo[]
}

export interface ITodoListGetters {
}

export interface ITodoListMutations {
  add: {
    todo: Todo
  },
  remove: {
    todo: Todo
  }
}

export interface ITodoListActions {
  add: {
    todo: Todo
  },
  remove: {
    todo: Todo
  }
}

const state: ITodoListState = {
  todos: [
    new Todo(
      "1",
      "タスク1",
      false
    ),
    new Todo(
      uuid.v4(),
      "タスク2",
      false
    ),
    new Todo(
      uuid.v4(),
      "タスク3",
      false
    )
  ]
}

const getters: DefineGetters<ITodoListGetters, ITodoListState> = {
}

const mutations: DefineMutations<ITodoListMutations, ITodoListState> = {
  add (state, { todo }) {
    state.todos.push(todo)
    modules[todo.id] = createTodoModule(todo)
  },
  remove (state, { todo }) {
    state.todos = state.todos.filter(item => {item.id !== todo.id})
    delete modules[todo.id]
  }
}

const actions: DefineActions<ITodoListActions, ITodoListState, ITodoListMutations, ITodoListGetters> = {
  add (context, payload) {
    context.commit('add', payload);
  },
  remove (context, payload) {
    context.commit('remove', payload)
  }
}

const modules: { [key: string]: Vuex.Module<any, any>; } = {}

state.todos.forEach(todo => {
  modules[todo.id] = createTodoModule(todo)
})

export class TodoListModule implements Vuex.Module<ITodoListState, any> {
  namespaced = true
  state = state
  getters = getters
  actions = actions
  mutations = mutations
  modules = modules
}

export const createTodoListModule = () => {
  return new TodoListModule()
}