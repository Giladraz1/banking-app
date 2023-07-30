import { createReducer, on } from '@ngrx/store';
import {
  selectAccount,
  getAccounts,
  getAccountsSuccess,
  getAccountsFailure,
  transferMoney,
  transferMoneySuccess,
  transferMoneyFailure,
} from '../actions/account.actions';
import { Account } from '../../models/account.model';

export interface AccountState {
  selectedAccount: Account | null;
  accounts: Account[];
  error: string;
  transferSuccess: string;
}

export const initialState: AccountState = {
  selectedAccount: null,
  accounts: [],
  error: '',
  transferSuccess: '',
};

export const accountReducer = createReducer(
  initialState,
  on(selectAccount, (state, { account }) => ({ ...state, selectedAccount: account })),
  on(getAccounts, state => ({ ...state, accounts: [], error: '', transferSuccess: '' })),
  on(getAccountsSuccess, (state, { accounts }) => ({ ...state, accounts, error: '', transferSuccess: '' })),
  on(getAccountsFailure, (state, { error }) => ({ ...state, accounts: [], error, transferSuccess: '' })),
  on(transferMoney, state => ({ ...state, error: '', transferSuccess: '' })),
  on(transferMoneySuccess, state => ({ ...state, transferSuccess: 'Money transferred successfully!' })),
  on(transferMoneyFailure, (state, { error }) => ({ ...state, error, transferSuccess: '' }))
);
