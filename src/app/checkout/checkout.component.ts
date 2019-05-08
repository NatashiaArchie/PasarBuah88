import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material';
import { AddAddressComponent } from '../add-address/add-address.component';
import { AddressService } from '../shared/address.service';
import { Address } from '../shared/address.model';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { ProductService } from '../shared/product.service';
import { Order } from '../shared/order.model';
import { NgForm } from '@angular/forms';
import { OrderService } from '../shared/order.service';
import { ToastrService } from 'ngx-toastr';
import { OrderDetailService } from '../shared/order-detail.service';
import { OrderDetail } from '../shared/order-detail.model';
import { Product } from '../shared/product.model';
import { Router } from '@angular/router';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  MinDate = moment().toDate();
  MaxDate = moment().add(7,'d').toDate();
  purchaseDate= moment().format('LLLL');
  UserId: string;
  totalPrice: number;
  TotalAmount: number;
  cart;
  order: Order;
  orderDetail: OrderDetail;
  method: string;
  orderStatus: string;
  paymentMethod: string;
  productAddedToCart;
  currentOrderId: number;
  product: Product;

   TimeList = [
    {value: "11AM - 12PM"},
    {value: "12PM - 01PM"},
    {value: "01PM - 02PM"},
    {value: "02PM - 03PM"},
    {value: "03PM - 04PM"},
    {value: "04PM - 05PM"},
    {value: "05PM - 06PM"},
    {value: "06PM - 07PM"},
    {value: "07PM - 08PM"},
  ]

  constructor(
    public dialog: MatDialog,
    public addressService: AddressService,
    public productService: ProductService,
    public orderService: OrderService,
    public toastr: ToastrService,
    public orderDetailService: OrderDetailService,
    public router: Router,
    public dataService: DataService
  ) { }

  ngOnInit() {
    this.addressService.RefreshList();
    this.UserId = JSON.parse(localStorage.getItem('userSession')).Id;
    this.UpdateTotalPrice();
    this.TotalAmount = parseFloat(this.totalPrice.toFixed(2));
    console.log(this.TotalAmount);
    this.order = {
      OrderId: null,
      CustomerId: null,
      AddressId: null,
      PurchaseDate: '',
      DeliveryDate: '',
      DeliveryTime: '',
      TotalPrice: null,
      PaymentMethod: '',
      OrderStatus: ''
    }
    this.orderDetail = {
      OrderId: null,
      ProductId: null,
      Quantity: null,
      UnitPrice: null,
      TotalPrice: null
    }
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width= '500px';
    dialogConfig.height= '470px';
    this.dialog.open(AddAddressComponent,dialogConfig);
  }

  editDialog(address: Address) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width= '500px';
    dialogConfig.height= '470px';
    dialogConfig.data = address;
    this.dialog.open(AddAddressComponent,dialogConfig);
  }

  UpdateTotalPrice() {
    this.totalPrice = 0;
    this.cart = this.productService.getProductFromCart();
    for (var i=0; i< this.cart.length; i++) {
      this.totalPrice += (this.cart[i].SalesPrice * this.cart[i].CartQty);
    }
  }

  onSubmit(form: NgForm) {
    if (this.method == "1") {
      form.value.OrderStatus = "Pending";
      form.value.PaymentMethod = "Cash on Delivery";
    } else {
      form.value.OrderStatus = "Paid";
      form.value.PaymentMethod = "Online Transaction";
    }
    console.log(form.value);

    this.orderService.addOrder(form.value)
    .subscribe((data: any) => {
      debugger;
      this.toastr.success("Successful Checkout");
      this.currentOrderId = data.OrderId;
      this.UploadOrderDetail();
    });
  }

  UploadOrderDetail() {
    
    this.productAddedToCart = this.productService.getProductFromCart();
    for( var i = 0; i < this.productAddedToCart.length; i++){ 
      this.orderDetail.OrderId = this.currentOrderId;
      this.orderDetail.ProductId = this.productAddedToCart[i].ProductId;
      this.orderDetail.Quantity = this.productAddedToCart[i].CartQty;
      this.orderDetail.UnitPrice = this.productAddedToCart[i].SalesPrice;
      this.orderDetail.TotalPrice = this.productAddedToCart[i].SalesPrice * this.productAddedToCart[i].CartQty;
      console.log(this.productAddedToCart[i]);
      this.updateProductQuantity(this.productAddedToCart[i], this.productAddedToCart[i].CartQty);
      this.orderDetailService.AddOrderDetail(this.orderDetail)
      .subscribe((detail) => {
        console.log(detail);
        this.productService.removeAllProductFromCart();
        debugger;
        this.getCheckoutDetail(this.currentOrderId);
      })
    }
    
  }

  getCheckoutDetail(id: number) {
    // debugger;
    // this.router.navigate(["/checkoutdetail"]);
    // this.dataService.postOrderId(this.currentOrderId);
      this.router.navigate(['checkoutdetail', id]);
    
  }

  updateProductQuantity(product: Product, qty: number) {
    product.QuantityInStock = product.QuantityInStock - qty;
    this.productService.editProduct(product)
    .subscribe((product: any) => {
      console.log(product);
    })
  }
}
