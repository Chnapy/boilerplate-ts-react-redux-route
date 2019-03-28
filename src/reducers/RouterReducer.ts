import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { MyReducer } from '../reducers/MyReducer';
import { StoreAction } from '../reducers/RootReducer';

export default class RouterReducer extends MyReducer<RouterState> {
  private readonly history: History;

  constructor(history: History) {
    super();
    this.history = history;
  }

  getInitialState(action?: StoreAction): RouterState {
    return undefined as any;
  }

  onReduce(state: RouterState | undefined, action: StoreAction): RouterState {
    return state || connectRouter(this.history)(state, action);
  }
}
