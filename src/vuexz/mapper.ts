/* tslint:disable */

export var createNamespacedFnHelpers = function (namespaceFn: () => string) { return ({
  mapState: mapState.bind(null, namespaceFn),
  mapGetters: mapGetters.bind(null, namespaceFn),
  mapMutations: mapMutations.bind(null, namespaceFn),
  mapActions: mapActions.bind(null, namespaceFn)
}); };

export var mapState = function(namespaceFn: () => string, states: any) {
  var res: any = {}
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;
    res[key] = function mappedState () {
      var namespace: string = normalizeNamespace(namespaceFn.call(this))
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    }
    res[key].vuex = true;
  });
  return res
};

export var mapGetters = function(namespaceFn: () => string, getters: any) {
  var res: any = {};
    normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    res[key] = function mappedGetter () {
      var namespace: string = normalizeNamespace(namespaceFn.call(this))
      var val = namespace + ref.val
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (process.env.NODE_ENV !== 'production' && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
}

export var mapActions = function(namespaceFn: () => string, actions: any) {
  var res: any = {}
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key
    var val = ref.val
    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
      let namespace = normalizeNamespace(namespaceFn.call(this))
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    }
  })
  return res
}

export var mapMutations = function(namespaceFn: () => string, mutations: any) {
var res: any = {}
normalizeMap(mutations).forEach(function (ref) {
  var key = ref.key
  var val = ref.val
  res[key] = function mappedMutation () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];
    let namespace = normalizeNamespace(namespaceFn.call(this))
    var commit = this.$store.commit;
    if (namespace) {
      var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
      if (!module) {
        return
      }
      commit = module.context.commit;
    }
    return typeof val === 'function'
      ? val.apply(this, [commit].concat(args))
      : commit.apply(this.$store, [val].concat(args))
    }
  })
}

function normalizeMap (map: any) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function getModuleByNamespace (store: any, helper: any, namespace: any) {
  var module = store._modulesNamespaceMap[namespace];
  if (process.env.NODE_ENV !== 'production' && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

function normalizeNamespace (namespace: string) {
  if (namespace.charAt(namespace.length - 1) !== '/') {
    return namespace + '/';
  }
  return namespace
}