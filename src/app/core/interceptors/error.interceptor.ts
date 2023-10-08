import { DialogComponent } from './../../shared/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    public dialog: MatDialog
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            errorMsg = `Error: ${error.error.message}`;
          }
          else {
            if (error.status === 400) {
              errorMsg = 'Ett fel har uppstått med datakällan, vänligen försök igen!';
            } else if (error.status === 500) {
              errorMsg = 'Ett serverfel har uppstått, kontakta support för mer information!';
            } else if (error.status === 404) {
              errorMsg = 'Resurserna som du försöker nå finns inte!';
            } else if (error.status === 403) {
              errorMsg = 'Du har inte behörighet att utföra denna handling!';
            } else if (error.status === 401) {
              errorMsg = 'Du saknar rätt behörighet!';
            } else {
              errorMsg = 'Ett oväntat fel har uppstått!';
            }
            this.dialog.open(DialogComponent, {
              data: errorMsg
            });
          }
          return throwError(() => errorMsg);
        })
      )
  }
}
