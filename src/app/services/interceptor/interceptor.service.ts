import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from '../loader/loader.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  constructor(private loaderService: LoaderService, public router: Router) { }
  intercept<T>(
    request: HttpRequest<T>,
    next: HttpHandler
  ): Observable<HttpEvent<T>> {
    this.loaderService.startLoad();
    return next.handle(request).pipe(
      catchError((err) => {
        this.loaderService.stopLoad();
        throw err;
      })
    );
  }
}
