import { IHttpRequestList } from './core/HttpCoreTypes';
import { IHttpActionLoginRequest, IHttpLoginRequest } from './HttpLogin';
import { IHttpActionSample, IHttpSample } from './HttpSample';

/**
 * This file has to be aggregated with all new HttpAction
 */

/**
 * Specify the const attributes of a request (url, method, ...).
 *
 *  'action/type': {
 *    postUrl: '/myaction',
 *    method: 'get'
 *  }
 */
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

/**
 * List all Http actions.
 *
 *  ... | MyAction;
 */
export type HttpAction = IHttpActionLoginRequest | IHttpActionSample;

/**
 * Bind action type with his action.
 * This may seem redondant, this is a typing requirement.
 *
 *  'action/type': MyAction;
 */
export interface IHttpList {
  'login/request': IHttpLoginRequest;
  'sample/sample': IHttpSample;
}
