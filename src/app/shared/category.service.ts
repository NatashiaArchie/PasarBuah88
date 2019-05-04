import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from './category.model';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  readonly rootUrl = 'http://localhost:50008/';
  list: Category[];
  productList: Product[];
  constructor(
    private http: HttpClient,
  ) {}

  refreshList() {
    var reqHeader = new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('userToken')});
    this.http.get(this.rootUrl + 'api/Category', {headers: reqHeader})
    .toPromise().then(res => this.list = res as Category[])
  }

  productRefreshList() {
    var reqHeader = new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('userToken')});
    this.http.get(this.rootUrl + 'api/Product', {headers: reqHeader})
    .toPromise().then(res => this.productList = res as Product[])
  }
}
