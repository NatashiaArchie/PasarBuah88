import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoginError: boolean = false;
  constructor(
    private userService: UserService,
    public toastr: ToastrService,
    private router: Router,
    
  ) { }

  ngOnInit() {


  }

  OnSubmit(username, password){
    //make a token request
    debugger;
    this.userService.userAuthentication(username, password)
    .subscribe((data: any) => {
      localStorage.setItem('userToken', data.access_token);
      this.router.navigate(['/home']);
      this.getUserClaim();
    },
    (err: HttpErrorResponse) => {
      this.isLoginError = true;
      this.toastr.error("Incorrect username or password");
    });
    // this.router.navigate(['/home']);
  }

  getUserClaim() {
    this.userService.getUserClaim()
    .subscribe((detail: any) => {
      localStorage.setItem('userSession', JSON.stringify(detail));
      
    })
  }

}
