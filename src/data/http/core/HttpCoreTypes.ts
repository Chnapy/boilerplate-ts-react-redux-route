import { IHttpList } from '../HttpDynamicTypes';

/**
 * Enum-like for the Http types.
 */
export type HttpType = keyof IHttpList;

export type HttpMethodType = 'get' | 'post' | 'put' | 'delete' | 'head';

/**
 * The request constants of a Http object
 */
export interface IHttpRequestProps<M extends HttpMethodType> {
  postUrl: string;
  method: M;
}

export interface IHttpStaticListType {
  [k: string]: { request: IHttpRequestProps<any>; response: any };
}

export type IHttpRequestList = Readonly<
  { [K in HttpType]: Readonly<IHttpStaticList[K]['request']> }
>;

/**
 * An util type for getting data type only if the request method is 'post' or 'put'
 */
type IHttpActionData<M> = M extends IHttpRequestProps<'post' | 'put'>
  ? { [k: string]: any }
  : never;

/**
 * An HttpAction has:
 *  - T type: string  - Like with Redux, should be unique and comprehensible.
 *  - P parameters: object {key: value} - Parameters send in the URL.
 *  - D data: object {key: value} - Data send in POST / PUT. 'data' is present ONLY if the method is 'post' or 'put'.
 */
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

export type IHttpStaticList = {
  [K in keyof IHttpList]: IHttpList[K]['static']
};

/**
 * An HttpObject must be created (extended) for each new request object.
 */
export interface IHttpObject<
  A extends IHttpAction<any>,
  RQ extends IHttpRequestProps<any>,
  RP extends {}
> {
  action: A;
  static: {
    request: RQ;
    response: RP;
  };
}
