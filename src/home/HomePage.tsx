import React from "react";
import style from './homePage.module.scss';
import { connect } from "react-redux";
import { StoreState } from "../store/StoreState";
import { PagePropsAbstract } from "../page/PageProps";
import { Dispatch } from "redux";

export interface HomePageProps extends PagePropsAbstract<'home'> {

}

export interface HomePageState {

}

export class HomePage extends React.Component<HomePageProps, HomePageState> {

    render() {
        return (
            <div id={style.home_page}>
                HomePage {JSON.stringify(this.props)}
            </div>
        );
    }
}

const mapStateToProps = (state: StoreState): HomePageProps => {

    return state.page;
};

const mapDispatchToProps = (dispatch: Dispatch): {} => {
    
    return {

    };
};

export default connect<HomePageProps, {}, {}, StoreState>(
    mapStateToProps,
    mapDispatchToProps
)(HomePage);
