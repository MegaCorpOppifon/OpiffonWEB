import { UserCredentials } from './models/Models';

import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

@Injectable()
export class TokenService {
  private url = 'http://localhost:51071/api/account/';

  constructor(private http: HttpClient) {}

  public login(email: string, password: string): Observable<IOidcResponse> {
    const options = {
      headers: new HttpHeaders().set(
        'Content-Type', 'application/x-www-form-urlencoded'
      )
    };

    const data = `grant_type=password&username=${email}&password=${password}&scope=openid%20offline_access`;
    console.log('setting token...');
    return this.http
      .post<IOidcResponse>(`${this.url}login`, data, options);
  }

  public refreshToken(refreshToken: string) {
    const options = {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded'
      )
    };

    const data = `grant_type=refresh_token&refresh_token=${refreshToken}&scope=openid%20offline_access`;

    return this.http
      .post<IOidcResponse>(`${this.url}login`, data, options);
  }
}
export interface IOidcResponse {
  access_token: string;
  refresh_token: string;
}

export interface IOidcErrorResponse {
  error: string;
  error_description: string;
}
