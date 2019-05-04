import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order } from './order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  order: Order;
  readonly rootUrl = 'http://localhost:50008/'
  constructor(
    public http: HttpClient
  ) { }

  addOrder(order: Order) {
    const body: Order = {
      CustomerId: order.CustomerId,
      AddressId: order.AddressId,
      PurchaseDate: order.PurchaseDate,
      DeliveryDate: order.DeliveryDate,
      DeliveryTime: order.DeliveryTime,
      TotalPrice: order.TotalPrice,
      PaymentMethod: order.PaymentMethod,
      OrderStatus: order.OrderStatus,
    }

    return this.http.post(this.rootUrl + 'api/Orders', body);
  }

  // getOrder(id : number) {
  //   var reqHeader = new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('userToken')});
  //   this.http.get(this.rootUrl + 'api/Orders/', {headers: reqHeader})
  // }
}
