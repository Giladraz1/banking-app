import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { selectSelectedAccount } from '../../store/selectors/account.selectors';
import { Account } from '../../models/account.model';
import { Observable, Subscription } from 'rxjs';
import { transferMoney } from '../../store/actions/account.actions';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-transfer-money',
  templateUrl: './transfer-money.component.html',
  styleUrls: ['./transfer-money.component.css']
})
export class TransferMoneyComponent implements OnInit {
  transferForm: FormGroup;
  selectedAccount$: Observable<Account | null> = this.store.select(selectSelectedAccount);
  selectedAccountName: string | null = null;
  private subscription: Subscription | undefined;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) {
    this.transferForm = this.formBuilder.group({
      amount: [0, [Validators.required, Validators.min(1)]],
      receiverAccountNumber: ['', Validators.required],
      comment: ['']
    });
  }

  ngOnInit(): void {
    this.subscription = this.selectedAccount$.subscribe(account => {
      if (account) {
        this.selectedAccountName = account.accountName;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

onTransferMoney(): void {
  console.log('onTransferMoney() called');
  if (this.transferForm.valid && this.selectedAccountName) {
    const transfer: Transaction = {
      senderAccountName: this.selectedAccountName,
      receiverAccountNumber: this.transferForm.value.receiverAccountNumber,
      amount: this.transferForm.value.amount,
      comment: this.transferForm.value.comment || ''
    };

    if (transfer.senderAccountName) {
      this.store.dispatch(transferMoney({
        senderAccountName: transfer.senderAccountName,
        receiverAccountNumber: transfer.receiverAccountNumber,
        amount: transfer.amount,
        comment: transfer.comment
      }));
    }
  }
}


}
