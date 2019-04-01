import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IPagePropsAbstract } from '../page/PageTypes';
import { IStoreState } from '../store/StoreState';
import style from './homePage.module.scss';

export interface IHomePageProps extends IPagePropsAbstract<'home'> {}

export interface IHomePageState {}

export class HomePage extends React.Component<IHomePageProps, IHomePageState> {
  render() {
    console.log('Home render');
    return (
      <div id={style.home_page}>
        <h1>HomePage</h1>
        <small>{JSON.stringify(this.props)}</small>
      </div>
    );
  }
}

const mapStateToProps = (state: IStoreState): IHomePageProps => {
  // if (state.page.type !== 'home') {
  //   throw new Error();
  // }

  return {
    type: 'home'
  };
};

const mapDispatchToProps = (dispatch: Dispatch): {} => {
  return {};
};

export default connect<IHomePageProps, {}, {}, IStoreState>(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: false
  }
)(HomePage);
