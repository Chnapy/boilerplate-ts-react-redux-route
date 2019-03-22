import { MenuProps } from "./Menu";
import { StoreAction } from "../reducers/RootReducer";
import { MyReducer } from "../reducers/MyReducer";

export default class MenuReducer extends MyReducer<MenuProps> {

    getInitialState(): MenuProps {

        return {
            reduced: false
        };
    }

    onReduce(state: MenuProps, action: StoreAction): MenuProps {

        return state;
    }

}
