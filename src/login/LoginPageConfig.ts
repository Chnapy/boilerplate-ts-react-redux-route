import React from 'react';
import { IPageInfos } from '../page/PageTypes';
import LoginPageReducer from './LoginPageReducer';

const LoginPage = React.lazy(() => import('./LoginPage'));

const LoginPageConfig: IPageInfos<'login'> = {
  routeConfig: {
    path: '/login'
  },
  type: 'login',
  component: LoginPage,
  reducer: LoginPageReducer
};

export default LoginPageConfig;
