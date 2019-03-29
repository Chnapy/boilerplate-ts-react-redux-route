import { MyReducer } from '../reducers/MyReducer';
import { StoreAction } from '../reducers/RootReducer';
import { IMenuProps } from './Menu';

export default class MenuReducer extends MyReducer<IMenuProps> {
  getInitialState(action?: StoreAction): IMenuProps {
    return {
      reduced: false
    };
  }

  onReduce(state: IMenuProps, action: StoreAction): IMenuProps {
    return state;
  }
}
