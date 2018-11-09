import { HttpService } from './../shared/http.service';
import { HttpClient } from '@angular/common/http';
import { AuthorizationService } from './../shared/authorization.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../shared/models/Models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public user: User;
  public experts: User[];
  public profiles = ['assets/img/Dan.jpg', 'assets/img/Henrik.jpg', 'assets/img/Rasmus.jpg'];
  public appointments = ['appointment 1', 'appointment 2', 'appointment 3'];

  constructor(private router: Router, private auth: AuthorizationService, private http: HttpService) { }
  ngOnInit() {
    this.getUser();
    this.http.getExperts().subscribe( data => {
      const randomInt = this.randomNumber(data.length - 2);
      this.experts = data.slice(randomInt, randomInt + 3);
    });

  }

  randomNumber(max) {
      return Math.floor(Math.random() * (max));
  }

  getUser(): void {
      this.user = this.auth.currentUser();
  }

  searchClick() {
    this.router.navigate(['/search']);
}

expertClick() {
  // TODO if user has expert page
  if (true) {
  this.router.navigate(['/expert', this.auth.currentUser().id]);
  // TODO if user dont have expert page
} else {
  // route to create expert page
}

}

  calendarClick() {
  this.router.navigate(['/calendar']);
}

}
