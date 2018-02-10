import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  private baseUrl = "http://127.0.0.1:8000";
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET'})
  };

  constructor(private http: HttpClient) { }

  getUser(): Observable<any> {
    return this.http.get(this.baseUrl + '/get-user');
  }

}
