import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User, Review } from './models/Models';
import { Appointment, DTOAppointment } from './models/appointment';
import { Calendar } from './models/calendar';
import { AuthorizationService } from './authorization.service';
import { SimpleUser } from './models/simpleUser';
@Injectable()

export class HttpService {

  constructor(private http: HttpClient, private router: Router, private auth: AuthorizationService) {}

  apiUrl = 'http://localhost:51071/api/';

  getExperts(): Observable<User[]> {
    const url = `${this.apiUrl}Expert`;
    return this.http.get<any>(url);
  }
  addFavorite(expert) {
    const url = `${this.apiUrl}User/` + this.auth.currentUser().id + '/favorites';
    return this.http.post(url, {id: expert});
  }
  public getFavorites(): Observable<SimpleUser[]> {
    const url = `${this.apiUrl}User/` + this.auth.currentUser().id + '/favorites';
    return this.http.get<any>(url);
  }
  getUser(id: string): Observable<User> {
    const url = `${this.apiUrl}User/${id}`;
    return this.http.get<any>(url);
  }
  sendPassword(email: string) {
    const url = `${this.apiUrl}User/forgotpassword`;
    return this.http.post<any>(url, {id: email});
  }
  addProfilePicture(fd: FormData) {
    const url = `${this.apiUrl}Account/AddProfilePicture/` + this.auth.currentUser().id;
    return this.http.post(url, fd);
  }
  getExpert(id: string): Observable<User> {
    const url = `${this.apiUrl}Expert/${id}`;
    return this.http.get<any>(url);
  }
  getCategories(): Observable<string[]> {
    const url = `${this.apiUrl}Category`;
    return this.http.get<any>(url);
  }
  addReview(id: string, review: Review) {
    const url = `${this.apiUrl}expert/${id}/review`;
    return this.http.post(url, review);
  }
  getPrivateCalendar(userId: string): Observable<Calendar> {
    const url = `${this.apiUrl}calendar/user/${userId}`;
    return this.http.get<Calendar>(url);
  }
  getPublicCalendar(userId: string): Observable<Calendar> {
    const url = `${this.apiUrl}calendar/expert/${userId}`;
    return this.http.get<Calendar>(url);
  }
  addAppointment(appointment: DTOAppointment): Observable<any> {
    const myAppointment = new Appointment();
    myAppointment.title = appointment.title;
    myAppointment.text = appointment.text;
    myAppointment.participants = appointment.participants;
    myAppointment.maxParticipants = appointment.maxParticipants,
    myAppointment.startTime = appointment.startTime.toLocaleString();
    myAppointment.endTime = appointment.endTime.toLocaleString();
    myAppointment.name = appointment.name;
    myAppointment.creatorId = appointment.creatorId;

    const url = `${this.apiUrl}appointment`;
    return this.http.post(url, myAppointment);
  }
  addUserToAppointment(appointment: DTOAppointment, userId: string) {
    const url = `${this.apiUrl}appointment/${appointment.id}/participant`;
    return this.http.post(url, {id: userId});
  }
  deleteAppointment(appointment: Appointment): Observable<any> {
    const url = `${this.apiUrl}appointment/${appointment.id}`;
    return this.http.delete(url);
  }
  removeUserFromAppointment(userId: string, appointment: Appointment): Observable<any> {
    const url = `${this.apiUrl}appointment/${appointment.id}/participant/${userId}`;
    return this.http.delete(url);
  }
}
