import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly rootUrl = 'http://localhost:50008/';

  formData: User;
  list: User[];
  constructor(private http: HttpClient) { }

  registerUser(user: User){
    const body: User = {
      Id: null,
      UserName: user.UserName,
      FullName: user.FullName,
      Email: user.Email,
      PhoneNumber: user.PhoneNumber,
      Password: user.Password
    }
    return this.http.post(this.rootUrl + 'api/User/Register', body);
  }

  userAuthentication(username, password){
    var data = "username=" + username + "&password=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({'Content-Type':'application/x-www-urlencoded'});
    return this.http.post(this.rootUrl+ '/token', data, {headers: reqHeader});
    console.log(reqHeader);
  }

  getUserClaim() {
    var reqHeader = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('userToken')});
    return this.http.get(this.rootUrl + 'api/GetUserClaims', {headers: reqHeader})
  }
}
