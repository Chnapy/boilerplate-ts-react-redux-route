import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';
import { IPagePropsAbstract } from '../page/PageTypes';
import { IStoreState } from '../store/StoreState';
import style from './loginPage.module.scss';

export interface ILoginPageProps extends IPagePropsAbstract<'login'> {}

export interface ILoginPageState {}

export class LoginPage extends React.Component<
  ILoginPageProps,
  ILoginPageState
> {
  render() {
    return (
      <div id={style.login_page}>
        LoginPage {JSON.stringify(this.props)}
        <Link to="/">go to HOME PAGE</Link>
      </div>
    );
  }
}

const mapStateToProps = (state: IStoreState): ILoginPageProps => {
  if (state.page.type !== 'login') {
    throw new Error();
  }

  return state.page;
};

const mapDispatchToProps = (dispatch: Dispatch): {} => {
  return {};
};

export default connect<ILoginPageProps, {}, {}, IStoreState>(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
