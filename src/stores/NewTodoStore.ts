import * as Vuex from 'vuex';
import { DefineGetters, DefineMutations, DefineActions, Dispatcher, Committer } from 'vuex-type-helper';
import { Todo } from '@/models/Todo';
import uuid from 'uuid';

export interface INewTodoState {
  id: string;
  body: string;
}

export interface INewTodoMutations {
  refresh: {};
  update: Event;
}

export interface INewTodoActions {
  submit: {
    body: string;
  };
  update: Event;
}

const state: INewTodoState = {
  id: uuid.v4(),
  body: '',
};

const mutations: DefineMutations<INewTodoMutations, INewTodoState> = {
  refresh(state, _) {
    state.body = '';
    state.id = uuid.v4();
  },
  update(state, payload) {
    if (payload.target instanceof HTMLInputElement) {
      state.body = payload.target.value;
    }
  },
};

const actions: DefineActions<INewTodoActions, INewTodoState, INewTodoMutations, {}> = {
  submit(context, _) {
    const newTodo = new Todo(
      context.state.id,
      context.state.body,
      false,
    );
    context.commit('refresh', _);
    context.commit('todos/add', {todo: newTodo}, { root: true });
  },
  update(context, payload) {
    context.commit('update', payload);
  },
};

export class NewTodoModule implements Vuex.Module<INewTodoState, any> {
  public namespaced = true;
  public state = state;
  public actions = actions;
  public mutations = mutations;
}

export const createNewTodoModule = () => {
  return new NewTodoModule();
};
