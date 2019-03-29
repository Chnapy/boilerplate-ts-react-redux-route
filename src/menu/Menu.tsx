import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IStoreState } from '../store/StoreState';
import style from './menu.module.scss';

export interface IMenuProps {
  reduced: boolean;
}

class Menu extends React.Component<IMenuProps> {
  render() {
    return <div id={style.menu}>Menu</div>;
  }
}

const mapStateToProps = (state: IStoreState): IMenuProps => state.menu;

const mapDispatchToProps = (dispatch: Dispatch): {} => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
