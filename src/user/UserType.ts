type UserStateType = 'disconnected' | 'connected';

interface IUserStateAbstract<T extends UserStateType> {
  type: T;
}

export interface IUserStateDisconnected
  extends IUserStateAbstract<'disconnected'> {
  loading?: boolean;
}

// TODO abilities
export interface IUserStateConnected extends IUserStateAbstract<'connected'> {
  username: string;
  token: string;
}

export type UserState = IUserStateDisconnected | IUserStateConnected;
