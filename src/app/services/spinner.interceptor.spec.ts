import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { SpinnerInterceptor } from './spinner.interceptor';

import { SpinnerHandlerService } from './spinner-handler.service';

describe('SpinnerInterceptorInterceptor', () => {
  let service: SpinnerInterceptor;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [SpinnerInterceptor, SpinnerHandlerService],
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(SpinnerInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('expects "intercept" to fire handleRequest', (done: DoneFn) => {
    const handler: any = {
      handle: () => {
        return of(true);
      },
    };
    const request: any = {
      urlWithParams: '/api',
      clone: () => {
        return {};
      },
    };
    spyOn(service.spinnerHandler, 'handleRequest').and.stub();

    service.intercept(request, handler).subscribe((response) => {
      expect(response).toBeTruthy();
      expect(service.spinnerHandler.handleRequest).toHaveBeenCalled();
      done();
    });
  });

  it('expects "finalize" to fire handleRequest', () => {
    spyOn(service.spinnerHandler, 'handleRequest').and.stub();

    service.finalize();
    expect(service.spinnerHandler.handleRequest).toHaveBeenCalled();
  });
});
