import { Action, Dispatch } from 'redux';
import Http from '../data/http/core/Http';
import {} from '../data/http/HttpDynamicTypes';
import {
  IUserLoginRequestAction,
  IUserLoginResponseFailureAction,
  IUserLoginResponseSuccessAction
} from '../login/LoginPageReducer';
import { MyReducer } from '../reducers/MyReducer';
import { StoreAction } from '../reducers/RootReducer';
import { UserState } from './UserType';

export interface IUserLoginRequestAction extends Action<'user/login/REQUEST'> {
  type: 'user/login/REQUEST';
  form: {
    username: string;
    password: string;
  };
}

export interface IUserLoginResponseAction
  extends Action<'user/login/RESPONSE'> {
  type: 'user/login/RESPONSE';
  data: {
    username: string;
    token: string;
  };
}

export default class UserReducer extends MyReducer<UserState> {
  constructor(dispatch: Dispatch<StoreAction>) {
    super(dispatch);
  }

  getInitialState(action?: StoreAction): UserState {
    return {
      type: 'disconnected'
    };
  }

  onReduce(state: Readonly<UserState>, action: StoreAction): UserState {
    switch (action.type) {
      case 'user/login/REQUEST':
        return this.onRequest(state, action);

      case 'user/login/RESPONSE/SUCCESS':
        return this.onResponseSuccess(state, action);

      case 'user/login/RESPONSE/FAILURE':
        return this.onResponseFailure(state, action);
    }

    return state;
  }

  private onRequest(
    state: Readonly<UserState>,
    action: IUserLoginRequestAction
  ): UserState {
    const { username, password } = action.form;

    if (state.type === 'connected') {
      throw new Error();
    }

    const httpRequest = Http.request({
      type: 'login/request',
      parameters: {},
      data: {
        username,
        password
      }
    })
      .then(response => {
        const { token } = response.data;

        this.dispatch({
          type: 'user/login/RESPONSE/SUCCESS',
          data: {
            username,
            token
          }
        });
      })
      .catch((err: Error) => {
        this.dispatch({
          type: 'user/login/RESPONSE/FAILURE',
          error: {
            code: -1,
            message: err.message
          }
        });
      });

    return {
      ...state,
      type: 'disconnected',
      loading: true
    };
  }

  private onResponseSuccess(
    state: Readonly<UserState>,
    action: IUserLoginResponseSuccessAction
  ): UserState {
    const { token, username } = action.data;
    console.log('response success', token, username);

    state = {
      type: 'connected',
      token,
      username
    };

    return state;
  }

  private onResponseFailure(
    state: Readonly<UserState>,
    action: IUserLoginResponseFailureAction
  ): UserState {
    const { code, message } = action.error;
    console.log('response failure', code, message);

    state = {
      type: 'disconnected',
      error: message
    };

    return state;
  }
}
