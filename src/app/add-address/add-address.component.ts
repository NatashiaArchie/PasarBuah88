import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Address } from '../shared/address.model';
import { NgForm } from '@angular/forms';
import { AddressService } from '../shared/address.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent implements OnInit {
  address: Address;
  phonePattern = "^(^\\+62\\s?|^0)(\\d{3,4}-?){2}\\d{3,4}$";
  userSession = null;
  constructor(
    public dialogRef: MatDialogRef<AddAddressComponent>,
    public addressService: AddressService,
    public toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.address = this.data;
  }

  ngOnInit() {
    if (this.address== null) {
      this.address= {
        AddressId: null,
        Id: '',
        Name: '',
        PhoneNumber: '',
        DeliveryAddress: '',
        DeliveryDetail: ''
      }
    }
    
  }

  onSubmit(form: NgForm) {
    if (this.address.AddressId == null) {
      console.log(form.value);
      this.userSession = JSON.parse(localStorage.getItem('userSession'));
      console.log(this.userSession.Id);
      this.addressService.addAddress(form.value, this.userSession.Id)
        .subscribe((data:any)=> {
          form.reset();
          this.dialogRef.close();
          this.addressService.RefreshList();
      });
    }
    else {
      console.log(form.value);
      this.userSession = JSON.parse(localStorage.getItem('userSession'));
      console.log(this.userSession.Id);
      this.addressService.editAddress(form.value, this.userSession.Id)
        .subscribe((data:any)=> {
          form.reset();
          this.dialogRef.close();
          this.addressService.RefreshList();
      });
    }
    
  }

}
