import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerUnitDialogComponent } from './consumer-unit-dialog.component';

describe('ConsumerUnitDialogComponent', () => {
  let component: ConsumerUnitDialogComponent;
  let fixture: ComponentFixture<ConsumerUnitDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsumerUnitDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsumerUnitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
