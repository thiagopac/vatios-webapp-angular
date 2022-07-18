import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationExchangeComponent } from './operation-exchange.component';

describe('OperationExchangeComponent', () => {
  let component: OperationExchangeComponent;
  let fixture: ComponentFixture<OperationExchangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OperationExchangeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
