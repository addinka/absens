import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  
    handleError(err: any): void {
        const chunkFailedMessage = /Loading chunk [\d]+ failed/;
        console.log(err);
        console.log('handle error message: ', err.message);
        if (chunkFailedMessage.test(err.message)) {
            window.location.reload();
        }
    }
}