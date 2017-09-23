import { ValidationError } from '../services/app-validation-error';
import { AppError } from '../services/app-error';
import { concat } from 'rxjs/operator/concat';
import { forEach } from '@angular/router/src/utils/collection';
import { error } from 'util';
import { CommonDataComponent } from '../common-data/common-data.component';
import { ClientTo } from '../Domain/ClientTo';
import { BookingService, ServiceErrorMessage } from '../services/booking.service';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  setDay,
  setHours,
  getDay,
  setSeconds,
  getDate,
  getMonth,
  getYear,
  setMinutes,
  setDate,
  isSameDay,
  isSameMonth,
  addHours,
  addMinutes
} from 'date-fns';
import { Subject } from 'rxjs/Subject';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';

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
import { BookTo } from '../Domain/BookTo';
import { LocationTo } from '../Domain/LocationTo';
import { CompleterService, CompleterData } from 'ng2-completer';

@Component({
  selector: 'app-booking-service',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './booking-service.component.html',
  styleUrls: ['./booking-service.component.css']
})


export class BookingServiceComponent implements OnInit {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  isBusy: Boolean = false;
  view: String = 'month';
  bookTime = {hour: 0, minute: 0};
  viewDate: Date = new Date();
  modalData: {
    action: string;
    book: BookTo;
    isError: boolean;
    errorMessage: string;
  };
  closeResult: string;
  refresh: Subject<any> = new Subject();
  modalReference: any;
  events: CalendarEvent[] = [];
  activeDayIsOpen: Boolean = true;
  locations: LocationTo[];
  isServerError: boolean;
  serverErrorMessage: string;
  isLoadingLocations = false;
  isLoadingBookings = false;
  protected dataService: CompleterData;

  constructor(private modal: NgbModal, private bookService: BookingService,
    private completerService: CompleterService, private common: CommonDataComponent) {

  }

  ngOnInit() {
    this.isBusy = true;
    this.isLoadingLocations = true;
    this.bookService.getLocations()
    .subscribe(locationsList => {
      this.locations = locationsList;
      this.dataService =  this.completerService.local(this.locations, 'name,postCode', 'name');
      this.isLoadingLocations = false;
      this.FinishInitialLoadings();
    });

    this.bookService.getBookings()
    .subscribe(bookingList => {
      this.InitialBookings(bookingList);
      this.isLoadingBookings = false;
      this.FinishInitialLoadings();
    });
  }

  private FinishInitialLoadings() {
    if (!this.isLoadingBookings && !this.isLoadingLocations) {
      this.isBusy = false;
      this.refresh.next();
    }
  }


  InitialBookings(bookings: BookTo[]) {

    let currentBook: BookTo;
    for (let _i = 0; _i < bookings.length; _i++) {

      currentBook = bookings[_i];
      let colorEvent = colors.blue;

      if ( currentBook.shareRide) {
          colorEvent = colors.yellow;
      }

      const newEvent: CalendarEvent = {
        title: currentBook.title,
        start: startOfDay(currentBook.pickupDate),
        end: startOfDay(currentBook.pickupDate),
        color: colorEvent,
        meta: currentBook,
        draggable: false,
        resizable: {
            beforeStart: false,
            afterEnd: false
          }
        };
        this.events.push(newEvent);
        this.refresh.next();
    }

  }


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
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
    let newBook: BookTo = new BookTo();
    if (action === 'EditEvent') {
      newBook = event.meta;
    }
    this.openModalWindows(action, newBook);
  }


  SaveNewEvent(formVal, isValid): void {

    if (!isValid) {
      return;
    }
  const newBook: BookTo = this.modalData.book;
  newBook.title = 'Pick up on ' + newBook.pickupDate;
  let colorEvent = colors.blue;

  if ( newBook.shareRide) {
    newBook.title = '!! Shared Ride on ' + newBook.pickupDate;
    colorEvent = colors.yellow;
  }
  newBook.client.id = 1;
  const newEvent: CalendarEvent = {
    title:  newBook.title,
    start: newBook.pickupDate,
    end: newBook.pickupDate,
    color: colorEvent,
    meta: newBook,
    draggable: false,
    resizable: {
        beforeStart: false,
        afterEnd: false
      }};

    if (this.modalData.action.match('newEvent')) {
      this.isBusy = true;
      this.bookService.createBooking(newBook)
      .subscribe(Response => {
        this.events.push(newEvent);
        this.modalReference.close();
        this.isBusy = false;
        this.refresh.next();
      },
      (error: AppError) => {
        console.log(error);
        if (error instanceof ValidationError) {
          this.serverErrorMessage = error.ValidationMessage;
          this.isServerError = true;
        } else {
          throw error;
        }
        this.isBusy = false;
        this.refresh.next();
      });
    }
  }


  addEvent(): void {
    const newBook: BookTo = new BookTo();
    newBook.client = this.common.Client;
    newBook.pickupDate = startOfDay(Date.now());
    newBook.shareRide = false;
    const action = 'newEvent';
    this.openModalWindows(action, newBook);
    this.refresh.next();
  }

  openModalWindows(action: string, book: BookTo): void {
    this.isServerError = false;
    this.serverErrorMessage = '';
    this.modalData = { action, book, isError: true, errorMessage: '' };
    this.modalReference = this.modal.open(this.modalContent, { size: 'lg' });
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
        this.closeResult = `Dismissed`;
    });
  }

}
