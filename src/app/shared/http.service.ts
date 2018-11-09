import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User, Review } from './models/Models';
import { Appointment, DTOAppointment } from './models/appointment';
import { Calendar } from './models/calendar';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, private router: Router) {}

  apiUrl = 'http://localhost:51071/api/';


  getExperts(): Observable<User[]> {
    const url = `${this.apiUrl}Expert`;
    return this.http.get<any>(url);
  }

  /* getThreeExperts(): User[] {
    let users: User[];
    this.getExperts().subscribe( data => {
      const randomInt = this.randomNumber(data.length - 2);
      users = data.slice(randomInt, randomInt + 3);
    });
    return users;
  } */

  getUser(id: string): Observable<User> {
    const url = `${this.apiUrl}User/${id}`;
    return this.http.get<any>(url);
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
    const url = `${this.apiUrl}calendar/user/${userId}`
    return this.http.get<Calendar>(url);
  }

  getPublicCalendar(userId: string): Observable<Calendar> {
    const url = `${this.apiUrl}calendar/expert/${userId}`
    return this.http.get<Calendar>(url);
  }

  addAppointment(appointment: DTOAppointment): Observable<any> {
    let myAppointment = new Appointment();
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

  addUserToAppointment(appointment: DTOAppointment, userId: string){


    const url = `${this.apiUrl}appointment/${appointment.id}/participant`;
    return this.http.post(url, {id: userId});
  }

  deleteAppointment(appointment: Appointment): Observable<any>{
    const url = `${this.apiUrl}appointment/${appointment.id}`;
    return this.http.delete(url);
  }

  removeUserFromAppointment(userId: string, appointment: Appointment): Observable<any>{
    const url = `${this.apiUrl}appointment/${appointment.id}/participant/${userId}`;
    return this.http.delete(url);
  }
}
