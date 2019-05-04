import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ProductService } from '../shared/product.service';
import { Product } from '../shared/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  product: Product[];
  productAddedToCart;
  totalPrice : number = 0;
  cart;
  constructor(
    public dialogRef : MatDialogRef<CartComponent>,
    public productService: ProductService,
    ) { }

  ngOnInit() {
    this.UpdateTotalPrice();
    this.productService.refreshList();
    console.log(this.totalPrice);
  }

  UpdateTotalPrice() {
    this.totalPrice = 0;
    this.cart = this.productService.getProductFromCart();
    for (var i=0; i< this.cart.length; i++) {
      this.totalPrice += (this.cart[i].SalesPrice * this.cart[i].CartQty);
    }
  }

  deleteFromCart(id: number) {
    this.productAddedToCart = this.productService.getProductFromCart();
    for( var i = 0; i < this.productAddedToCart.length; i++){ 
      if ( this.productAddedToCart[i].ProductId === id) {
        this.productAddedToCart.splice(i, 1); 
        this.productService.addProductToCart(this.productAddedToCart);
        this.UpdateTotalPrice();
        this.productService.refreshList();
        break;
      }
    };
    this.UpdateTotalPrice();
  }

}
