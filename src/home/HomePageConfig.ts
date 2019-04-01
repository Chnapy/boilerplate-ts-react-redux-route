import React from 'react';
import { IPageInfos } from '../page/PageTypes';
import HomePageReducer from './HomePageReducer';
const HomePage = React.lazy(() => import('./HomePage'));

const HomePageConfig: IPageInfos<'home'> = {
  routeConfig: {
    path: '/',
    exact: true,
    strict: true
  },
  menuItem: { content: 'Accueil' },
  type: 'home',
  component: HomePage,
  reducer: HomePageReducer
};

export default HomePageConfig;
