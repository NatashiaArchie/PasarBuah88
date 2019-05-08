import { Component, OnInit } from '@angular/core';
import { OrderService } from '../shared/order.service';
import { ProductService } from '../shared/product.service';
import { DataService } from '../shared/data.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-checkout-detail',
  templateUrl: './checkout-detail.component.html',
  styleUrls: ['./checkout-detail.component.scss']
})
export class CheckoutDetailComponent implements OnInit {
  orderId: number;
  constructor(
    public orderService: OrderService,
    public productService: ProductService,
    public dataService: DataService,
    public route: ActivatedRoute,
    public router: Router,
  ) { }

  ngOnInit() {
    this.dataService.currentOrderId.subscribe(orderId => this.orderId = orderId);
    console.log(this.orderId);
    this.orderService.getOrderDetail();
    this.orderService.getOrderDetailProduct();
    this.orderService.getOrderAddress();
    this.productService.getProductList();

    this.route.paramMap
    .subscribe((param: ParamMap) => {
      let id = parseInt(param.get('id'));
      this.orderId = id;
    })
  }

  back() {
    this.router.navigate(["/orderhistory"]);
  }

}
