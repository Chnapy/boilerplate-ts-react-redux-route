import axiosBuilder, { AxiosPromise, AxiosRequestConfig } from 'axios';
import { HttpAction, httpRequestList } from '../HttpDynamicTypes';
import { IHttpStaticList } from './HttpCoreTypes';

/**
 * Instance of Axios.
 */
const instance = axiosBuilder.create({
  baseURL: '/',
  timeout: 1000
});

/**
 * Launch an Axios request from the given action.
 *
 * @param action define the request that'll be launch
 * @returns an Axios promise with the data defined by the action type
 */
function request<
  A extends HttpAction,
  D extends IHttpStaticList[A['type']]['response'] = IHttpStaticList[A['type']]['response']
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
