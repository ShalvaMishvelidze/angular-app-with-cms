import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CookieService } from '../services/cookie.service';

@Injectable()
export class InvalidTokenInterceptor implements HttpInterceptor {
  private router = inject(Router);
  private cookieService = inject(CookieService);

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(({ error: { error, code } }) => {
        const isInvalidToken = code === 'er1001';

        if (isInvalidToken) {
          this.cookieService.deleteCookie('token');
          this.cookieService.deleteCookie('user');
          this.router.navigate(['/login']);
        }

        return throwError(() => error);
      })
    );
  }
}
