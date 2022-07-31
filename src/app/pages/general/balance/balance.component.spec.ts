import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BalanceComponent } from './balance.component';
import { PipesModule } from 'src/app/pipes/pipes.module';

describe('BalanceComponent', () => {
  let component: BalanceComponent;
  let fixture: ComponentFixture<BalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BalanceComponent],
      providers: [HttpClient, HttpHandler],
      imports: [RouterTestingModule, PipesModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
