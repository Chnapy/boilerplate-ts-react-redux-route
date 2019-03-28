import { RouteConfig } from 'react-router-config';
import { IHomePageProps } from '../home/HomePage';
import { ILoginPageProps } from '../login/LoginPage';
import { MyReducer } from '../reducers/MyReducer';

export type PageType = 'home' | 'login';

export interface IPagePropsAbstract<T extends PageType = PageType> {
  type: T;
}

export type PageProps = IHomePageProps | ILoginPageProps;

export interface IPageInfos<
  T extends PageType,
  P extends IPagePropsAbstract<T> = IPagePropsAbstract<T>
> {
  routeConfig: RouteConfig;
  type: T;
  component: React.ComponentType<{}>;
  reducer: MyReducer<P>['constructor'];
}

export type IPageList = { [T in PageType]: IPageInfos<T> };
