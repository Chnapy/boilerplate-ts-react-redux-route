import React from "react";
import { PagePropsAbstract } from "../page/PageProps";
import { StoreState } from "../store/StoreState";
import { connect } from "react-redux";
import style from './loginPage.module.scss';
import { Dispatch } from "redux";


export interface LoginPageProps extends PagePropsAbstract<'login'> {

}

export interface LoginPageState {

}

export class LoginPage extends React.Component<LoginPageProps, LoginPageState> {

    render() {
        return (
            <div id={style.login_page}>
                LoginPage {JSON.stringify(this.props)}
            </div>
        );
    }
}

const mapStateToProps = (state: StoreState): LoginPageProps => {

    if(state.page.type !== 'login') {
        throw new Error();
    }

    return state.page;
};

const mapDispatchToProps = (dispatch: Dispatch): {} => {
    
    return {

    };
};

export default connect<LoginPageProps, {}, {}, StoreState>(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);
