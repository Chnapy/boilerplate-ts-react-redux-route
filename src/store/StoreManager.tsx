import React, { RefObject } from 'react';
import { Store, createStore, compose, applyMiddleware, Middleware } from 'redux';
import { History, createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import RootReducer from '../reducers/RootReducer';
import { StoreState } from './StoreState';
import App from '../app/App';

export default class StoreManager {

    private static getMiddlewares(history: History): Middleware[] {
        return [
            routerMiddleware(history), // for dispatching history actions
        ];
    }

    private readonly history: History;
    private readonly store: Store<StoreState>;
    private readonly rootReducer: RootReducer;

    constructor() {

        this.history = createBrowserHistory();

        this.rootReducer = new RootReducer(this.history);

        const initialState = this.getInitialState();

        this.store = createStore(
            this.rootReducer.reduce,
            initialState,
            compose(
                applyMiddleware(
                    ...StoreManager.getMiddlewares(this.history)
                ),
            )
        );
    }

    private getInitialState(): StoreState {
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
