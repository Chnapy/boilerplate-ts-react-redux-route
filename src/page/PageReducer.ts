import { LOCATION_CHANGE } from 'connected-react-router';
import { MyReducer } from '../reducers/MyReducer';
import { StoreAction } from '../reducers/RootReducer';
import PageRouting from './PageRouting';
import { PageProps } from './PageTypes';

export default class PageReducer extends MyReducer<PageProps> {
  private reducer!: MyReducer<PageProps>;

  getInitialState(action?: StoreAction): PageProps {
    let pathname: string;
    if (action && action.type === LOCATION_CHANGE) {
      pathname = action.payload.location.pathname;
    } else {
      pathname = location.pathname;
    }

    this.reducer = PageRouting.getReducerPage(pathname, this.dispatch);

    return this.reducer.getInitialState(action);
  }

  onReduce(state: PageProps, action: StoreAction): PageProps {
    switch (action.type) {
      case LOCATION_CHANGE:
        const { pathname } = action.payload.location;

        this.reducer = PageRouting.getReducerPage(pathname, this.dispatch);

        break;
    }

    return this.reducer.reduce(state, action);
  }
}
