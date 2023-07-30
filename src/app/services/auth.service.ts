import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { environment } from '../environments/enviroments';
import { AccountService } from './account.service';
import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiBaseUrl}/authentication`;
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient, private accountService: AccountService) {
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

login(username: string, password: string): Observable<User> {
    const credentials = { username, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<User>(this.apiUrl, credentials, { headers }).pipe(
      tap((response: any) => {
        this.currentUserSubject.next(response.user); // Updated this line
        console.log("Logged user: ", response.user); // Debug the logged user
      }),
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
