import { LOCATION_CHANGE } from 'connected-react-router';
import PageRouting from '../page/PageRouting';
import { MyReducer } from '../reducers/MyReducer';
import { StoreAction } from '../reducers/RootReducer';
import { IMenuProps } from './Menu';

export default class MenuReducer extends MyReducer<IMenuProps> {
  getInitialState(action?: StoreAction): IMenuProps {
    const items = PageRouting.getMenuItems();
    const activeItem = undefined;

    return {
      items,
      activeItem,
      reduced: false
    };
  }

  onReduce(state: Readonly<IMenuProps>, action: StoreAction): IMenuProps {
    switch (action.type) {
      case LOCATION_CHANGE:
        const { pathname } = action.payload.location;

        const activeItem = PageRouting.getActiveMenuItem(pathname);

        return {
          ...state,
          activeItem
        };
    }

    return state;
  }
}
