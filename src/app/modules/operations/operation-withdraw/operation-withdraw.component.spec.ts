import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationWithdrawComponent } from './widget-operation-withdraw.component';

describe('OperationWithdrawComponent', () => {
  let component: OperationWithdrawComponent;
  let fixture: ComponentFixture<OperationWithdrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OperationWithdrawComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationWithdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
