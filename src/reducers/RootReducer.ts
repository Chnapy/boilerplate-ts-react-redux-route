import { LocationChangeAction } from 'connected-react-router';
import { History } from 'history';
import { Dispatch } from 'redux';
import { UserLoginAction } from '../login/LoginPageReducer';
import MenuReducer from '../menu/MenuReducer';
import PageReducer from '../page/PageReducer';
import { IStoreState } from '../store/StoreState';
import UserReducer from '../user/UserReducer';
import { MyReducer } from './MyReducer';
import RouterReducer from './RouterReducer';

export type StoreAction = LocationChangeAction | UserLoginAction;

export default class RootReducer extends MyReducer<IStoreState> {
  private readonly routerReducer: RouterReducer;
  private readonly menuReducer: MenuReducer;
  private readonly pageReducer: PageReducer;
  private readonly userReducer: UserReducer;

  constructor(dispatch: Dispatch<StoreAction>, history: History) {
    super(dispatch);

    this.routerReducer = new RouterReducer(dispatch, history);
    this.menuReducer = new MenuReducer(dispatch);
    this.pageReducer = new PageReducer(dispatch);
    this.userReducer = new UserReducer(dispatch);
  }

  getInitialState(action?: StoreAction): IStoreState {
    return {
      router: this.routerReducer.getInitialState(action),
      menu: this.menuReducer.getInitialState(action),
      page: this.pageReducer.getInitialState(action),
      user: this.userReducer.getInitialState(action)
    };
  }

  onReduce(state: Readonly<IStoreState>, action: StoreAction): IStoreState {
    return {
      router: this.routerReducer.reduce(state.router, action),

      menu: this.menuReducer.reduce(state.menu, action),

      page: this.pageReducer.reduce(state.page, action),

      user: this.userReducer.reduce(state.user, action)
    };
  }
}
