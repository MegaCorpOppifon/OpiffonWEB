import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

const poolData = {
  UserPoolId: 'eu-central-1_oG03OLLZ9', // Your user pool id here
  ClientId: '9t3menml3pjck9ld7akmd2dk0' // Your client id here
};

/* const userPool = new CognitoUserPool(poolData); */

@Injectable()
export class AuthorizationService {
  cognitoUser: any;
  constructor() { }

  register(email, password) {
/*
    const attributeList = [];

    return Observable.create(observer => {
      console.log('email:', email);
      userPool.signUp( email, password, attributeList, null, (err, result) => {
        if (err) {
          console.log('signUp error', err);
          observer.error(err);
        }

        this.cognitoUser = result.user;
        console.log('signUp success', result);
        observer.next(result);
        observer.complete();
      });
    }); */
  }

  confirmAuthCode(code) {
    /* const user = {
      Username : this.cognitoUser.username,
      Pool : userPool
    };
    return Observable.create(observer => {
      const cognitoUser = new CognitoUser(user);
      cognitoUser.confirmRegistration(code, true, function(err, result) {
        if (err) {
          console.log(err);
          observer.error(err);
        }
        console.log('confirmAuthCode() success', result);
        observer.next(result);
        observer.complete();
      });
    }); */
  }

  signIn(email, password) {

    /* const authenticationData = {
      Username : email,
      Password : password
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const userData = {
      Username : email,
      Pool : userPool
    };
    const cognitoUser = new CognitoUser(userData);

    return Observable.create(observer => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
          console.log('Succes!');
          observer.next(result);
          observer.complete();
        },
        onFailure: function(err) {
          console.log('Failure!');
          console.log(err);
          console.log(err.message);
          observer.error(err);
        },
      });
    }); */
  }

  isLoggedIn() {
    return true;
    // return userPool.getCurrentUser() != null;
  }

  getAuthenticatedUser() {
    // gets the current user from the local storage
    /* return userPool.getCurrentUser(); */
  }

  logOut() {
    /* this.getAuthenticatedUser().signOut();
    this.cognitoUser = null; */
  }
}
