import { PageProps } from "./PageProps";
import { StoreAction } from "../reducers/RootReducer";
import { MyReducer } from "../reducers/MyReducer";

export default class PageReducer extends MyReducer<PageProps> {

    getInitialState(): PageProps {

        return {
            type: 'home'
        };
    }

    onReduce(state: PageProps, action: StoreAction): PageProps {

        return state;
    }

}
