// account.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { selectAccount, getAccounts, getAccountsSuccess, getAccountsFailure } from '../actions/account.actions';
import { Account } from '../../models/account.model';

export interface AccountState {
  selectedAccount: Account | null;
  accounts: Account[];
  error: string;
}

export const initialState: AccountState = {
  selectedAccount: null,
  accounts: [],
  error: '',
};

export const accountReducer = createReducer(
  initialState,
  on(selectAccount, (state, { account }) => ({ ...state, selectedAccount: account })),
  on(getAccounts, state => ({ ...state, accounts: [], error: '' })),
  on(getAccountsSuccess, (state, { accounts }) => ({ ...state, accounts, error: '' })),
  on(getAccountsFailure, (state, { error }) => ({ ...state, accounts: [], error }))
);
