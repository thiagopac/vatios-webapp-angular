import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementCellComponent } from './statement-cell.component';

describe('StatementCellComponent', () => {
  let component: StatementCellComponent;
  let fixture: ComponentFixture<StatementCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatementCellComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
