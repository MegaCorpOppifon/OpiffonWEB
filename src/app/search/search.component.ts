import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public mainOptions = ['Technologi', 'Health', 'Education', 'Sport', 'Psychology'];
  public mainCatagory: string;
  public searchText: string;

  public experts = [
    { id: '1', firstName: 'Mark', lastName: 'Otto', catagory: 'Technologi' },
    { id: '2', firstName: 'Jacob', lastName: 'Thornton', catagory: 'Health' },
    { id: '3', firstName: 'Larry', lastName: 'Last', catagory: 'Health' },
    { id: '4', firstName: 'John', lastName: 'Doe', catagory: 'Education' },
    { id: '5', firstName: 'Zigi', lastName: 'Kiwi', catagory: 'Sport' },
    { id: '6', firstName: 'Beatrice', lastName: 'Selphie', catagory: 'Psychology' },
  ];

  constructor(private router: Router) { }

  ngOnInit() {
  }
// TODO Should not be case sensitive
  filterAll(arr, searchKey) {
    return arr.filter((obj) => {
      return Object.keys(obj).some((key) => {
        return obj[key].includes(searchKey);
      });
    });
  }

  // TODO Should not be case sensitive
  filterCatagory(arr, searchKey) {
    return arr.filter(obj => obj.catagory === searchKey );
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

  expertClick() {
    this.router.navigate(['/expert']);
  }

}
