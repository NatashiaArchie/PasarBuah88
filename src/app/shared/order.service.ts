import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order } from './order.model';
import { OrderDetail } from './order-detail.model';
import { OrderDetailProduct } from './order-detail-product.model';
import { OrderAddress } from './order-address.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  order: Order;
  orderList: Order[];
  orderDetailList: OrderDetail[];
  orderDetailProductList: OrderDetailProduct[];
  orderAddressList: OrderAddress[];
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

  refreshList(){
    var reqHeader = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    this.http.get(this.rootUrl + 'api/Orders', {headers: reqHeader})
    .toPromise().then(res => this.orderList = res as Order[]);
  }

  getOrderDetail() {
    var reqHeader = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    this.http.get(this.rootUrl + 'api/OrderDetails', {headers: reqHeader})
    .toPromise().then(res => this.orderDetailList = res as OrderDetail[]);
  }

  getOrderDetailProduct() {
    var reqHeader = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    this.http.get(this.rootUrl + 'api/OrderDetailsProduct', {headers: reqHeader})
    .toPromise().then(res => this.orderDetailProductList = res as OrderDetailProduct[])
  }

  getOrderAddress() {
    var reqHeader = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    this.http.get(this.rootUrl + 'api/OrderAddress', {headers: reqHeader} )
    .toPromise().then(res => this.orderAddressList = res as OrderAddress[])
  }
}
