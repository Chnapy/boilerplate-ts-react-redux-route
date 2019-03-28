import { MyReducer } from '../reducers/MyReducer';
import { StoreAction } from '../reducers/RootReducer';
import { ILoginPageProps } from './LoginPage';

export default class LoginPageReducer extends MyReducer<ILoginPageProps> {
  getInitialState(): ILoginPageProps {
    return {
      type: 'login'
    };
  }

  onReduce(state: ILoginPageProps, action: StoreAction): ILoginPageProps {
    if (state.type !== 'login') {
      state = this.getInitialState();
    }

    return state;
  }
}
