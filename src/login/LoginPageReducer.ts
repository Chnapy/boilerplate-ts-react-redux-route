import { Action } from 'redux';
import { MyReducer } from '../reducers/MyReducer';
import { StoreAction } from '../reducers/RootReducer';
import { ILoginPageProps } from './LoginPage';

export interface ILoginRequestAction extends Action<'login/REQUEST'> {
  type: 'login/REQUEST';
  form: {
    username: string;
    password: string;
  };
}

export interface ILoginResponseAction extends Action<'login/RESPONSE'> {
  type: 'login/RESPONSE';
  data: {
    username: string;
    token: string;
  };
}

export type LoginAction = ILoginRequestAction | ILoginResponseAction;

export default class LoginPageReducer extends MyReducer<ILoginPageProps> {
  getInitialState(): ILoginPageProps {
    return {
      type: 'login',
      userState: {
        type: 'disconnected'
      }
    };
  }

  onReduce(
    state: Readonly<ILoginPageProps>,
    action: StoreAction
  ): ILoginPageProps {
    if (state.type !== 'login') {
      state = this.getInitialState();
    }

    switch (action.type) {
      case 'login/REQUEST':
        return this.onRequest(state, action);

      case 'login/RESPONSE':
        return this.onResponse(state, action);
    }

    return state;
  }

  private onRequest(
    state: Readonly<ILoginPageProps>,
    action: ILoginRequestAction
  ): ILoginPageProps {
    const { username, password } = action.form;

    const { userState } = state;
    if (userState.type === 'connected') {
      throw new Error();
    }

    // TODO
    // make auth
    // then on response:

    const token = '...token...'; // mock

    setTimeout(() => {
      this.dispatch<ILoginResponseAction>({
        type: 'login/RESPONSE',
        data: {
          username,
          token
        }
      });
    }, 1000);

    return {
      ...state,
      userState: {
        ...state.userState,
        type: 'disconnected',
        loading: true
      }
    };
  }

  private onResponse(
    state: Readonly<ILoginPageProps>,
    action: ILoginResponseAction
  ): ILoginPageProps {
    const { token, username } = action.data;
    console.log('res', token, username);

    state = {
      ...state,
      userState: {
        type: 'connected',
        token,
        username
      }
    };

    return state;
  }
}
