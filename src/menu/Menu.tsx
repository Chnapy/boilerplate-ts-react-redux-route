import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IStoreState } from '../store/StoreState';
import style from './menu.module.scss';

export interface MenuProps {
  reduced: boolean;
}

class Menu extends React.Component<MenuProps> {
  render() {
    return <div id={style.menu}>Menu</div>;
  }
}

const mapStateToProps = (state: IStoreState): MenuProps => state.menu;

const mapDispatchToProps = (dispatch: Dispatch): {} => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
