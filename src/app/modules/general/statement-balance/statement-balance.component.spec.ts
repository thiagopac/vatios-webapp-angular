import { PipesModule } from './../../../pipes/pipes.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementBalanceComponent } from './statement-balance.component';

describe('StatementBalanceComponent', () => {
  let component: StatementBalanceComponent;
  let fixture: ComponentFixture<StatementBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatementBalanceComponent],
      imports: [PipesModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
