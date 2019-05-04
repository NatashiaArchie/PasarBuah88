import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Address } from './address.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  readonly rootUrl = 'http://localhost:50008/';
  list: Address[];
  constructor(
    private http: HttpClient
  ) { }

  addAddress(address: Address, Id: string) {
    const body: Address = {
      Id: Id,
      Name: address.Name,
      PhoneNumber: address.PhoneNumber,
      DeliveryAddress: address.DeliveryAddress,
      DeliveryDetail: address.DeliveryDetail
    }
    return this.http.post(this.rootUrl + 'api/Address', body);
  }

  editAddress(address: Address, Id: string) {
    const body: Address = {
      AddressId: address.AddressId,
      Id: Id,
      Name: address.Name,
      PhoneNumber: address.PhoneNumber,
      DeliveryAddress: address.DeliveryAddress,
      DeliveryDetail: address.DeliveryDetail
    }
    return this.http.put(this.rootUrl + 'api/Address/' +address.AddressId , body)
  }

  RefreshList() {
    var reqHeader = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    this.http.get(this.rootUrl + 'api/Address', {headers: reqHeader})
    .toPromise().then(res => this.list = res as Address[]);
  }
}
