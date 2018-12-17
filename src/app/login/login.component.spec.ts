import { HttpService } from './../shared/http.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { Router, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { User } from '../shared/models/Models';

class HttpServiceMock implements Partial<HttpService> {
  experts: User[] = [];

  getExperts() {
    return of(this.experts);
  }
}

class RouterMock implements Partial<Router> {
  async navigate(path: string[]) {
    return true;
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        { provide: HttpService, useClass: HttpServiceMock },
        { provide: Router,      useClass: RouterMock }
        // HttpService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
