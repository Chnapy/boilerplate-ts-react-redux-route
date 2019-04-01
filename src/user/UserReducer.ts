import { Dispatch } from 'redux';
import {
  ILoginRequestAction,
  ILoginResponseAction
} from '../login/LoginPageReducer';
import { MyReducer } from '../reducers/MyReducer';
import { StoreAction } from '../reducers/RootReducer';
import { UserState } from './UserType';

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
      case 'login/REQUEST':
        return this.onRequest(state, action);

      case 'login/RESPONSE':
        return this.onResponse(state, action);
    }

    return state;
  }

  private onRequest(
    state: Readonly<UserState>,
    action: ILoginRequestAction
  ): UserState {
    const { username, password } = action.form;

    if (state.type === 'connected') {
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
      type: 'disconnected',
      loading: true
    };
  }

  private onResponse(
    state: Readonly<UserState>,
    action: ILoginResponseAction
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
