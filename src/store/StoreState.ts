import { RouterState } from 'connected-react-router';
import { IMenuProps } from '../menu/Menu';
import { PageProps } from '../page/PageTypes';
import { UserState } from '../user/UserType';

export interface IStoreState {
  router: RouterState;

  menu: IMenuProps;

  page: PageProps;

  user: UserState;
}
