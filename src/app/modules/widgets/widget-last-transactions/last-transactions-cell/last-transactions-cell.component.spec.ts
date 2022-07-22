import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastTransactionsCellComponent } from './last-transactions-cell.component';

describe('LastTransactionsCellComponent', () => {
  let component: LastTransactionsCellComponent;
  let fixture: ComponentFixture<LastTransactionsCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LastTransactionsCellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LastTransactionsCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
