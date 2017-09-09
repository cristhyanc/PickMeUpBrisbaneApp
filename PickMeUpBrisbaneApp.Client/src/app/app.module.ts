import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { LogInComponent } from './log-in/log-in.component';
import { BookingServiceComponent } from './booking-service/booking-service.component';
import { HomeComponent } from './home/home.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    LogInComponent,
    BookingServiceComponent,
    HomeComponent,
    NotFoundPageComponent
  ],
  imports: [
    BrowserModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    AppRoutingModule,
     BrowserAnimationsModule,
    CalendarModule.forRoot(),
      RouterModule.forRoot([
      { path: '', redirectTo: 'Home', pathMatch: 'full' },
      { path: 'Home', component: HomeComponent},
      { path: 'Login', component: LogInComponent},
      { path: 'booking', component: BookingServiceComponent},
      { path: 'booking/:bookId', component: BookingServiceComponent},
      { path: '**', component: NotFoundPageComponent}

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
