import { LocationChangeAction } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import MenuReducer from '../menu/MenuReducer';
import PageReducer from '../page/PageReducer';
import { StoreState } from '../store/StoreState';
import { MyReducer } from './MyReducer';
import RouterReducer from './RouterReducer';

export type StoreAction = LocationChangeAction;

export default class RootReducer extends MyReducer<StoreState> {
  private readonly routerReducer: RouterReducer;
  private readonly menuReducer: MenuReducer;
  private readonly pageReducer: PageReducer;

  constructor(history: History) {
    super();

    this.routerReducer = new RouterReducer(history);
    this.menuReducer = new MenuReducer();
    this.pageReducer = new PageReducer();
  }

  getInitialState(): StoreState {
    return {
      router: this.routerReducer.getInitialState(),
      menu: this.menuReducer.getInitialState(),
      page: this.pageReducer.getInitialState()
    };
  }

  onReduce(state: StoreState, action: StoreAction): StoreState {
    return combineReducers({
      router: this.routerReducer.reduce,

      menu: this.menuReducer.reduce,

      page: this.pageReducer.reduce
    })(state, action);
  }
}
