import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction } from './transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  readonly rootUrl = 'http://localhost:50008/'
  constructor(
    public http: HttpClient
  ) { }

  addTransaction(transaction: Transaction) {
    const body: Transaction = {
      OrderId: transaction.OrderId,
      TotalPrice: transaction.TotalPrice,
      PaymentToken: transaction.PaymentToken,
      PaymentTime: transaction.PaymentTime
    }

    return this.http.post(this.rootUrl + 'api/OnlineTransaction', body);
  }
}
