import React, { Component, Suspense } from 'react';
import style from './app.module.scss';
import { StoreState } from '../store/StoreState';
import { Store } from 'redux';
import { History } from 'history';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router';
import Loading from '../loading/Loading';
import Menu from '../menu/Menu';
import RootPage from '../page/RootPage';
import { StoreAction } from '../reducers/RootReducer';

const HomePage = React.lazy(() => import('../home/HomePage'));
const LoginPage = React.lazy(() => import('../login/LoginPage'));

export interface IAppProps {
  store: Store<StoreState, StoreAction>;
  history: History;
  storeState: StoreState;
}

export interface IAppState {
  storeState: StoreState;
}

export default class App extends Component<IAppProps, IAppState> {

  constructor(props: IAppProps) {
    super(props);
    this.state = {
      storeState: props.storeState
    };
  }

  render() {
    const { store, history } = this.props;

    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>

          <div id={style.app}>

            <Menu />

            <RootPage>

              <Suspense fallback={<Loading />}>

                <Switch>

                  <Route path='/' exact>
                    <HomePage />
                  </Route>

                  <Route path='/login' exact>
                    <LoginPage />
                  </Route>

                  {/* TODO Redirect to Home OR Route to 404 ? */}
                  <Route>
                    <HomePage />
                  </Route>

                </Switch>

              </Suspense>

            </RootPage>

          </div>

        </ConnectedRouter>
      </Provider>
    );
  }
}
