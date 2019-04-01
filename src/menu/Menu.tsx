import React from 'react';
import { connect } from 'react-redux';
import { RouteConfig } from 'react-router-config';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { Dispatch } from 'redux';
import { PageType } from '../page/PageTypes';
import { IStoreState } from '../store/StoreState';
import style from './menu.module.scss';

export interface IMenuItem<T extends PageType = PageType> {
  type: T;
  content: string;
  routeConfig: RouteConfig;
}

export interface IMenuProps {
  items: IMenuItem[];
  activeItem?: IMenuItem;
  reduced: boolean;
}

class Menu extends React.Component<IMenuProps> {
  render() {
    const { items, activeItem } = this.props;

    return (
      <div id={style.menu}>
        <h2>Menu</h2>

        <nav>
          <ul>
            {items.map(item => (
              <li key={item.content}>
                <NavLink {...this.menuItemToNavProps(item)}>
                  {item.content}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    );
  }

  private menuItemToNavProps(
    menuItem: IMenuItem
  ): NavLinkProps & React.Attributes {
    const { routeConfig } = menuItem;
    const { path, exact, strict } = routeConfig;

    return {
      to: path || '',
      exact,
      strict,
      activeClassName: style.active
    };
  }
}

const mapStateToProps = (state: IStoreState): IMenuProps => state.menu;

const mapDispatchToProps = (dispatch: Dispatch): {} => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: false
  }
)(Menu);
