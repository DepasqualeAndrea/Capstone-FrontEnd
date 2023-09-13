import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, switchMap, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authSrv: AuthService) {}

  newReq! : HttpRequest<any>;

  /*intercept(
      request: HttpRequest<unknown>,
      next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
      return this.authSrv.user$.pipe(take(1), switchMap(user => {
          if (!user) {
              console.log(request);
              console.log(this.newReq);
              return next.handle(request);
          }

          this.newReq = request.clone({
              headers: request.headers.set('Authorization', `Bearer ${user.accessToken}`)
          });
          console.log(user.accessToken);

          console.log(request);
          console.log(this.newReq);
          return next.handle(this.newReq);
      }));
  }*/

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.authSrv.getToken();
    if (token) {
      const authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}
