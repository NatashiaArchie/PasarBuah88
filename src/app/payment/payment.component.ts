import { Component, OnInit, AfterViewInit, Input, ViewChild, Inject } from '@angular/core';
import {  FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ElementsOptions, Element as StripeElement, StripeService, Elements } from 'ngx-stripe';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Transaction } from '../shared/transaction.model';
import { TransactionService } from '../shared/transaction.service';
import * as moment from 'moment';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  @Input() totalPrice
  elements: Elements;
  card: StripeElement;
  checkoutInfo: any;
  transaction: Transaction;
  elementsOptions: ElementsOptions = {
    locale: 'en'
  };
 
  stripeTest: FormGroup;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PaymentComponent>,
    public transactionService: TransactionService,
    private stripeService: StripeService,
    @Inject(MAT_DIALOG_DATA) data: any
  ) { 
    this.checkoutInfo = data;
  }

  ngOnInit(): void {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });
    this.stripeService.elements(this.elementsOptions)
      .subscribe(elements => {
        this.elements = elements;
        // Only mount the element the first time
        if (!this.card) {
          this.card = this.elements.create('card', {
            style: {
              base: {
                iconColor: '#666EE8',
                color: '#31325F',
                lineHeight: '40px',
                fontWeight: 300,
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSize: '18px',
                '::placeholder': {
                  color: '#CFD7E0'
                }
              }
            }
          });         
          this.card.mount('#card-element'); 
        }
      });
  }

  buy() {
    var OrderId = this.checkoutInfo.OrderId;
    debugger;
    this.stripeService.createToken(this.card)
      .subscribe(result => {
        if (result.token) {
          this.postTransaction(result.token);
          // Use the token to create a charge or a customer
          // https://stripe.com/docs/charges
          console.log(result.token);
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
  }

  postTransaction(token: any) {
    this.transaction = {
      OrderId: this.checkoutInfo.OrderId,
      TotalPrice: this.checkoutInfo.TotalPrice,
      PaymentToken: token.id,
      PaymentTime: moment().toDate().toDateString()
    }
    console.log(token.id);
    console.log(this.transaction);
    this.transactionService.addTransaction(this.transaction)
    .subscribe((data: any) => {
      console.log(data);
      this.dialogRef.close();
    });
  }



}
