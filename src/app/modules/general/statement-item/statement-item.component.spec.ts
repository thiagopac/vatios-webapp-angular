import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementItemComponent } from './statement-item.component';

describe('StatementItemComponent', () => {
  let component: StatementItemComponent;
  let fixture: ComponentFixture<StatementItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatementItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
