const Immutable = require('immutable');
const Optional = require('optional-js');

const { bindActionCreators: _bindActionCreators } = require('redux');

module.exports = class Base {
  constructor(dispatch, state = Immutable.Map(), Modules = {}) {
    this.state = state;
    this.dispatch = dispatch;
    this._actions = this.setupActionCreators.call(this);
    this._modules = this.initializeModules.call(this, Modules);

    this.willRecieveState = this.willRecieveState.bind(this);
    this.shouldUpdate = this.shouldUpdate.bind(this);
    this.willUpdate = this.willUpdate.bind(this);
    this.didUpdate = this.didUpdate.bind(this);
    this.updateModules = this.updateModules.bind(this);
    this.bindActionCreators = this.bindActionCreators.bind(this);
  }

  get actions() {
    return this._actions;
  }

  get modules() {
    return this._modules;
  }

  willRecieveState(nextState) {
    const currentState = this.state;
    const shouldUpdate = this.shouldUpdate(currentState, nextState)
    if ( shouldUpdate ) {
      this.willUpdate(currentState, nextState);

      updateState(this, nextState).then(() => {
        this.didUpdate(currentState, nextState);
        this.updateModules(nextState);
      });
    }

    return nextState;
  }

  shouldUpdate(currentState, nextState) {
    return nextState !== null && !currentState.equals(nextState);
  }

  willUpdate(currentState, nextState) {
    return currentState;
  }

  didUpdate(prevState, currentState) {
    return currentState;
  }

  initializeModules(Modules) {
    return Immutable.Map(Modules).reduce((modules, Mod) => {
      const modName = Mod.name.toLowerCase();
      const modState = this.state.get(modName);

      return modules.set(modName, new Mod(this.dispatch, modState));
    }, Immutable.Map()).toJS();
  }

  updateModules(nextState) {
    Optional.ofNullable(this.modules).map(modules => {
      Immutable.Map(modules).map(mod => {
        const modName = mod.constructor.name.toLowerCase();
        const modState = nextState.get(modName);
        mod.willRecieveState(modState);
      });
    });
  }

  setupActionCreators() {
    try {
      const { actionCreators } = require(`../redux/modules/${this.constructor.name.toLowerCase()}`);
      return this.bindActionCreators(actionCreators, this.dispatch);
    } catch(err) {
      return {}
    }
  }

  bindActionCreators(actionCreators) {
    const bound = Immutable.Map(_bindActionCreators(actionCreators, this.dispatch));
    return bound.map( ac => (...args) => Promise.resolve( ac(...args) ) ).toJS();
  }
}

function updateState(module, nextState) {
  return Promise.resolve(module.state = nextState);
}