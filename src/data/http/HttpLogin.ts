import {
  IHttpAction,
  IHttpObject,
  IHttpRequestProps
} from './core/HttpCoreTypes';

export type IHttpActionLoginRequest = IHttpAction<
  'login/request',
  {},
  {
    username: string;
    password: string;
  }
>;

export type IHttpLoginRequest = IHttpObject<
  IHttpActionLoginRequest,
  IHttpRequestProps<'post'>,
  {
    token: string;
  }
>;

export const loginRequestProps: IHttpLoginRequest['static']['request'] = {
  postUrl: '/login',
  method: 'post'
};
