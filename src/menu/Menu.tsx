import React from "react";
import { connect } from "react-redux";
import { StoreState } from "../store/StoreState";
import { Dispatch } from "redux";
import style from './menu.module.scss';

export interface MenuProps {
    reduced: boolean;
}

class Menu extends React.Component<MenuProps> {

    render() {

        return (
            <div id={style.menu}>
                Menu
            </div>
        );
    }
}

const mapStateToProps = (state: StoreState): MenuProps => state.menu;

const mapDispatchToProps = (dispatch: Dispatch): {} => {
    
    return {

    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Menu);
