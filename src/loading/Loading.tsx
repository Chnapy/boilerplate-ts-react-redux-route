import React from "react";
import style from './loading.module.scss';

export default class Loading extends React.Component {
    
    render() {
        return (
            <div className={style.loading}>
                Loading...
            </div>
        );
    }
}
