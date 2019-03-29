import { Middleware } from 'redux';
import { StoreAction } from '../../reducers/RootReducer';

const style = {
  index: 'color: #888;',
  actionType: 'color: #4466AA;',
  state: 'color: #DD6644; font-weight: bold;'
};

let index: number = 0;

const loggerMiddleware: Middleware = store => next => (action: StoreAction) => {
  // tslint:disable-next-line: no-console
  console.groupCollapsed(
    '%c' + ++index + ' %c' + action.type,
    style.index,
    style.actionType,
    action
  );
  const result = next(action);
  // tslint:disable-next-line: no-console
  console.log('%c new state', style.state, store.getState());
  // tslint:disable-next-line: no-console
  console.groupEnd();
  return result;
};

export default loggerMiddleware;
