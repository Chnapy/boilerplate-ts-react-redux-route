import { Dispatch } from 'redux';
import { StoreAction } from './RootReducer';

export abstract class MyReducer<S> {
  protected readonly dispatch: Dispatch<StoreAction>;

  constructor(dispatch: Dispatch<StoreAction>) {
    this.dispatch = dispatch;
  }

  abstract getInitialState(action?: StoreAction): S;

  reduce = (
    state: (S extends any ? any : Readonly<S>) | undefined,
    action: StoreAction
  ): Readonly<S> => {
    return this.onReduce(state || this.getInitialState(action), action);
  };

  protected abstract onReduce(
    state: Readonly<S>,
    action: StoreAction
  ): Readonly<S>;
}
