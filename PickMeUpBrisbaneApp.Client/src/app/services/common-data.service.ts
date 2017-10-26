import { Injectable } from '@angular/core';
import { ClientTo } from '../Domain/ClientTo';
import { Component, OnInit, EventEmitter } from '@angular/core';

@Injectable()
export class CommonDataService {

    Client: ClientTo;
    Loggin: boolean;
    loginChange: EventEmitter<any> = new EventEmitter();
      constructor() {
        this.Client = new ClientTo();
        this.Client.email = '';
        this.Client.name = '';
        this.Client.phoneNumber = '';
        this.Client.id = -1;
        this.Loggin = false;
       }

   public ChangeLogin(logged: ClientTo, isLogin: boolean ) {
      this.Client = logged;
      this.Loggin = isLogin;
      this.loginChange.emit(this.Client);
    }
  }
