import React from "react";
import style from './rootPage.module.scss';

export default class RootPage extends React.Component {

    render() {
        const { children } = this.props;

        return (
            <div id={style.rootPage}>
                {children}
            </div>
        );
    }
}
