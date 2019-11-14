import { Observable, ObservableInput, throwError, from } from 'rxjs';
import { Injectable } from "@angular/core";
import { HttpHeaders, HttpInterceptor,
   HttpHandler, HttpRequest, HttpEvent,
    HttpErrorResponse } from "@angular/common/http";
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: "root"
})
export class KoreraInterceptor implements HttpInterceptor {


  constructor(private router: Router) {}

  handleError(error: HttpErrorResponse): ObservableInput<any> {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);

      if (error.status === 401) {
        console.log('You are not logged in or session timed out');
      }
    }

    return throwError(
      'Something bad happened; please try again later.');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('token')) {
      const header = new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      });
      const clone = req.clone({
        headers: header
      });
      return next.handle(clone);
    } else {
      return next.handle(req);
    }
  }
}
