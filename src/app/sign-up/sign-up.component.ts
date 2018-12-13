import { HttpService } from './../shared/http.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PasswordValidation } from './validation';
import { User } from '../shared/models/Models';
import { AuthorizationService } from '../shared/authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  whoAreYouSubmit = false;

  passwordPattern = '^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?!.*s).{6,12}$';
  mobileNumberPattern = '^((\\+91-?)|0)?[0-9]{10}$';
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  
  // User
  interest: string;
  interests: string[];

  // Expert
  catagory: string;
  mainField: string;
  tag: string;
  mainFields: string[];
  tags: string[];

  catagories: string[];
  user: User;
  signUpForm: FormGroup;

  constructor( 
    private router: Router, 
    private authenticationService: AuthorizationService, 
    private http: HttpService,
    public fb: FormBuilder ) {
    this.user = new User();
    this.interests = [];
    this.createWhoAreYouForm(fb)
  }

  ngOnInit() {
    this.http.getCategories().subscribe( data => {
      this.catagories = data; });
  }

  private createWhoAreYouForm(fb: FormBuilder){
    this.signUpForm = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      city: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      birthday: ['', Validators.required],
      gender: ['male', Validators.required],
      interest: [''],
      interests: [[], Validators.required],
      expert: [false, Validators.required],
      catagory: ['', Validators.required],
      mainField: [''],
      tags: [''],
      description: ['', Validators.required]
    }, {
        validator: PasswordValidation.MatchPassword
    });
  }

  get f() { return this.signUpForm.controls; }


  public addInterest() {
    if (this.signUpForm.controls['interest'].value !== '') {
      
      let interest = this.signUpForm.controls['interest'].value;
      this.interests.unshift(interest);   
      this.signUpForm.patchValue({interests: this.interests});
    }
    this.signUpForm.patchValue({interest: ''});
  }

  public removeInterest(interestToRemove: string) {
    const interest = this.interests.find(x => x === interestToRemove);
    const index = this.interests.indexOf(interest);
    this.interests.splice(index, 1);
    this.signUpForm.patchValue({interests: this.interests});
  }

  // public addTag() {
  //   if (this.tag !== '') {
  //     if (this.user.expertTags === undefined) {
  //       this.user.expertTags = [];
  //     }
  //     this.user.expertTags.push(this.tag);
  //   }
  //   this.tag = '';
  // }

  // public removeTag(tagToRemove: string) {
  //   const tag = this.user.expertTags.find(x => x === tagToRemove);
  //   const index = this.user.expertTags.indexOf(tag);
  //   this.user.expertTags.splice(index, 1);
  // }

  // public addMainField() {
  //   if (this.mainField !== '') {
  //     if (this.user.mainFields === undefined) {
  //       this.user.mainFields = [];
  //     }
  //   this.user.mainFields.push(this.mainField);
  //   }
  //   this.mainField = '';
  // }

  // public removeMainField(mainFieldToRemove: string) {
  //   const mainField = this.user.mainFields.find(x => x === mainFieldToRemove);
  //   const index = this.user.mainFields.indexOf(mainField);
  //   this.user.mainFields.splice(index, 1);
  // }

  public onSubmit() {
    this.whoAreYouSubmit = true;

    // if (this.user.password === this.user.confirmPassword) {
    //   this.authenticationService.register(this.user).subscribe( data =>
    //     this.authenticationService.login(this.user.email, this.user.password, result => {
    //       if (result) {
    //         console.log('Logged in ' + result);
    //         this.router.navigate(['/home']);
    //       } else {
    //         console.log('not a valid user');
    //       }
    //     }));
    // }

    console.log(this.user);
  }

}
