import { LOCATION_CHANGE } from 'connected-react-router';
import { MyReducer } from '../reducers/MyReducer';
import { StoreAction } from '../reducers/RootReducer';
import PageRouting from './PageRouting';
import { PageProps } from './PageTypes';

export default class PageReducer extends MyReducer<PageProps> {
  getInitialState(action?: StoreAction): PageProps {
    let pathname: string;
    if (action && action.type === LOCATION_CHANGE) {
      pathname = action.payload.location.pathname;
    } else {
      pathname = location.pathname;
    }

    const reducer = PageRouting.getReducerPage(pathname);

    return reducer.getInitialState(action);
  }

  onReduce(state: PageProps, action: StoreAction): PageProps {
    console.log('action', action);
    switch (action.type) {
      case LOCATION_CHANGE:
        const { pathname } = action.payload.location;

        const reducer = PageRouting.getReducerPage(pathname);

        // console.log('state', reducer.reduce(state, action));

        return reducer.reduce(state, action);
    }

    return state;
  }
}
