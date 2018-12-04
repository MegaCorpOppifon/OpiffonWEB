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
  selector: 'app-my-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './my-calendar.component.html',
  styleUrls: ['./my-calendar.component.scss']
})
export class MyCalendarComponent implements OnInit {

  @ViewChild('modalContent')
  modalContent: TemplateRef<any>;
  @ViewChild('errorContent')
  errorContent: TemplateRef<any>;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  user: User;
  errorMessage: string;
  showErrorMessage: boolean;
  refresh: Subject<any> = new Subject();
  events: CalendarEvent<DTOAppointment>[] = [  ];
  activeDayIsOpen = true;
  appointment: DTOAppointment;
  userCalendar: Calendar;
  expertCalendar: Calendar;
  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {

        if (event.meta.creatorId === this.user.id) {
          this.http.deleteAppointment(event.meta)
          .subscribe(() => {
            this.events = this.events.filter(iEvent => iEvent !== event);
            this.handleEvent('Deleted', event);
          });
        } else {
          this.http.removeUserFromAppointment(this.user.id, event.meta)
          .subscribe(() => {
            this.events = this.events.filter(iEvent => iEvent !== event);
            this.handleEvent('Deleted', event);
          });
        }
      }
    }
  ];

  constructor(private modal: NgbModal, private errorModal: NgbModal, private auth: AuthorizationService, private http: HttpService) { }

  ngOnInit() {
    this.showErrorMessage = false;
    this.appointment = new DTOAppointment();
    this.user = this.auth.currentUser();
    this.http.getPrivateCalendar(this.user.id)
    .subscribe(data => {
      this.userCalendar = data;
      this.userCalendar.appointments.forEach(element => {
        this.pushToLocalEventList(element, true);
      });
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

  pushToLocalEventList(appointment: DTOAppointment, yourEvent: boolean) {
    this.events.push({
      title: (yourEvent ? appointment.title : 'Private'),
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

  addPaticipantToEvent(user: SimpleUser, eventId: string, expertId: string): void {
    const appointmentIndex = this.events.findIndex(x => x.meta.id === eventId);
    this.http.addUserToAppointment(this.events[appointmentIndex].meta, expertId)
    .subscribe(() => {
      this.events[appointmentIndex].meta.participants.push(user);
    }, data => {
      this.errorMessage = data.error;
      this.errorModal.open(this.errorContent, { size: 'lg' });
    });
  }

  addEvent(): void {
    const simpleUser = new SimpleUser();
    simpleUser.firstName = this.user.firstName;
    simpleUser.lastName = this.user.lastName;
    simpleUser.email = this.user.email;

    const myAppointment = new DTOAppointment();
    myAppointment.title = this.appointment.title;
    myAppointment.text = this.appointment.text;
    myAppointment.participants.push(simpleUser);
    myAppointment.maxParticipants = this.appointment.maxParticipants,
    myAppointment.startTime = this.appointment.startTime;
    myAppointment.endTime = this.appointment.endTime;
    myAppointment.name = this.user.firstName + ' ' + this.user.lastName;
    myAppointment.creatorId = this.user.id;

    this.http.addAppointment(myAppointment)
    .subscribe(data => {
      myAppointment.id = data;
      this.pushToLocalEventList(myAppointment, true);
      this.appointment = new DTOAppointment();
    },
    data => {
      this.errorMessage = data.error.message;
      this.errorModal.open(this.errorContent, { size: 'lg' });
    });
  }
}
