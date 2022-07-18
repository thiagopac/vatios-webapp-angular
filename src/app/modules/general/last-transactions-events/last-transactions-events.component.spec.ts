import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastTransactionsEventsComponent } from './last-transactions-events.component';

describe('LastTransactionsEventsComponent', () => {
  let component: LastTransactionsEventsComponent;
  let fixture: ComponentFixture<LastTransactionsEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LastTransactionsEventsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LastTransactionsEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
