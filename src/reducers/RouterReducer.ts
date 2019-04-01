import {
  connectRouter,
  LocationChangeAction,
  RouterState
} from 'connected-react-router';
import { History } from 'history';
import { Dispatch } from 'redux';
import { MyReducer } from '../reducers/MyReducer';
import { StoreAction } from '../reducers/RootReducer';

export default class RouterReducer extends MyReducer<RouterState> {
  private readonly history: History;

  constructor(dispatch: Dispatch<StoreAction>, history: History) {
    super(dispatch);
    this.history = history;
  }

  getInitialState(action?: StoreAction): RouterState {
    return undefined as any;
  }

  onReduce(
    state: Readonly<RouterState>,
    action: LocationChangeAction
  ): RouterState {
    return connectRouter(this.history)(state, action);
  }
}
