import { StoreAction } from "../reducers/RootReducer";
import { MyReducer } from "../reducers/MyReducer";
import { RouterState, connectRouter } from "connected-react-router";
import { History } from "history";

export default class RouterReducer extends MyReducer<RouterState> {

    private readonly history: History;

    constructor(history: History) {
        super();
        this.history = history;
    }

    getInitialState(): RouterState {
        return undefined as any;
    }

    onReduce(state: RouterState | undefined, action: StoreAction): RouterState {

        return state || connectRouter(this.history)(state, action);
    }

}
