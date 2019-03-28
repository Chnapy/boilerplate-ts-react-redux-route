import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory, History } from 'history';
import React, { RefObject } from 'react';
import {
  applyMiddleware,
  compose,
  createStore,
  Middleware,
  Store
} from 'redux';
import App from '../app/App';
import RootReducer, { StoreAction } from '../reducers/RootReducer';
import { IStoreState } from './StoreState';

export default class StoreManager {
  private static getMiddlewares(history: History): Middleware[] {
    return [
      routerMiddleware(history) // for dispatching history actions
    ];
  }

  private readonly history: History;
  private readonly store: Store<IStoreState, StoreAction>;
  private readonly rootReducer: RootReducer;

  constructor() {
    this.history = createBrowserHistory();

    this.rootReducer = new RootReducer(this.history);

    const initialState = this.getInitialState();

    this.store = createStore(
      this.rootReducer.reduce,
      initialState,
      compose(applyMiddleware(...StoreManager.getMiddlewares(this.history)))
    );
  }

  private getInitialState(): IStoreState {
    return this.rootReducer.getInitialState();
  }

  getRenderToDOM(ref: RefObject<App>): JSX.Element {
    const storeState = this.store.getState();

    return (
      <App
        ref={ref}
        store={this.store}
        history={this.history}
        storeState={storeState}
      />
    );
  }
}