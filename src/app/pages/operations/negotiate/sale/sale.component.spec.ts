import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { SaleComponent } from './sale.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('SaleComponent', () => {
  let component: SaleComponent;
  let fixture: ComponentFixture<SaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaleComponent],
      providers: [HttpClient, HttpHandler],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
