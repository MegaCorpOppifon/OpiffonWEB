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
    this.mainFields = [];
    this.tags = [];
    this.createWhoAreYouForm(fb)
  }

  ngOnInit() {
    this.http.getCategories().subscribe( data => {
      this.catagories = data; });

      this.signUpForm.get('expert')
        .valueChanges
        .subscribe((value: boolean) => {
          if(value){
            this.signUpForm.get('catagory').setValidators(Validators.required);

            this.signUpForm.get('mainFields').setValidators(Validators.required);
            this.signUpForm.patchValue({'mainFields': [ ]});

            this.signUpForm.get('tags').setValidators(Validators.required);
            this.signUpForm.patchValue({'tags': [ ]});
            this.signUpForm.get('description').setValidators(Validators.required);
          } else {
            this.signUpForm.get('catagory').clearValidators();
            this.signUpForm.get('mainFields').clearValidators();
            this.signUpForm.get('tags').clearValidators();
            this.signUpForm.get('description').clearValidators();
          }
        })
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
      catagory: [''],
      mainField: [''],
      mainFields: [[]],
      tag: [''],
      tags: [[]],
      description: ['']
    }, {
        validator: PasswordValidation.MatchPassword
    });
  }

  get f() { return this.signUpForm.controls; }


  public addInterest() {
    if (this.signUpForm.controls['interest'].value !== '') {
      
      const interest = this.signUpForm.controls['interest'].value;
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

  public addMainField() {
    if (this.signUpForm.controls['mainField'].value !== '') {
      
      const mainField = this.signUpForm.controls['mainField'].value;
      this.mainFields.unshift(mainField);   
      this.signUpForm.patchValue({mainFields: this.mainFields});
    }
    this.signUpForm.patchValue({mainField: ''});
  }

  public removeMainField(mainFieldToRemove: string) {
    const mainField = this.mainFields.find(x => x === mainFieldToRemove);
    const index = this.mainFields.indexOf(mainField);
    this.mainFields.splice(index, 1);
    this.signUpForm.patchValue({mainFields: this.mainFields});
  }

  public addTag() {
    if (this.signUpForm.controls['tag'].value !== '') {
      
      const tag = this.signUpForm.controls['tag'].value;
      this.tags.unshift(tag);   
      this.signUpForm.patchValue({tags: this.tags});
    }
    this.signUpForm.patchValue({tag: ''});
  }

  public removeTag(tagToRemove: string) {
    const tag = this.tags.find(x => x === tagToRemove);
    const index = this.tags.indexOf(tag);
    this.tags.splice(index, 1);
    this.signUpForm.patchValue({tags: this.tags});
  }

  public copyInput() : boolean {
    if(this.signUpForm.valid){
      this.user.firstName = this.signUpForm.controls['firstName'].value;
      this.user.lastName = this.signUpForm.controls['lastName'].value;
      this.user.email = this.signUpForm.controls['email'].value;
      this.user.password = this.signUpForm.controls['password'].value;
      this.user.city = this.signUpForm.controls['city'].value;
      this.user.phoneNumber = this.signUpForm.controls['phoneNumber'].value;
      this.user.birthday = this.signUpForm.controls['birthday'].value;
      this.user.gender = this.signUpForm.controls['gender'].value;
      this.user.interestTags = this.signUpForm.controls['interests'].value;
      this.user.isExpert = this.signUpForm.controls['expert'].value;
      this.user.expertCategory = this.signUpForm.controls['catagory'].value;
      this.user.mainFields = this.signUpForm.controls['mainFields'].value;
      this.user.expertTags = this.signUpForm.controls['tags'].value;
      this.user.description = this.signUpForm.controls['description'].value;

      return true;
    } else {
      return false;
    }
  }

  public registerAndLogin(){
    this.authenticationService.register(this.user).subscribe( data =>
      this.authenticationService.login(this.user.email, this.user.password, result => {
        if (result) {
          console.log('Logged in ' + result);
          this.router.navigate(['/home']);
        } else {
          console.log('not a valid user');
        }
      }));
  }

  

  public onSubmit() {
    this.whoAreYouSubmit = true;
    if(this.copyInput()){
      this.registerAndLogin();
    }

    console.log(this.user);
  }
}
