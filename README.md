# redux-localstorage-adapter
Localstorage adapter for redux

[![npm version](https://badge.fury.io/js/redux-localstorage-adapter.svg)](https://badge.fury.io/js/redux-localstorage-adapter)

##Main points
- Keep your components pure.
- Sync localstorage and store and use actions to change it.


##Setup

###your/known-localstorage-api.js

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

export default knownLoacalStorageApi;
```

###your/localstorage-reducer.js

```js
import knownLocalStorageApi from 'your/known-localstorage-api';

export default combineReducers(_.mapValues(knownLocalStorageApi, api => api.reducer));

```

###your/index-reducer.js

```js
import localStorage from 'your/localstorage-reducer';

export default combineReducers({
  localStorage
  //..
});
```

###your/localstorage-actions.js

```js
import knownLocalStorageApi from 'your/known-localstorage-api';

export default _.mapValues(knownLocalStorageApi, api => api.actions);
```

##Usage

###your/some-redux-container.js
```js
import localStorageActions from 'your/localstorage-actions';

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
  setFire: localStorageActions.FIRE_THEME_ENABLED.setItem
}

export default connect(mapStateToProps, mapDispatchToProps)(SomeComponent);
```

##Enjoy redux flow

![Image devTools](https://raw.githubusercontent.com/maksim-chekrishov/redux-localstorage-adapter/master/readme-src/dev-tools.png)
