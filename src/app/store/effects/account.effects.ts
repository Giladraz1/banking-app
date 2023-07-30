import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { AccountService } from '../../services/account.service';
import { TransferService } from '../../services/transfer.service';
import { getAccounts, getAccountsSuccess, transferMoney, transferMoneySuccess, transferMoneyFailure } from '../actions/account.actions';

@Injectable()
export class AccountEffects {
  constructor(
    private actions$: Actions, 
    private accountService: AccountService, 
    private transferService: TransferService
  ) {
    console.log('AccountEffects constructor called');
  }

  getAccounts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAccounts),
      switchMap(() =>
        this.accountService.getAccounts().pipe(
          map(accounts => getAccountsSuccess({ accounts })),
          catchError(error => of(transferMoneyFailure({ error })))
        )
      )
    )
  );

  transferMoney$ = createEffect(() =>
    this.actions$.pipe(
      ofType(transferMoney),
      switchMap(({ senderAccountName, receiverAccountNumber, amount, comment }) =>
        this.transferService.transferMoney({
          senderAccountName,
          receiverAccountNumber,
          amount,
          comment,
        }).pipe(
          tap(() => console.log('Transfer Money Effect Called')), // Add this line to check if the effect is called
          map(() => transferMoneySuccess()), // Corrected the transferMoneySuccess effect here
          catchError(error => of(transferMoneyFailure({ error })))
        )
      )
    )
  );
}
