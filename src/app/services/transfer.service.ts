import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction.model';
import { environment } from '../environments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  private url = `${environment.apiBaseUrl}/transfer`;

  constructor(private http: HttpClient) { }

  transferMoney(transaction: Transaction): Observable<any> {
    return this.http.post<any>(this.url, transaction);
  }
}
