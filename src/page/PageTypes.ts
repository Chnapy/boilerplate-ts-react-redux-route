import { RouteConfig } from 'react-router-config';
import { Dispatch } from 'redux';
import { IHomePageProps } from '../home/HomePage';
import { ILoginPageProps } from '../login/LoginPage';
import { MyReducer } from '../reducers/MyReducer';
import { StoreAction } from '../reducers/RootReducer';

export type PageType = 'home' | 'login';

export interface IDispatcher<
  D extends {
    [k: string]: (...args: any[]) => StoreAction;
  } = any
> {
  dispatcher: D;
}

export interface IPagePropsAbstract<T extends PageType = PageType> {
  type: T;
}

export type PageProps = IHomePageProps | ILoginPageProps;

export interface IPageInfos<
  T extends PageType,
  P extends IPagePropsAbstract<T> = IPagePropsAbstract<T>
> {
  type: T;
  routeConfig: RouteConfig;
  menuItem?: {
    content: string;
  };
  component: React.ComponentType<{}>;
  reducer: new (dispatch: Dispatch<StoreAction>) => MyReducer<any>;
}

export type IPageConfigList = { [T in PageType]: IPageInfos<T> };
