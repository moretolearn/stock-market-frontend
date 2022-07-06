import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StockmarketService } from '../services/stockmarket.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let sm = this.injector.get(StockmarketService);
    let requestToken = request;
    if(sm.getToken()!=''){
      console.log("in")
      requestToken = request.clone(
        {
        setHeaders: {
          Authorization: 'Bearer ' + sm.getToken()
        }
      });
    }
    return next.handle(requestToken);
  }
}
