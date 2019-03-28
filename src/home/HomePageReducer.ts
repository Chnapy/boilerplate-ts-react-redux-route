import { MyReducer } from '../reducers/MyReducer';
import { StoreAction } from '../reducers/RootReducer';
import { IHomePageProps } from './HomePage';

export default class HomePageReducer extends MyReducer<IHomePageProps> {
  getInitialState(): IHomePageProps {
    return {
      type: 'home'
    };
  }

  onReduce(state: IHomePageProps, action: StoreAction): IHomePageProps {
    if (state.type !== 'home') {
      state = this.getInitialState();
    }

    return state;
  }
}
