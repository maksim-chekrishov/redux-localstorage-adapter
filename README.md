# redux-localstorage-adapter
Localstorage adapter for redux

[![npm version](https://badge.fury.io/js/redux-rest-adapter.svg)](https://badge.fury.io/js/redux-localstorage-adapter)

##Setup

###known-localstorage-api.js

```js
import LocalStorageApi from 'redux-localstorage-adapter';

const knownLocalStorageKeys = [
  'NEWS_SIMILAR_ENTRIES_TEMPLATE',
  'FIRE_THEME_ENABLED'
];

const knownApi = {};

knownLocalStorageKeys.forEach(key=> {
  knownApi[key] = new LocalStorageApi(key);
});

export default knownApi;
```

###localstorage-reducer.js

```js
export default combineReducers(_.mapValues(knownApi, api => api.reducer));
```

###localstorage-actions.js

```js
export default _.mapValues(knownApi, api => api.actions);
```

##Usage

###some-redux-container.js
```js
class SomeComponent extends BaseComponent {
/...
 onCarIconClick = ()=> {
    this.props.setFire(!this.props.fireEnabled);
  }
/...
}

const mapStateToProps = (state) => ({
  fireEnabled: state.localStorage.FIRE_THEME_ENABLED
});

const mapDispatchToProps = {
  setFire: localStorageAction.FIRE_THEME_ENABLED.setItem
}

export default connect(mapStateToProps, mapDispatchToProps)(SomeComponent);
```
