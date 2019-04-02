import {
  IHttpAction,
  IHttpRequestList,
  IHttpRequestObject,
  IHttpStaticListType
} from './Http';

export type HttpType = 'login/request' | 'sample/sample';

export interface IHttpStaticList extends IHttpStaticListType {
  'login/request': {
    request: IHttpRequestObject<'post'>;
    response: {
      token: string;
    };
  };
  'sample/sample': {
    request: IHttpRequestObject<'get'>;
    response: {
      sample: number;
    };
  };
}

export const httpRequestList: IHttpRequestList = {
  'login/request': {
    postUrl: '/login',
    method: 'post'
  },
  'sample/sample': {
    postUrl: '/sample',
    method: 'get'
  }
};

export type IHttpActionLoginRequest = IHttpAction<
  'login/request',
  {},
  {
    username: string;
    password: string;
  }
>;

export type IHttpActionSample = IHttpAction<'sample/sample'>;

export type HttpAction = IHttpActionLoginRequest | IHttpActionSample;
