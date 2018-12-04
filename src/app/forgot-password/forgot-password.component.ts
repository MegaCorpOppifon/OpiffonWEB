import { HttpService } from './../shared/http.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  form;
  emailSent = false;

  constructor(private route: ActivatedRoute, private http: HttpService, private fb: FormBuilder) {
    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.form.valid) {
        console.log('Sending code by Email');
        this.http.sendPassword(this.form.get('email').value).subscribe( data => {
          this.emailSent = true;
        });
    } else {
      // validate all form fields
    }
  }

  isFieldInvalid(field: string) {
    return !this.form.get(field).valid && this.form.get(field).touched;
  }

}
