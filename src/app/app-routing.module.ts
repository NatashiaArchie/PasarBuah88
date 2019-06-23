import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { LoginLayoutComponent } from './layout/login-layout/login-layout.component';
import { CheckoutDetailComponent } from './checkout-detail/checkout-detail.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { PaymentComponent } from './payment/payment.component';
import { CategoryProductComponent } from './category-product/category-product.component';

const routes: Routes = [
  
  { path: '', component: LoginLayoutComponent, 
  children: [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent},
  ]},
  { path: '', component: HomeLayoutComponent, 
  children: [
    { path: '', component: HomepageComponent},
    { path: 'home', component: HomepageComponent},
    { path: 'cart', component: CartComponent },
    { path: 'checkout', component: CheckoutComponent },
    { path: 'checkoutdetail', component: CheckoutDetailComponent },
    { path: 'checkoutdetail/:id', component: CheckoutDetailComponent },
    { path: 'orderhistory', component: OrderHistoryComponent },
    { path: 'payment', component: PaymentComponent },
    { path: 'category/:id', component: CategoryProductComponent },
    { path: 'category', component: CategoryProductComponent },
  ]},

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent, RegisterComponent, HomepageComponent]