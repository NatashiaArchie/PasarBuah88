import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderDetail } from './order-detail.model';
import { Order } from './order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {
  orderDetail: OrderDetail;
  readonly rootUrl = 'http://localhost:50008/';
  constructor(
    public http: HttpClient
  ) { }

  AddOrderDetail(od : OrderDetail) {
    const body: OrderDetail = {
      OrderId: od.OrderId,
      ProductId: od.ProductId,
      Quantity: od.Quantity,
      UnitPrice: od.UnitPrice,
      TotalPrice: od.TotalPrice,
      Revenue: od.Revenue
    }
    return this.http.post(this.rootUrl + 'api/OrderDetails', body);
  }
}
