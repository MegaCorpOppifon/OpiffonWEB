import { HttpService } from './../shared/http.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/Models';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public mainOptions = [];
  public mainCatagory: string;
  public searchText = '';
  public experts: User[];

  constructor(private router: Router, private http: HttpService) { }

  ngOnInit() {
    this.http.getExperts().subscribe( data => {
      this.experts = data; } );
    this.http.getCategories().subscribe( data => {
      this.mainOptions = data; } );
  }

  goToExpertDetails(id) {
    this.router.navigate(['/expert', id]);
  }

// TODO Should not be case sensitive
  filterAll(arr, searchKey) {
    return arr.filter((obj) => {
      return Object.keys(obj).some((key) => {
        return obj[key] != null && obj[key].toString().toLowerCase()
        .includes(searchKey.toLowerCase());
      });
    });
  }

  // TODO Should not be case sensitive
  filterCatagory(arr, searchKey) {
    return arr.filter(obj => obj.expertCategory === searchKey );
  }

  search() {
    if (this.mainCatagory) {
      return this.filterAll(this.filterCatagory(this.experts, this.mainCatagory), this.searchText);
    }
    if (!this.searchText) {
      return this.experts;
    }
    if (this.searchText) {
      return this.filterAll(this.experts, this.searchText);
    }
  }

  public getSubCatagories(mainCatagory: string) {
    // TODO service call
    console.log(this.mainCatagory);
  }

}
