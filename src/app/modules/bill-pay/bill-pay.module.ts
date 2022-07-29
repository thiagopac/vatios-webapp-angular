import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { WizardComponent } from './wizard/wizard.component';
import { BillPayRoutingModule } from './bill-pay-routing.module';
import { BillPayComponent } from './bill-pay.component';
import { Step1Component } from './steps/step1/step1.component';
import { Step2Component } from './steps/step2/step2.component';
import { Step3Component } from './steps/step3/step3.component';
import { Step4Component } from './steps/step4/step4.component';
import { Step5Component } from './steps/step5/step5.component';
import { Step6Component } from './steps/step6/step6.component';
import { NgxMaskModule } from 'ngx-mask';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  declarations: [
    WizardComponent,
    BillPayComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    Step4Component,
    Step5Component,
    Step6Component,
  ],
  imports: [
    CommonModule,
    BillPayRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    InlineSVGModule,
    NgbTooltipModule,
    NgxMaskModule.forRoot(),
    PipesModule
  ],
})
export class BillPayModule {}
