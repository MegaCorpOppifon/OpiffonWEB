import { OnInit, Component, ChangeDetectionStrategy, ViewChild, TemplateRef} from '@angular/core';
import { CalendarComponent } from '../calendar/calendar.component';
import { DTOAppointment } from '../shared/models/appointment';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView} from 'angular-calendar';
import { AuthorizationService } from '../shared/authorization.service';
import { HttpService } from '../shared/http.service';
import { User } from '../shared/models/Models';
import { Calendar } from '../shared/models/calendar';
import { SimpleUser } from '../shared/models/simpleUser';
import { Router, ActivatedRoute } from '@angular/router';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-expert-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './expert-calendar.component.html',
  styleUrls: ['./expert-calendar.component.scss']
})
export class ExpertCalendarComponent implements OnInit {

  @ViewChild('modalContent')
  modalContent: TemplateRef<any>;
  @ViewChild('errorContent')
  errorContent: TemplateRef<any>;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  user: User;
  expert: User;
  errorMessage: string;
  showErrorMessage: boolean;
  refresh: Subject<any> = new Subject();
  events: CalendarEvent<DTOAppointment>[] = [  ];
  activeDayIsOpen: boolean = true;  
  appointment: DTOAppointment;
  userCalendar: Calendar
  expertCalendar: Calendar;
  isLoggedIn: boolean = false;
  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        
        if(event.meta.creatorId == this.user.id) {
          this.http.deleteAppointment(event.meta)
          .subscribe(() => {
            this.events = this.events.filter(iEvent => iEvent.meta.id !== event.meta.id);
            this.handleEvent('Deleted', event);
          })
        } else {
          this.http.removeUserFromAppointment(this.user.id ,event.meta)
          .subscribe(() => {
            this.events = this.events.filter(iEvent => iEvent !== event);
            this.handleEvent('Deleted', event);
          })
        }
      }
    }
  ];

  constructor( public modal: NgbModal, public errorModal: NgbModal, public auth: AuthorizationService, public http: HttpService, public route: ActivatedRoute) {
    
  }

  ngOnInit(){
    this.showErrorMessage = false;
    this.appointment = new DTOAppointment();
    if(this.auth.isLoggedIn()){
      this.user = this.auth.currentUser();
      this.isLoggedIn = true;
      this.http.getPrivateCalendar(this.user.id)
    .subscribe(data => {
      this.userCalendar = data
      this.userCalendar.appointments.forEach(element => {
        this.pushToLocalEventList(element, true);
      });
    })
    } 
    
    

    // Get expert calendar
    this.route.params.subscribe(params => {
      const expertid = params['id'];
      this.http.getExpert(expertid)
      .subscribe(data => {
        this.expert = data;
      });
      this.http.getPublicCalendar(expertid)
      .subscribe((calendar: Calendar) => {
        this.expertCalendar = calendar
        this.expertCalendar.appointments.forEach(element => {
        this.pushToLocalEventList(element, false);
        });
      })
    });    
  } 

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });

  }

  pushToLocalEventList(appointment: DTOAppointment, yourEvent: boolean){
    this.events.push({
      title: (yourEvent ? appointment.title : "Private"),
      start: new Date(appointment.startTime),
      end: new Date(appointment.endTime),
      color: (yourEvent ? colors.blue : colors.red),
      draggable: false,
      resizable: {
        beforeStart: false,
        afterEnd: false
      },
      actions: (yourEvent ? this.actions : []),
      meta: appointment
    });
    this.refresh.next();
  }

  addPaticipantToEvent(user: SimpleUser, event: DTOAppointment, expertId: string): void{
    
    let appointmentIndex = this.events.findIndex(x => x.meta.id == event.id);
    this.http.addUserToAppointment(this.events[appointmentIndex].meta, expertId)
    .subscribe(() => {
      this.events[appointmentIndex].meta.participants.push(user);
      this.pushToLocalEventList(event, false);
    }, data => {
      this.errorMessage = data.error;
      this.errorModal.open(this.errorContent, { size: 'lg' });
    });      
  }

  addEvent(): void {
    let simpleUser = new SimpleUser();
    simpleUser.firstName = this.user.firstName;
    simpleUser.lastName = this.user.lastName;
    simpleUser.email = this.user.email;

    let simpleExpert = new SimpleUser();
    simpleExpert.firstName = this.expert.firstName;
    simpleExpert.lastName = this.expert.lastName;
    simpleExpert.email = this.expert.email;

    let myAppointment = new DTOAppointment();
    myAppointment.title = this.appointment.title;
    myAppointment.text = this.appointment.text;
    myAppointment.participants.push(simpleUser)
    myAppointment.maxParticipants = 2,
    myAppointment.startTime = this.appointment.startTime;
    myAppointment.endTime = this.appointment.endTime;
    myAppointment.name = this.user.firstName + " " + this.user.lastName;
    myAppointment.creatorId = this.user.id;

    this.http.addAppointment(myAppointment)
    .subscribe(data => {
      myAppointment.id = data;
      this.pushToLocalEventList(myAppointment, true);
      this.addPaticipantToEvent(simpleExpert, myAppointment, this.expert.id);
      this.appointment = new DTOAppointment();
    },
    data => {
      this.errorMessage = data.error.message;
      this.errorModal.open(this.errorContent, { size: 'lg' });
    });   
  }
}