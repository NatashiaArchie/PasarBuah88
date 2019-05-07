import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SlideshowModule } from 'ng-simple-slideshow';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { HomepageComponent } from './homepage/homepage.component';
import { UserService } from './shared/user.service';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from './material/material.module';
import { MatDividerModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CartComponent } from './cart/cart.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LoginLayoutComponent } from './layout/login-layout/login-layout.component';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AddAddressComponent } from './add-address/add-address.component';
import { CheckoutDetailComponent } from './checkout-detail/checkout-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    routingComponents,
    HomepageComponent,
    CartComponent,
    NavigationComponent,
    LoginLayoutComponent,
    HomeLayoutComponent,
    CheckoutComponent,
    AddAddressComponent,
    CheckoutDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    SlideshowModule,
    MaterialModule,
    // PrimeNg
    InputTextModule,
    ButtonModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MatDividerModule,
    FlexLayoutModule.withConfig({
      useColumnBasisZero: false,
      printWithBreakpoints: ['md', 'lt-lg', 'lt-xl', 'gt-sm', 'gt-xs']
    }),

  ],
  providers: [UserService],
  bootstrap: [AppComponent],
  entryComponents: [CartComponent, AddAddressComponent]
})
export class AppModule { 
}
