import { AuthorizationService } from './../shared/authorization.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../shared/models/Models';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../shared/http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public user: User;
  public id: string;

  constructor(private router: Router, private http: HttpService, private route: ActivatedRoute, private auth: AuthorizationService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.http.getExpert(this.id).subscribe( data => {
        this.user = data;
      });
   });
  }

  public onSubmit() {
    if (this.user.password === this.user.confirmPassword) {
      this.auth.register(this.user).subscribe( data =>
        this.auth.login(this.user.email, this.user.password, result => {
          if (result) {
            console.log('Logged in ' + result);
            this.router.navigate(['/home']);
          } else {
            console.log('not a valid user');
          }
        }));
    }

    console.log(this.user);
  }

}
