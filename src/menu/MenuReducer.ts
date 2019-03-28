import { MyReducer } from '../reducers/MyReducer';
import { StoreAction } from '../reducers/RootReducer';
import { MenuProps } from './Menu';

export default class MenuReducer extends MyReducer<MenuProps> {
  getInitialState(action?: StoreAction): MenuProps {
    return {
      reduced: false
    };
  }

  onReduce(state: MenuProps, action: StoreAction): MenuProps {
    return state;
  }
}
