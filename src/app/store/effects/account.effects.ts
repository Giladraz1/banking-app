// account.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { AccountService } from '../../services/account.service';
import { getAccounts, getAccountsSuccess, getAccountsFailure } from '../actions/account.actions';

@Injectable()
export class AccountEffects {
  getAccounts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAccounts),
      switchMap(() =>
        this.accountService.getAccounts().pipe(
          map(accounts => getAccountsSuccess({ accounts })),
          catchError(error => of(getAccountsFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private accountService: AccountService) {}
}
