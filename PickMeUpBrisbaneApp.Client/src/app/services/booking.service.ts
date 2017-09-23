import { Observable } from 'rxjs/Rx';
import { BookTo } from '../Domain/BookTo';
import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { error } from 'util';
import { AppError } from '../services/app-error';
import { ValidationError } from '../services/app-validation-error';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

export class ServiceErrorMessage {
  ErrorMessage: string;
}


@Injectable()
export class BookingService {

private headers = new Headers({'Access-Control-Request-Method': '*',
'Content-Type' : 'application/json',
'Access-Control-Allow-Origin' : '*',
'Access-Control-Allow-Methods' : 'POST, PUT, DELETE, GET, OPTIONS',
'Access-Control-Allow-Headers' : 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
});

private url = 'http://localhost:64258/api/Booking';

  constructor(private http: Http) { }

  getLocations() {
    const finalUrl = this.url + '/locations';
    return this.http.get(finalUrl, {headers: this.headers })
    .map( response => response.json() )
    .catch(this.handleError);
  }

  getBookings() {
    const finalUrl = this.url + '/GetAllBookings';
    return this.http.get(finalUrl, {headers: this.headers })
    .map( response => response.json())
    .catch(this.handleError);
  }

  createBooking(newBook: BookTo) {
    const finalUrl = this.url + '/CreateBooking';
    return this.http.post(finalUrl, newBook, {headers: this.headers } )
    .catch(this.handleError);
  }

private handleError(error: Response) {
 if (error.status === 400) {

   console.log(error);
  const valiMessa = error.json();
  return Observable.throw(new ValidationError(valiMessa));
 }
   return Observable.throw(new AppError(error));
}

}
