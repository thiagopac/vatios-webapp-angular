import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConsumerUnitDialogComponent } from './consumer-unit-dialog.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('ConsumerUnitDialogComponent', () => {
  let component: ConsumerUnitDialogComponent;
  let fixture: ComponentFixture<ConsumerUnitDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsumerUnitDialogComponent],
      imports: [FormsModule, ReactiveFormsModule, RouterTestingModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {},
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
        HttpClient,
        HttpHandler,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsumerUnitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
