import React, { FormEvent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IDispatcher, IPagePropsAbstract } from '../page/PageTypes';
import { IStoreState } from '../store/StoreState';
import { UserState } from '../user/UserType';
import style from './loginPage.module.scss';
import { IUserLoginRequestAction } from './LoginPageReducer';

// props
export interface ILoginPageProps extends IPagePropsAbstract<'login'> {
  userState: UserState;
}

// dispatcher
type ILoginPageDispatcher = IDispatcher<{
  login: (username: string, password: string) => IUserLoginRequestAction;
}>;

// state
export interface ILoginPageState {}

// component
export class LoginPage extends React.Component<
  ILoginPageProps & ILoginPageDispatcher,
  ILoginPageState
> {
  render() {
    const { userState } = this.props;
    console.log('Login render', this.props);

    let subContent;
    switch (userState.type) {
      case 'disconnected':
        if (userState.loading) {
          subContent = 'Check...';
        }
        break;
      case 'connected':
        subContent = 'Checked !';
    }

    return (
      <div id={style.login_page}>
        <h1>LoginPage</h1>
        <small>{JSON.stringify(this.props)}</small>

        <div>
          <form onSubmit={this.onSubmit}>
            <label>Username</label>
            <input name="username" type="text" required={true} />
            <br />

            <label>Password</label>
            <input name="password" type="password" required={true} />
            <br />

            <input type="submit" />
            {subContent}
          </form>
        </div>
      </div>
    );
  }

  private onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData: FormData = new FormData(e.currentTarget);
    const username = formData.get('username');
    const password = formData.get('password');

    if (typeof username !== 'string' || typeof password !== 'string') {
      throw new Error();
    }

    this.props.dispatcher.login(username, password);
  };
}

const mapStateToProps = (state: IStoreState): ILoginPageProps => {
  // if (state.page.type !== 'login') {
  //   throw new Error();
  // }

  return {
    type: 'login',
    userState: state.user
  };
};

const mapDispatchToProps = (dispatch: Dispatch): ILoginPageDispatcher => {
  return {
    dispatcher: {
      login: (username: string, password: string) =>
        dispatch<IUserLoginRequestAction>({
          type: 'user/login/REQUEST',
          form: {
            username,
            password
          }
        })
    }
  };
};

export default connect<ILoginPageProps, ILoginPageDispatcher, {}, IStoreState>(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: false
  }
)(LoginPage);
