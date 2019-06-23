import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private orderId = new Subject<number>();
  currentOrderId = this.orderId.asObservable();

  private categoryId = new Subject<number>();
  currentCategoryId = this.categoryId.asObservable();

  constructor() { }

  postOrderId(Id: number) {
    this.orderId.next(Id)
  }

  postCategoryId(Id: number) {
    this.categoryId.next(Id)
  }
  
}
