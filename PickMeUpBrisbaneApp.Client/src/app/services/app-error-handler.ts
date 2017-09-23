import { ErrorHandler } from '@angular/core';
export class AppErrorHandler implements ErrorHandler {

    handleError(error) {
        alert('Sorry, There is a technical problem, please try again');
    }
}
