import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { selectUser } from '../../store/selectors/auth.selectors';
import { Account } from '../../models/account.model';
import { Observable } from 'rxjs';
import { AccountService } from '../../services/account.service';
import { selectAccount, transferMoneyFailure, transferMoneySuccess } from '../../store/actions/account.actions';
import { selectAccountError } from '../../store/selectors/account.selectors';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  user$: Observable<any> = this.store.select(selectUser);
  accounts$: Observable<Account[]> = this.accountService.getAccounts();
  selectedAccount: string = '';
  selectedAccountDetails: Account | null = null;
  transferSuccess: string = '';
  transferError: string = '';

  constructor(private store: Store<AppState>, private accountService: AccountService) {}

  ngOnInit(): void {
    this.user$.subscribe(user => {
      console.log('User:', user);
      if (user?.user?.accounts.length > 0) {
        this.selectedAccount = user.user.accounts[0];
        this.getAccountDetails(this.selectedAccount);
        this.store.dispatch(selectAccount({ account: { accountName: this.selectedAccount } }));
      }
    });

    this.accounts$.subscribe(accounts => {
      console.log('Accounts:', accounts);
    });

    this.store.select(transferMoneySuccess).subscribe(() => {
      if (this.selectedAccount) {
        this.getAccountDetails(this.selectedAccount);
        this.transferSuccess = 'Money transferred successfully!';
        this.transferError = '';
      }
    });

    // Use the selectAccountError selector to get the error message from the state
    this.store.select(selectAccountError).subscribe(error => {
      this.transferError = error;
      this.transferSuccess = '';
    });

    // Listen for the transferMoneyFailure action and show the error message
    this.store.select<any>(transferMoneyFailure).subscribe((action) => {
      this.transferError = action.error;
      this.transferSuccess = '';
    });
  }

  // Function to fetch account details for the selected account
  private getAccountDetails(accountName: string | null): void {
    if (accountName) {
      this.accountService.getAccountDetails(accountName).subscribe(account => {
        this.selectedAccountDetails = account;
      });
    }
  }

  // Function to be triggered when the account selection changes
  onAccountSelectChange(): void {
    if (this.selectedAccount) {
      this.getAccountDetails(this.selectedAccount);
      // Dispatch the selectAccount action with the selected account
      this.store.dispatch(selectAccount({ account: { accountName: this.selectedAccount } }));
    }
  }
}
