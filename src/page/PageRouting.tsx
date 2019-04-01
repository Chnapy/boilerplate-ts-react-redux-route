import React from 'react';
import { matchRoutes, renderRoutes, RouteConfig } from 'react-router-config';
import { Dispatch } from 'redux';
import HomePageConfig from '../home/HomePageConfig';
import LoginPageConfig from '../login/LoginPageConfig';
import { IMenuItem } from '../menu/Menu';
import { MyReducer } from '../reducers/MyReducer';
import { StoreAction } from '../reducers/RootReducer';
import { IPageConfigList, IPageInfos, PageProps, PageType } from './PageTypes';

/**
 * Gère les pages: routing, config, menu, ...
 */

/**
 * Liste des config
 */
const PageConfigList: Readonly<IPageConfigList> = {
  home: HomePageConfig,
  login: LoginPageConfig
};

/**
 * Routing des pages computed selon les configs
 */
const pageRouting: RouteConfig[] = (Object.keys(PageConfigList) as PageType[])
  .map(k => PageConfigList[k])
  .reduce((pageRouting: RouteConfig[], pageInfos: IPageInfos<any>) => {
    const { component: Component } = pageInfos;

    pageRouting.push({
      ...pageInfos.routeConfig,
      component: () => <Component />
    });

    return pageRouting;
  }, []);

/**
 * Rendu des routes des pages selon leur config
 */
function renderPageRoutes(): JSX.Element {
  return renderRoutes(pageRouting);
}

/**
 * Renvoie la config de la page active
 */
function getActivePageConfig(path: string): IPageInfos<any> | undefined {
  const branch = matchRoutes(pageRouting, path);

  const { route } = branch[0];

  const pageConfig = (Object.keys(PageConfigList) as PageType[])
    .map(k => PageConfigList[k])
    .find(p => p.routeConfig.path === route.path);

  return pageConfig;
}

/**
 * Renvoie le reducer de la page active
 */
function getReducerPage(
  path: string,
  dispatch: Dispatch<StoreAction>
): MyReducer<PageProps> {
  const pageConfig = getActivePageConfig(path);

  if (!pageConfig) {
    throw new Error();
  }

  const { reducer } = pageConfig;

  return new reducer(dispatch);
}

/**
 * Renvoie la liste des items menu
 */
function getMenuItems(): IMenuItem[] {
  return (Object.keys(PageConfigList) as PageType[])
    .map(k => PageConfigList[k])
    .filter(p => p.menuItem !== undefined)
    .map(p => ({
      type: p.type,
      ...(p.menuItem as NonNullable<IPageInfos<any>['menuItem']>),
      routeConfig: p.routeConfig
    }));
}

/**
 * Renvoie le menuItem de la page active
 */
function getActiveMenuItem(path: string): IMenuItem | undefined {
  const pageConfig = getActivePageConfig(path);

  if (!pageConfig) {
    throw new Error();
  }

  if (!pageConfig.menuItem) {
    return;
  }

  return {
    type: pageConfig.type,
    ...pageConfig.menuItem,
    routeConfig: pageConfig.routeConfig
  };
}

export default {
  PageConfigList,
  renderPageRoutes,
  getReducerPage,
  getMenuItems,
  getActiveMenuItem
};
