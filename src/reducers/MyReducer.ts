import { Dispatch } from 'redux';
import { StoreAction } from './RootReducer';

// type toto<S> = constructor(dispatch: Dispatch<StoreAction>): MyReducer<S>;

// interface tata<S> {
//   constructor: Function;
// }

export abstract class MyReducer<S> {
  protected readonly dispatch: Dispatch<StoreAction>;

  constructor(dispatch: Dispatch<StoreAction>) {
    this.dispatch = dispatch;
  }

  abstract getInitialState(action?: StoreAction): S;

  reduce = (state: Readonly<S> | undefined, action: StoreAction): S => {
    return this.onReduce(state || this.getInitialState(action), action);
  };

  protected abstract onReduce(state: S, action: StoreAction): S;
}
