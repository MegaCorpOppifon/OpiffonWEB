import { ReviewPageComponent } from './review-page/review-page.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { MyCalendarComponent } from './my-calendar/my-calendar.component';
import { ExpertCalendarComponent } from './expert-calendar/expert-calendar.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SearchComponent } from './search/search.component';
import { ExpertProfileComponent } from './expert-profile/expert-profile.component';
import { AuthGuard } from './guards/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignUpComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'calendar', component: MyCalendarComponent, canActivate: [AuthGuard] },
  { path: 'calendar/:id', component: ExpertCalendarComponent, canActivate: [AuthGuard]},
  { path: 'search', component: SearchComponent },
  { path: 'expert/:id', component: ExpertProfileComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'review/:id', component: ReviewPageComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
