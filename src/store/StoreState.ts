import { RouterState } from 'connected-react-router';
import { MenuProps } from '../menu/Menu';
import { PageProps } from '../page/PageTypes';

export interface IStoreState {
  router: RouterState;

  menu: MenuProps;

  page: PageProps;
}
