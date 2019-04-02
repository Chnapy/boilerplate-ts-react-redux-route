import axiosBuilder, { AxiosPromise, AxiosRequestConfig } from 'axios';
import {
  HttpAction,
  httpRequestList,
  HttpType,
  IHttpStaticList
} from './HttpTypes';

export type HttpMethodType = 'get' | 'post' | 'put' | 'delete' | 'head';

export interface IHttpRequestObject<M extends HttpMethodType> {
  postUrl: string;
  method: M;
}

export interface IHttpStaticListType {
  [k: string]: { request: IHttpRequestObject<any>; response: any };
}

export type IHttpRequestList = {
  [K in HttpType]: IHttpStaticList[K]['request']
};

type IHttpActionData<M> = M extends IHttpRequestObject<'post'>
  ? { [k: string]: any }
  : never;

export interface IHttpAction<
  T extends HttpType,
  P extends { [k: string]: any } = {},
  D extends IHttpActionData<IHttpRequestList[T]> = IHttpActionData<
    IHttpRequestList[T]
  >
> {
  type: T;
  parameters: P;
  data: D;
}

const instance = axiosBuilder.create({
  baseURL: '/',
  timeout: 1000
});

function request<
  A extends HttpAction,
  D extends IHttpStaticList[A['type']]['response']
>(action: A): AxiosPromise<D> {
  const { type, parameters } = action;
  const methodObject = httpRequestList[type];
  const { postUrl, method } = methodObject;

  let config: AxiosRequestConfig = {
    url: postUrl,
    method,
    params: parameters
  };

  switch (method) {
    case 'get':
      config = {
        ...config
      };
      break;
    case 'post':
      config = {
        ...config,
        data: action.data
      };
      break;
  }

  return instance(config);
}

const Http = {
  request
};

export default Http;
