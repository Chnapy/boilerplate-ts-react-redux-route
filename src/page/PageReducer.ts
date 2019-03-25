import { PageProps } from "./PageProps";
import { StoreAction } from "../reducers/RootReducer";
import { MyReducer } from "../reducers/MyReducer";
import { LOCATION_CHANGE } from "connected-react-router";

export default class PageReducer extends MyReducer<PageProps> {

    getInitialState(): PageProps {

        return {
            type: 'home'
        };
    }

    onReduce(state: PageProps, action: StoreAction): PageProps {

        /**
         * TODO path parsing beurk beurk
         */
        switch (action.type) {
            case LOCATION_CHANGE:

                const { pathname } = action.payload.location;

                const split = pathname.split('/');

                switch (split[1]) {
                    case '':
                        return this.getInitialState();
                    case 'home':
                        return {
                            type: 'home'
                        };
                    case 'login':
                        return {
                            type: 'login'
                        };
                }

                break;
        }

        return state;
    }

}
