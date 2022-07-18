import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslationService } from './modules/i18n';
// language list
import { locale as ptBRLang } from './modules/i18n/vocabs/pt-br';
import { locale as enLang } from './modules/i18n/vocabs/en';

// spinner service
import { SpinnerHandlerService } from 'src/app/services/spinner-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'body[root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(
    private translationService: TranslationService,
    public spinnerHandler: SpinnerHandlerService,
    private spinner: NgxSpinnerService
  ) {
    // register translations
    this.translationService.loadTranslations(ptBRLang, enLang);

    this.spinnerHandler.showSpinner.subscribe(this.showSpinner.bind(this));
  }

  ngOnInit() {}

  showSpinner = (state: boolean): void => {
    state === true ? this.spinner.show() : this.spinner.hide();
  };
}
