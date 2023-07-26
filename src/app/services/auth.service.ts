import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user.model';
import { environment } from '../environments/enviroments';
import { AccountService } from './account.service';
import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiBaseUrl}/authentication`;

  constructor(private http: HttpClient, private accountService: AccountService) {}

  login(username: string, password: string): Observable<User> {
    const credentials = { username, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<User>(this.apiUrl, credentials, { headers }).pipe(
      catchError((error) => {
        console.error('Error occurred during login:', error);
        return throwError(error);
      })
    );
  }

  fetchAccounts(): Observable<Account[]> {
    return this.accountService.getAccounts();
  }
}
