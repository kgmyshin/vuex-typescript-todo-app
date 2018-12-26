import * as Vuex from 'vuex';

interface PluggableModuleOptions<S, R> {
  store: Vuex.Store<any>;
  namespaced?: boolean;
  state?: S | (() => S);
  getters?: Vuex.GetterTree<S, R>;
  actions?: Vuex.ActionTree<S, R>;
  mutations?: Vuex.MutationTree<S>;
  modules?: Vuex.ModuleTree<R>;
  plugins?: Array<Vuex.Plugin<S>>;
}

export class PluggableModule<S, R> implements Vuex.Module<S, R> {
  public store: Vuex.Store<any>;
  public namespaced?: boolean;
  public state?: S | (() => S);
  public getters?: Vuex.GetterTree<S, R>;
  public actions?: Vuex.ActionTree<S, R>;
  public mutations?: Vuex.MutationTree<S>;
  public modules?: Vuex.ModuleTree<R>;
  public plugins?: Array<Vuex.Plugin<S>>;
  constructor(options: PluggableModuleOptions<S, R>) {
    this.store = options.store;
    this.namespaced = options.namespaced;
    this.state = options.state;
    this.getters = options.getters;
    this.mutations = options.mutations;
    this.modules = options.modules;
    this.plugins = options.plugins;
    if (this.plugins != null) {
      this.plugins.forEach((plugin) => {
        plugin(this.store);
      });
    }
  }
}
