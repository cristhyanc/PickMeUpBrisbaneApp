import { ClientTo } from '../Domain/ClientTo';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-common-data',
  templateUrl: './common-data.component.html',
  styleUrls: ['./common-data.component.css']
})
export class CommonDataComponent implements OnInit {

Client: ClientTo;
Loggin: boolean;

  constructor() {
    this.Client = new ClientTo();
    this.Client.email = 'cristhyan@outlook.com';
    this.Client.fullName = 'Cristhyan Cardona Garcia';
    this.Client.phoneNumber = '0405593358';
    this.Client.id = 1;
   }

  ngOnInit() {
  }

}
