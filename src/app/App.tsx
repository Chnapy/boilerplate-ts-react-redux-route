import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import React, { Component, Suspense } from 'react';
import { Provider } from 'react-redux';
import { Switch } from 'react-router-dom';
import { Store } from 'redux';
import Loading from '../loading/Loading';
import Menu from '../menu/Menu';
import PageRouting from '../page/PageRouting';
import RootPage from '../page/RootPage';
import { StoreAction } from '../reducers/RootReducer';
import { IStoreState } from '../store/StoreState';
import style from './app.module.scss';

const HomePage = React.lazy(() => import('../home/HomePage'));
const LoginPage = React.lazy(() => import('../login/LoginPage'));

export interface IAppProps {
  store: Store<IStoreState, StoreAction>;
  history: History;
  storeState: IStoreState;
}

export interface IAppState {
  storeState: IStoreState;
}

export default class App extends Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      storeState: props.storeState
    };
  }

  public render() {
    const { store, history } = this.props;
    // console.log(renderPageRoutes());
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div id={style.app}>
            <Menu />

            <RootPage>
              <Suspense fallback={<Loading />}>
                <Switch>{PageRouting.renderPageRoutes()}</Switch>
              </Suspense>
            </RootPage>
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}
