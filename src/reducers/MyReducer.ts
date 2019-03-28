import { StoreAction } from './RootReducer';

export abstract class MyReducer<S> {
  abstract getInitialState(action?: StoreAction): S;

  reduce = (state: S | undefined, action: StoreAction): S => {
    return this.onReduce(state || this.getInitialState(action), action);
  };

  protected abstract onReduce(state: S, action: StoreAction): S;
}
