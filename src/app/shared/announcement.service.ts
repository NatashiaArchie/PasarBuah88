import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Announcement } from './announcement.model';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  readonly rootUrl='http://localhost:50008/';
  list: Announcement[];
  constructor(
    public http: HttpClient
  ) { }

  refreshList() {
    var reqHeader = new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('userToken')});
    this.http.get(this.rootUrl + 'api/Announcement', {headers: reqHeader})
    .toPromise().then(res => this.list = res as Announcement[])
  }

  getList() {
    var reqHeader = new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('userToken')});
    return this.http.get(this.rootUrl + 'api/Announcement', {headers: reqHeader})
    
  }
}
