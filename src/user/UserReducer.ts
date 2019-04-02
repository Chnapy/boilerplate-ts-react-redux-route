import { Action, Dispatch } from 'redux';
import Http from '../data/Http';
import {
  IUserLoginRequestAction,
  IUserLoginResponseAction
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

      case 'user/login/RESPONSE':
        return this.onResponse(state, action);
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

    // TODO
    // make auth
    // then on response:

    const http = Http.request({
      type: 'login/request',
      parameters: {},
      data: {
        username,
        password
      }
    }).then(response => {
      const { token } = response.data;

      this.dispatch<IUserLoginResponseAction>({
        type: 'user/login/RESPONSE',
        data: {
          username,
          token
        }
      });
    });

    return {
      ...state,
      type: 'disconnected',
      loading: true
    };
  }

  private onResponse(
    state: Readonly<UserState>,
    action: IUserLoginResponseAction
  ): UserState {
    const { token, username } = action.data;
    console.log('res', token, username);

    state = {
      type: 'connected',
      token,
      username
    };

    return state;
  }
}
