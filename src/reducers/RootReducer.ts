import { LocationChangeAction } from 'connected-react-router';
import { History } from 'history';
import { combineReducers, Dispatch } from 'redux';
import { LoginAction } from '../login/LoginPageReducer';
import MenuReducer from '../menu/MenuReducer';
import PageReducer from '../page/PageReducer';
import { IStoreState } from '../store/StoreState';
import { MyReducer } from './MyReducer';
import RouterReducer from './RouterReducer';

export type StoreAction = LocationChangeAction | LoginAction;

export default class RootReducer extends MyReducer<IStoreState> {
  private readonly routerReducer: RouterReducer;
  private readonly menuReducer: MenuReducer;
  private readonly pageReducer: PageReducer;

  constructor(dispatch: Dispatch<StoreAction>, history: History) {
    super(dispatch);

    this.routerReducer = new RouterReducer(dispatch, history);
    this.menuReducer = new MenuReducer(dispatch);
    this.pageReducer = new PageReducer(dispatch);
  }

  getInitialState(action?: StoreAction): IStoreState {
    return {
      router: this.routerReducer.getInitialState(action),
      menu: this.menuReducer.getInitialState(action),
      page: this.pageReducer.getInitialState(action)
    };
  }

  onReduce(state: Readonly<IStoreState>, action: StoreAction): IStoreState {
    return combineReducers({
      router: this.routerReducer.reduce,

      menu: this.menuReducer.reduce,

      page: this.pageReducer.reduce
    })(state, action);
  }
}
