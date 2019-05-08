import { Component, OnInit } from '@angular/core';
import { OrderService } from '../shared/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  customerId: string;
  constructor(
    public orderService: OrderService,
    public router: Router
  ) { }

  ngOnInit() {
    this.orderService.refreshList();
    this.customerId = JSON.parse(localStorage.getItem('userSession')).Id;
    console.log(this.customerId);
  }
  
  viewDetail(id){
    this.router.navigate(['checkoutdetail', id]);
  }  
}
