import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';
import { Product } from '../shared/product.model';
import { ProductService } from '../shared/product.service';
import { ToastrService } from 'ngx-toastr';
import { AnnouncementService } from '../shared/announcement.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { CartComponent } from '../cart/cart.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
category: Category[];
product: Product[];
productAddedToCart;
  imageSources = []
    
  constructor(
    public categoryService: CategoryService,
    public productService: ProductService,
    public announcementService: AnnouncementService,
    public toastr: ToastrService,
    public dialog: MatDialog,
    public router: Router
  ) { }

  ngOnInit() {
    this.categoryService.refreshList();
    this.categoryService.productRefreshList();
    this.announcementService.refreshList();

    this.announcementService.getList()
    .subscribe((data:any) => {
      console.log(data.length);
      for(var i=0; i< data.length; i++) {
        this.imageSources.push(data[i].ImageUrl)
      } 
    })
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

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "550px";
    dialogConfig.height = "550px";
    this.dialog.open(CartComponent, dialogConfig);
  }

  signout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }

  view(id) {
    this.router.navigate(['category', id]);
  }
  
}
