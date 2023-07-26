// auth.selectors.ts
import { createSelector } from '@ngrx/store';
import { AppState } from '../../store';

export const selectAuthState = (state: AppState) => state.auth;

export const selectUser = createSelector(selectAuthState, state => state.user);
export const selectError = createSelector(selectAuthState, state => state.error);
