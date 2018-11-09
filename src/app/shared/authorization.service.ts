import { Router } from '@angular/router';
import { User } from './models/Models';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorizationService {
  constructor(private http: HttpClient, private router: Router) { }

  apiUrl = 'http://localhost:51071/api/';
  private localStorage = "megacorpworkout";

  register(user: User) {
    const url = `${this.apiUrl}account/register`;
    return this.http.post<any>(url, user);
  }

  login(email: string, password: string, callback: (r: boolean) => any): void {
    const url = `${this.apiUrl}account/login`;
    const user = {
      email: email,
      password: password
    };
    this.http
      .post<any>(url, user)
      .subscribe(
        data => {
          // login successful if there's a jwt token in the response
          console.log(data.token);
          if (data) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            this.saveToken(data.token);
            callback(true);
          }
        },
        // Errors will call this callback instead:
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            console.log('An error occurred:', err.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.log(
              `Backend returned code ${err.status}, body was: ${err.message}`
            );
          }
          console.log('authenticationService: login = ', false);
          callback(false);
        }
      );
  }

  logout() {
    // remove user from local storage to log user out
    window.localStorage.removeItem(this.localStorage);
  }


  public currentUser(): User {
    if (this.isLoggedIn()) {
      const token = this.getToken();
      const payload = JSON.parse(window.atob(token.split('.')[1]));
      const user = new User();
      user.id = payload.id;
      user.email = payload.email;
      user.firstName = payload.firstName;
      user.lastName = payload.lastName;
      if (payload.isExpert === 'True') {
        user.isExpert = true;
      } else {
        user.isExpert = false;
      }
      return user;
    } else {
      return;
    }
  }

  public isLoggedIn() {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(window.atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  public getToken() {
    if (window.localStorage.getItem(this.localStorage)) {
      return window.localStorage.getItem(this.localStorage);
    } else {
      return '';
    }
  }

  private saveToken(token: string) {
    window.localStorage.setItem(this.localStorage, token);
  }

}
