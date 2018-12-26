import * as Vuex from 'vuex'

interface PluggableModuleOptions<S, R> {
  store: Vuex.Store<any>;
  namespaced?: boolean;
  state?: S | (() => S);
  getters?: Vuex.GetterTree<S, R>;
  actions?: Vuex.ActionTree<S, R>;
  mutations?: Vuex.MutationTree<S>;
  modules?: Vuex.ModuleTree<R>;
  plugins?: Vuex.Plugin<S>[];  
}

export class PluggableModule<S, R> implements Vuex.Module<S, R> {
  store: Vuex.Store<any>;
  namespaced?: boolean;
  state?: S | (() => S);
  getters?: Vuex.GetterTree<S, R>;
  actions?: Vuex.ActionTree<S, R>;
  mutations?: Vuex.MutationTree<S>;
  modules?: Vuex.ModuleTree<R>;
  plugins?: Vuex.Plugin<S>[];
  constructor(options: PluggableModuleOptions<S, R>) {
    this.store = options.store
    this.namespaced = options.namespaced
    this.state = options.state
    this.getters = options.getters
    this.mutations = options.mutations
    this.modules = options.modules
    this.plugins = options.plugins
    if (this.plugins != null) {
      this.plugins.forEach(plugin => {
        plugin(this.store)
      })
    }
  }
}