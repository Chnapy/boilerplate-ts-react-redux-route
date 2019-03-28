import React from 'react';
import { matchRoutes, renderRoutes, RouteConfig } from 'react-router-config';
import HomePageConfig from '../home/HomePageConfig';
import LoginPageConfig from '../login/LoginPageConfig';
import { MyReducer } from '../reducers/MyReducer';
import { IPageInfos, IPageList, PageProps, PageType } from './PageTypes';

const PageList: Readonly<IPageList> = {
  home: HomePageConfig,
  login: LoginPageConfig
};

const pageRouting: RouteConfig[] = (Object.keys(PageList) as PageType[])
  .map(k => PageList[k])
  .reduce((pageRouting: RouteConfig[], pageInfos: IPageInfos<any>) => {
    const { component: Component } = pageInfos;

    pageRouting.push({
      ...pageInfos.routeConfig,
      component: () => <Component />
    });

    return pageRouting;
  }, []);

function renderPageRoutes(): JSX.Element {
  return renderRoutes(pageRouting);
}

function getReducerPage(path: string): MyReducer<PageProps> {
  const branch = matchRoutes(pageRouting, path);

  // console.log('branch', path, branch);

  const { route } = branch[0];

  const pageConfig = (Object.keys(PageList) as PageType[])
    .map(k => PageList[k])
    .find(p => p.routeConfig.path === route.path);

  if (!pageConfig) {
    throw new Error();
  }

  const { reducer } = pageConfig;

  // console.log('reducer', pageConfig);

  return new (reducer as any)();
}

export default {
  PageList,
  renderPageRoutes,
  getReducerPage
};
