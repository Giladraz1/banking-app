// account.actions.ts
import { createAction, props } from '@ngrx/store';
import { Account } from '../../models/account.model';

export const selectAccount = createAction(
  '[Account] Select Account',
  props<{ account: Account }>()
);

export const getAccounts = createAction('[Account] Get Accounts');

export const getAccountsSuccess = createAction(
  '[Account] Get Accounts Success',
  props<{ accounts: Account[] }>()
);

export const getAccountsFailure = createAction(
  '[Account] Get Accounts Failure',
  props<{ error: string }>()
);
