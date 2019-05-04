import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';
import { Product } from '../shared/product.model';
import { ProductService } from '../shared/product.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
category: Category[];
product: Product[];
productAddedToCart;
  imageSources = [
    "../../assets/images/groceryimage.jpg",
    "../../assets/images/background1.jpg",
    "../../assets/images/background2.jpg",
    "../../assets/images/background3.jpg",
  ]

  
  constructor(
    public categoryService: CategoryService,
    public productService: ProductService,
    public toastr: ToastrService
  ) { }

  ngOnInit() {
    this.categoryService.refreshList();
    this.categoryService.productRefreshList();
  }

  addToCart(product: Product){
    console.log(product);
    
    this.productAddedToCart = this.productService.getProductFromCart();
    
    if(this.productAddedToCart != null) {
      let tempProduct = this.productAddedToCart.find(p=>p.ProductId == product.ProductId);
      //product is not in the cart
      if(tempProduct ==  null){
        product.CartQty = 1;
        this.productAddedToCart.push(product);
        const test = this.productService.addProductToCart(this.productAddedToCart);
        this.toastr.success("Product has been added to cart");
      }

      //the product is already in the cart
      else {
        tempProduct.CartQty++;
        
        for( var i = 0; i < this.productAddedToCart.length; i++){ 
          if ( this.productAddedToCart[i].ProductId === tempProduct.ProductId) {
            this.productAddedToCart.splice(i, 1); 
            break;
          }
        }
        this.productAddedToCart.push(tempProduct);
        this.productService.addProductToCart(this.productAddedToCart);
        this.toastr.success("Product has been added to cart");

      }
    }
    else {
      this.productAddedToCart = [];
      product.CartQty = 1;
      this.productAddedToCart.push(product);
      const test = this.productService.addProductToCart(this.productAddedToCart);
      this.toastr.success("Product has been added to cart");
    }
  }

  signout() {
    
  }
  
}
