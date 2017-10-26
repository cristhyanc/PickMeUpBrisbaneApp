import { CommonDataService } from '../services/common-data.service';
import { BookingService } from '../services/booking.service';
import { ClientTo } from '../Domain/ClientTo';
import { Component, OnInit } from '@angular/core';
import { FacebookService, LoginResponse, InitParams } from 'ngx-facebook';
import { AppError } from '../services/app-error';
import { ValidationError } from '../services/app-validation-error';
import {Router} from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

isBusy: Boolean = false;
client: ClientTo;
isNotRegistered: Boolean = false;
isServerError: boolean;
serverErrorMessage: string;

  constructor(private fb: FacebookService, private bookService: BookingService, private common: CommonDataService, public _router: Router) {

    if (common.Client.id > 0 ) {
      if (common.Client.email === '') {
        this.isNotRegistered = true ;
      }
    }
   }

  loginWithFacebook(): void {

       this.fb.login()
         .then((response: LoginResponse) => {
            console.log(response);
            this.getProfileFromFacebook();
         })
         .catch((error: any) => console.error(error));

  }

  ngOnInit() {
    const initParams: InitParams = {
      appId: '285392718623470',
      xfbml: true,
      version: 'v2.8'
    };

    this.fb.init(initParams);
    this.client = new ClientTo();
  }

  getProfileFromFacebook() {
    this.fb.api('/me')
      .then((res: any) => {
        this.common.Client  = res;
        console.log('Got the users profile', this.common.Client);
         this.getProfileServer();
      })
      .catch((error: any) => console.error(error));
  }

  getProfileServer() {
    this.isBusy = true;
    this.bookService.getClientDetails(this.common.Client.id)
    .subscribe(clientServer => {
      if (clientServer != null) {
        this.common.ChangeLogin(clientServer, true);
      }else {
        this.isNotRegistered = true;
      }
      this.isBusy = false;
    });
  }

  SaveNewClient(formVal, isValid): void {
console.log(this.client);
  this.client.id = this.common.Client.id;
  this.serverErrorMessage = '';
  this.isServerError = false;
        if (!isValid) {
          return;
        }
        this.isBusy = true;
        this.bookService.createUser(this.client)
        .subscribe(Response => {
          this.common.ChangeLogin(this.client, true);
          this._router.navigate(['./Booking']);
          this.isBusy = false;
        },
        (error: AppError) => {
          console.log(error);
          this.isBusy = false;
          if (error instanceof ValidationError) {
            this.serverErrorMessage = error.ValidationMessage;
            this.isServerError = true;
          } else {
            throw error;
          }
          this.isBusy = false;
        //  this.refresh.next();
        });

}


}
