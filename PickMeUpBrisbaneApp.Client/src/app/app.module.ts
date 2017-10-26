import { AppErrorHandler } from './services/app-error-handler';
import { CommonDataService } from './services/common-data.service';
import { MdProgressBarModule } from '@angular/material';
import { ErrorHandler } from '@angular/core';
import { BookingService } from './services/booking.service';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AlertModule } from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RouterModule, Routes } from '@angular/router';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { LogInComponent } from './log-in/log-in.component';
import { BookingServiceComponent } from './booking-service/booking-service.component';
import { HomeComponent } from './home/home.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { CalendarModule } from 'angular-calendar';
import { AppComponent } from './app.component';
import { CalendarutilComponent } from './CalendarUtil/calendarutil.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NgbDatepickerModule,
  NgbTimepickerModule,
  NgbModalModule,
  NgbModule
} from '@ng-bootstrap/ng-bootstrap';
import { DateTimePickerComponent } from './date-time-picker/date-time-picker.component';
import { Ng2CompleterModule } from 'ng2-completer';
import { FacebookModule } from 'ngx-facebook';

const appRoutes: Routes = [
  { path: 'Booking',      component: BookingServiceComponent,  },
  { path: 'Booking/:bookId', component: BookingServiceComponent,  },
  { path: 'Login',    component: LogInComponent,  },
  { path: 'Home',    component: HomeComponent,  },
  { path: '',   redirectTo: '/Home',   pathMatch: 'full' },
  { path: '**', component: NotFoundPageComponent, }
];


@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    LogInComponent,
    BookingServiceComponent,
    HomeComponent,
    NotFoundPageComponent,
    CalendarutilComponent,
    DateTimePickerComponent
  ],
  imports: [
    NgbModule.forRoot(),
    NgbModalModule.forRoot(),
    FacebookModule.forRoot(),
    FormsModule,
    MdProgressBarModule,
    CommonModule,
    NoopAnimationsModule,
    HttpModule,
    Ng2CompleterModule,
    NgbDatepickerModule.forRoot(),
    NgbTimepickerModule.forRoot(),
    BrowserModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    CalendarModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
    )
  ],
  providers: [
    BookingService,
    CommonDataService,
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ],
  bootstrap: [AppComponent],
  exports: [CalendarutilComponent, DateTimePickerComponent, RouterModule]
})



export class AppModule {

  constructor() {  }


 }
