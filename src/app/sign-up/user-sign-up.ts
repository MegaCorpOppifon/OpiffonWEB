export class UserSignUp {
    firstName: string;
    lastName: string;
    email: string;
    password: { 
        pwd: string;
        confirmPwd: string;
      };    
    confirmPassword: string;
}