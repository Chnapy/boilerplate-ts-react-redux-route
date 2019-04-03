import { Action } from 'redux';
import { MyReducer } from '../reducers/MyReducer';
import { StoreAction } from '../reducers/RootReducer';
import { ILoginPageProps } from './LoginPage';

export interface IUserLoginRequestAction extends Action<'user/login/REQUEST'> {
  type: 'user/login/REQUEST';
  form: {
    username: string;
    password: string;
  };
}

export interface IUserLoginResponseSuccessAction
  extends Action<'user/login/RESPONSE/SUCCESS'> {
  type: 'user/login/RESPONSE/SUCCESS';
  data: {
    username: string;
    token: string;
  };
}

export interface IUserLoginResponseFailureAction
  extends Action<'user/login/RESPONSE/FAILURE'> {
  type: 'user/login/RESPONSE/FAILURE';
  error: {
    code: number;
    message: string;
  };
}

export type UserLoginAction =
  | IUserLoginRequestAction
  | IUserLoginResponseSuccessAction
  | IUserLoginResponseFailureAction;

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

    switch (
      action.type
      // case 'login/REQUEST':
      //   return this.onRequest(state, action);

      // case 'login/RESPONSE':
      //   return this.onResponse(state, action);
    ) {
    }

    return {
      ...state
    };
  }

  // private onRequest(
  //   state: Readonly<ILoginPageProps>,
  //   action: ILoginRequestAction
  // ): ILoginPageProps {
  //   const { username, password } = action.form;

  //   return state;
  // }

  // private onResponse(
  //   state: Readonly<ILoginPageProps>,
  //   action: ILoginResponseAction
  // ): ILoginPageProps {
  //   const { token, username } = action.data;
  //   console.log('res', token, username);

  //   state = {
  //     ...state,
  //     userState: {
  //       type: 'connected',
  //       token,
  //       username
  //     }
  //   };

  //   return state;
  // }
}
