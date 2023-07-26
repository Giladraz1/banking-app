// index.ts
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../environments/enviroments';
import { AuthState, authReducer } from './reducers/auth.reducer';
import { AccountState, accountReducer } from './reducers/account.reducer';

export interface AppState {
  auth: AuthState;
  account: AccountState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  account: accountReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
