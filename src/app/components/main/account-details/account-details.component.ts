import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Account } from '../../../models/account.model';
import { AccountService } from '../../../services/account.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnChanges {
  @Input() account: Account | null = null; // Change 'accountName' to 'account'

  constructor(private accountService: AccountService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['account'] && this.account) { // Change 'accountName' to 'account'
      this.accountService.getAccountDetails(this.account.accountName).subscribe(accountDetails => {
        this.account = accountDetails;
      });
    }
  }
}
