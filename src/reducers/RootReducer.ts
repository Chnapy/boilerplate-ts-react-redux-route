import { LocationChangeAction } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import MenuReducer from '../menu/MenuReducer';
import PageReducer from '../page/PageReducer';
import { IStoreState } from '../store/StoreState';
import { MyReducer } from './MyReducer';
import RouterReducer from './RouterReducer';

export type StoreAction = LocationChangeAction;

export default class RootReducer extends MyReducer<IStoreState> {
  private readonly routerReducer: RouterReducer;
  private readonly menuReducer: MenuReducer;
  private readonly pageReducer: PageReducer;

  constructor(history: History) {
    super();

    this.routerReducer = new RouterReducer(history);
    this.menuReducer = new MenuReducer();
    this.pageReducer = new PageReducer();
  }

  getInitialState(action?: StoreAction): IStoreState {
    return {
      router: this.routerReducer.getInitialState(action),
      menu: this.menuReducer.getInitialState(action),
      page: this.pageReducer.getInitialState(action)
    };
  }

  onReduce(state: IStoreState, action: StoreAction): IStoreState {
    return combineReducers({
      router: this.routerReducer.reduce,

      menu: this.menuReducer.reduce,

      page: this.pageReducer.reduce
    })(state, action);
  }
}
