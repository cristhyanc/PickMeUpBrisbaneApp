
import { Component } from '@angular/core';
import { ErrorHandler } from '@angular/core';

export class AppErrorHandler implements ErrorHandler {

    handleError(error) {
        console.log(error);
        alert('Sorry, There is a technical problem, please try again');
    }
}
