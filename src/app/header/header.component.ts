import { AuthorizationService } from './../shared/authorization.service';
import { Component, OnInit, ViewChild, AfterViewInit  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'angular-bootstrap-md';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit  {
  @ViewChild('loginModalCenter') public modal: ModalDirective;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  isLoggedIn = false;
  logo: string

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthorizationService
  ) {}


  ngOnInit() {
    this.logo = environment.apiUrl + '/Logo.png';
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.isLoggedIn = this.authenticationService.isLoggedIn();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

  // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService
      .login(this.f.email.value, this.f.password.value, result => {
        if (result) {
          console.log('Logged in ' + result);
          this.isLoggedIn = result;
          this.router.navigate(['/home']);
        } else {
          console.log('not a valid user');
        }
      });
    }

    logout() {
      this.authenticationService.logout();
      this.isLoggedIn = this.authenticationService.isLoggedIn();
      this.router.navigate(['/login']);
    }

    homeRouting() {
      this.router.navigate(['/home']);
    }

    profileRouting() {
      this.router.navigate(['/profile']);
    }

    calendarRouting() {
      this.router.navigate([
        '/calendar/' + this.authenticationService.currentUser().id
      ]);
    }

    signupRouting() {
      this.router.navigate([
        '/signup'
      ]);
    }

    forgotPasswordRouting() {
      this.router.navigate([
        '/forgot-password'
      ]);
    }
}
