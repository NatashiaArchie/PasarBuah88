import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  cartList: Product[];
  list: Product[];
  readonly rootUrl = 'http://localhost:50008/';
  constructor(
    public http: HttpClient
  ) { }

  addProductToCart(product: any) {
    localStorage.setItem('product', JSON.stringify(product));
  }

  getProductFromCart() {
    return JSON.parse(localStorage.getItem('product'));
  }


  refreshList() {
    this.cartList = JSON.parse(localStorage.getItem('product'));
  }

  removeAllProductFromCart() {
    return localStorage.removeItem('product');
  }

  editProduct(product: Product){
    const body: Product = {
        ProductId: product.ProductId,
        ImageUrl: product.ImageUrl,
        ProductName: product.ProductName,
        RetailerPrice: product.RetailerPrice,
        SalesPrice: product.SalesPrice,
        QuantityInStock: product.QuantityInStock,
        Category: product.Category,
        ProductBrand: product.ProductBrand,
        ProductStatus: product.ProductStatus,
        ProductUnitType: product.ProductUnitType,
        ProductDescription: product.ProductDescription
      }
    return this.http.put(this.rootUrl + 'api/Product/'+product.ProductId, body)
  }

  getProductList() {
    var reqHeader = new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('userToken')});
    this.http.get(this.rootUrl + 'api/Product', {headers: reqHeader})
    .toPromise().then(res => this.list = res as Product[])
  }
}
