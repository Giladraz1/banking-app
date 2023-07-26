// account.selectors.ts
import { createSelector } from '@ngrx/store';
import { AppState } from '../';

export const selectAccountState = (state: AppState) => state.account;

export const selectSelectedAccount = createSelector(selectAccountState, state => state.selectedAccount);
export const selectAccounts = createSelector(selectAccountState, state => state.accounts);
export const selectAccountError = createSelector(selectAccountState, state => state.error);
