import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expert-profile',
  templateUrl: './expert-profile.component.html',
  styleUrls: ['./expert-profile.component.scss']
})
export class ExpertProfileComponent implements OnInit {
public reviews = ['Super professional help', 'Really helped me a lot', 'Best talk ever!'];
  constructor(private router: Router) { }

  ngOnInit() {
  }

  calendarClick() {
    this.router.navigate(['/calendar']);
  }

}
