import React, { RefObject } from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import StoreManager from './store/StoreManager';

export default class Controller {

    private view: RefObject<App>;

    private readonly storeManager: StoreManager;

    constructor() {
        this.view = React.createRef();
        this.storeManager = new StoreManager();
    }

    renderToDOM(): void {
        ReactDOM.render(
            this.storeManager.getRenderToDOM(this.view), 
            document.getElementById('root')
        );
    }

}