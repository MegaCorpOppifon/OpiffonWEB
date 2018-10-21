import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public title = 'Welcome to Oppifon';
  public profiles = ['assets/img/Dan.jpg', 'assets/img/Henrik.jpg', 'assets/img/Rasmus.jpg'];
  constructor() { }

  ngOnInit() {
  }

  onClickMe() {
  }
}
