import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { selectUser } from '../../store/selectors/auth.selectors';
import { Account } from '../../models/account.model';
import { Observable } from 'rxjs';
import { AccountService } from '../../services/account.service';
import { selectAccount } from '../../store/actions/account.actions';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  user$: Observable<any> = this.store.select(selectUser);
  accounts$: Observable<Account[]> = this.accountService.getAccounts();
  selectedAccount: string | null = null;
  selectedAccountDetails: Account | null = null;

  constructor(private store: Store<AppState>, private accountService: AccountService) {} // Inject AccountService

  ngOnInit(): void {
    this.user$.subscribe(user => {
      console.log('User:', user);
      if (user?.user?.accounts.length > 0) {
        this.selectedAccount = user.user.accounts[0];
        // Fetch the default account details using AccountService based on the first account in the user's list
        this.getAccountDetails(this.selectedAccount);
      }
    });

    // Fetch accounts data from the backend using AccountService
    this.accounts$.subscribe(accounts => {
      console.log('Accounts:', accounts);
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
