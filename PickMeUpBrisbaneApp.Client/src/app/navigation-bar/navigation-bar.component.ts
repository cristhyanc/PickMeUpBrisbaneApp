import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { CommonDataService } from '../services/common-data.service';
import { ClientTo } from '../Domain/ClientTo';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements  OnDestroy  {

  loggedUser: ClientTo;
  isLoggedin: boolean;
  subscription: EventEmitter<any>;
  constructor(private common: CommonDataService) {
    this.subscription = common.loginChange.subscribe((value) => {
      this.loggedUser = value;
      this.isLoggedin = true;
    });

   }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
