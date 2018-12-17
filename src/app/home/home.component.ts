import { HttpService } from './../shared/http.service';
import { AuthorizationService } from './../shared/authorization.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared/models/Models';
import { SimpleUser } from '../shared/models/simpleUser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public user: User;
  public experts: User[];
  public appointments = [
    '21-01-2019, Kl. 13:00, Thomas Jensen',
    '27-01-2019, Kl. 10:30, Frisør Træholt',
    '02-02-2019, Kl. 12:00, John Andersen'
  ];
  public profiles = [
    'assets/img/Dan.jpg',
    'assets/img/Henrik.jpg',
    'assets/img/Rasmus.jpg'
  ];
  public newsfeed = [
    'Thomas Jensen: Jeg har fået ledige pladser om torsdagen.',
    'Frisør Træholt: I denne uge har vi tilbud på alle Tresommé produkter.',
    'John Andersen: Jeg har skiftet nummer og kan nu kontaktes på tlf: 32658794.'
  ];
  public favorites: SimpleUser[];

  constructor(
    private router: Router,
    private auth: AuthorizationService,
    private http: HttpService
  ) {}
  ngOnInit() {
    this.getUserData();
    this.http.getExperts().subscribe(data => {
      const randomInt = this.randomNumber(data.length - 2);
      this.experts = this.shortenDescription(
        data.slice(randomInt, randomInt + 3)
      );
    });
  }

  randomNumber(max) {
    return Math.floor(Math.random() * max);
  }

  shortenDescription(experts: User[]) {
    experts.forEach(element => {
      if (element.description.length > 50) {
        element.description = element.description.slice(0, 100) + '...';
      }
    });
    return experts;
  }

  getUserData() {
    this.user = this.auth.currentUser();
    this.http.getFavorites().subscribe(data => {
      this.favorites = data;
    });
  }

  searchClick() {
    this.router.navigate(['/search']);
  }

  expertClick() {
    if (this.auth.currentUser().isExpert) {
      this.router.navigate(['/expert', this.auth.currentUser().id]);
      // TODO if user dont have expert page
    } else {
      // route to create expert page
    }
  }

  expertRouting(id: string) {
    if (true) {
      this.router.navigate(['/expert', id]);
    }
  }

  calendarClick() {
    this.router.navigate(['/calendar']);
  }
}
