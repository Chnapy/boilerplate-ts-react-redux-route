import { StoreAction } from "./RootReducer";


export abstract class MyReducer<S> {

    abstract getInitialState(): S;

    reduce = (state: S | undefined, action: StoreAction): S => {

        return this.onReduce(state || this.getInitialState(), action);
    };

    protected abstract onReduce(state: S, action: StoreAction): S;

}
