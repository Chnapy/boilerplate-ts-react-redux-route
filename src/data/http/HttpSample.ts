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
