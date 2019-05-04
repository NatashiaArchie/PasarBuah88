import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user: User;
  emailPattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$";
  phonePattern = "^(^\\+62\\s?|^0)(\\d{3,4}-?){2}\\d{3,4}$"
  constructor(
    private toastr : ToastrService,
    public userService: UserService,
    public router: Router
  ) { }

  ngOnInit() {
    this.user = {
      Id: '',
      UserName: '',
      FullName: '',
      Email: '',
      PhoneNumber: '',
      Password: ''
    }
  }

  OnSubmit(form: NgForm) {
    this.userService.registerUser(form.value)
    .subscribe((data:any) => {
      console.log(form.value)
      if (data.Succeeded == true){
        form.reset();
        this.toastr.success('Employee registration successful');
        this.router.navigate(["/login"]);
      }
      else {
        this.toastr.error(data.Errors);
        console.log(data.Errors);
      }
    });
    
  }

}
