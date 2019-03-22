import { RouterState } from "connected-react-router";
import { MenuProps } from "../menu/Menu";
import { PageProps } from "../page/PageProps";

export interface StoreState {

    router: RouterState;
    
    menu: MenuProps;

    page: PageProps;

}