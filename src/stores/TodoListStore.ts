import * as Vuex from 'vuex'
import { DefineGetters, DefineMutations, DefineActions } from 'vuex-type-helper'
import { Todo } from '@/models/Todo';
import { createTodoModule } from './TodoStore';
import uuid from 'uuid';
import { createNewTodoModule } from './NewTodoStore';
import { PluggableModule } from '@/vuexz/PluggableModule'

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
      uuid.v4(),
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
  },
  remove (state, { todo }) {
    state.todos = state.todos.filter(item => {item.id !== todo.id})
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

let plugin = (store: Vuex.Store<any>) => {
  state.todos.forEach(todo => {
    store.registerModule("todos/" + todo.id, createTodoModule(todo))
  })
  store.subscribe((mutation, state) => {
    if (mutation.type === "todos/add") {
      let todo = mutation.payload.todo as Todo
      store.registerModule("todos/" + todo.id, createTodoModule(todo))
    } else if (mutation.type === "todos/remove") {
      let todo = mutation.payload.todo as Todo
      store.unregisterModule("todos/" + todo.id)
    }
  })
}

export const createTodoListModule = (store: Vuex.Store<any>) => {
  return new PluggableModule<ITodoListState, any>({
    store: store,
    namespaced: true,
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations,
    plugins: [plugin],
    modules: {
      new: createNewTodoModule()
    },
  })
}