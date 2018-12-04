import { HttpService } from './shared/http.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { AppRoutingModule } from './/app-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ExpertProfileComponent } from './expert-profile/expert-profile.component';
import { SearchComponent } from './search/search.component';
import { CalendarComponent } from './calendar/calendar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthorizationService } from './shared/authorization.service';
import { AuthInterceptor } from './shared/auth.interceptor';
import { ReviewPageComponent } from './review-page/review-page.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MyCalendarComponent } from './my-calendar/my-calendar.component';
import { ExpertCalendarComponent } from './expert-calendar/expert-calendar.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SignUpComponent,
    ExpertProfileComponent,
    SearchComponent,
    CalendarComponent,
    PageNotFoundComponent,
    ForgotPasswordComponent,
    ReviewPageComponent,
    MyCalendarComponent,
    ExpertCalendarComponent,
    ProfileComponent
  ],
  imports: [
    MDBBootstrapModule.forRoot(),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    MatProgressSpinnerModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    AuthGuard,
    AuthorizationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
