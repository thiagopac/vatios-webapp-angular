import { TestBed } from '@angular/core/testing';
import { SpinnerHandlerService } from './spinner-handler.service';

describe('SpinnerHandlerService', () => {
  let service: SpinnerHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnerHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('expects "handleRequest" to increment number of requests and pass state', () => {
    const state: string = 'plus';
    service.numberOfRequests = 0;
    spyOn(service.showSpinner, 'next').and.stub();

    service.handleRequest(state);
    expect(service.numberOfRequests).toEqual(1);
    expect(service.showSpinner.next).toHaveBeenCalledWith(true);
  });

  it('expects "handleRequest" to decrement number of requests and pass state', () => {
    const state: string = 'minus';
    service.numberOfRequests = 1;
    spyOn(service.showSpinner, 'next').and.stub();

    service.handleRequest(state);
    expect(service.numberOfRequests).toEqual(0);
    expect(service.showSpinner.next).toHaveBeenCalledWith(false);
  });

  it('expects "handleRequest" to decrement number of requests and pass state (use default)', () => {
    service.numberOfRequests = 1;
    spyOn(service.showSpinner, 'next').and.stub();

    service.handleRequest();
    expect(service.numberOfRequests).toEqual(0);
    expect(service.showSpinner.next).toHaveBeenCalledWith(false);
  });
});
