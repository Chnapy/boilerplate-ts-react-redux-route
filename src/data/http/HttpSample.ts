import {
  IHttpAction,
  IHttpObject,
  IHttpRequestProps
} from './core/HttpCoreTypes';

export type IHttpActionSample = IHttpAction<'sample/sample', {}, never>;

export type IHttpSample = IHttpObject<
  IHttpActionSample,
  IHttpRequestProps<'get'>,
  {
    toto: number;
  }
>;

export const sampleRequestProps: IHttpSample['static']['request'] = {
  postUrl: '/login',
  method: 'get'
};
