/**
 * Created by m.chekryshov on 15.06.16.
 */

const isNode = typeof get(process, 'versions.node') !== 'undefined';

export default class LocalStorageApi {
  /**
   * Constructor
   *
   * @param {string} key - local storage key
   */
  constructor(key) {
    this.key = key;

    this.ActionsTypes = this.configureActionsTypes();
    this.reducer = this.configureReducer();
    this.actions = this.configureActions();
  }

  _getItem() {
    return isNode
      ? undefined
      : JSON.parse(window.localStorage.getItem(this.key));
  }

  _setItem(item) {
    return isNode
      ? undefined
      : window.localStorage.setItem(this.key, JSON.stringify(item));
  }

  configureActionsTypes() {
    return {
      GET: `${this.key}_GET`,
      SET: `${this.key}_SET`
    };
  }

  configureActions() {
    const _this = this;

    return {
      getItem() {
        return {
          type: _this.ActionsTypes.GET
        };
      },
      setItem(item) {
        return {
          type: _this.ActionsTypes.SET,
          payload: item
        };
      }
    };
  }

  configureReducer() {
    return (state = this._getItem(), action = {}) =
  >
    {
      switch (action.type) {
        case this.ActionsTypes.GET:
          return this._getItem();

        case  this.ActionsTypes.SET:
          this._setItem(action.payload);
          return action.payload;

        default:
          return state;
      }
    }
    ;
  }
}
