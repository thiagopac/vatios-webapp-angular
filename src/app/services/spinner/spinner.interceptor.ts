import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SpinnerHandlerService } from './spinner-handler.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  constructor(public spinnerHandler: SpinnerHandlerService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.spinnerHandler.handleRequest('plus');
    return next.handle(request).pipe(finalize(this.finalize.bind(this)));
  }

  finalize = (): void => this.spinnerHandler.handleRequest();
}
