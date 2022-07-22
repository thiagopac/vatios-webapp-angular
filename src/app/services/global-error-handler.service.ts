import {
  ApplicationRef,
  ChangeDetectorRef,
  ErrorHandler,
  Injectable,
  Injector,
  NgZone,
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { EnvironmentService } from './environment.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertMessageService } from './alert-message.service';
import {
  CODE_MISSING_AUTHORIZATION,
  CODE_TOKEN_INVALIDO,
} from '../constants/error-code';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandlerService extends ErrorHandler {
  // Mensagem padrao para erros no front
  static readonly DEFAULT_CLIENT_USER_MESSAGE: string =
    'Ocorreu um erro inesperado na aplicação';

  // Mensagem padrao para quando o erro do servidor nao tem mensagem
  static readonly DEFAULT_SERVER_USER_MESSAGE: string =
    'Ocorreu um erro ao acessar o servidor';
  static readonly DEFAULT_SERVER_VALIDATION_ERROR_USER_MESSAGE: string =
    'Erro de validação!';

  // Mensagem padrao para quando nao tem internet
  static readonly DEFAULT_SERVER_USER_MESSAGE_OFFLINE: string =
    'Falha na conexão. Verifique seu acesso à internet!';

  static previousError: string = '';
  static previousErrorCount: number = 0;

  // Erro completo convertido para string.
  private _jsonError: string;

  // Mensagem que mostramos para o usuario na tela
  private _userMessage: string;

  // Mensagem que veio do erro (erro de servidor ou de front), essa e o Error.message
  private _errorMessage: string;

  // Stack que veio do erro (erro de servidor ou de front), eh stacktrace do erro
  private _errorStack: string | null;

  // Codigo do erro (para erro do response do servidor)
  private _errorCode: string | null;

  // O tipo do erro que veio (TypeError, RangeError, Excecao do Java que veio do server, etc)
  private _errorName: string | null;

  // O nome do erro que nos tratamos no handleError (erro de response, erro de cliente, erro de observable...)
  private _errorType: string;

  // Por padrao mostra um toast/alert com o erro, mas para alguns erros, marca true para mostrar dialog
  private _showDialog: boolean = false;

  constructor(private injector: Injector) {
    super();
  }

  handleError(error: any) {
    try {
      this._handleError(error);
    } catch (e) {}
  }

  private _handleError(error: any) {
    // Comeca como false, se algum tipo de erro for mostrar o dialog, seta como true
    this._showDialog = false;

    if (error != null) {
      // Salvo o JSON do erro completo
      this.convertJsonError(error);

      // Verifico se eh um erro de uma Promise
      // Esse erro vem no formato error = {promise: Object, rejection: Error, task: Object, zone: Object, message: string, stack: string}
      // Se for o erro da promise, eu pego somente o 'rejection' que eh o objeto que contem o Error
      // Caso contrario, ja eh um objeto do tipo Error
      if (error.rejection) {
        error = error.rejection;
      }

      if (error instanceof HttpErrorResponse) {
        this.handleServerHttpErrorResponse(error);
      } else if (error instanceof Response) {
        // Erro de servidor {status, statusText, type, url, _body = {code, message} }
        this.handleServerErrorResponse(error);
      } else if (error instanceof ErrorEvent) {
        this.handleObservableError(error);
      } else if (error instanceof DOMException) {
        this.handleWebApiError(error);
      } else {
        // A client-side or network error occurred.
        this.handleClientError(error);
      }
    }

    this.checkDevErrors(error);
    this.showUserErrorMessage();
    this.consoleLogError(error);
    this.appTick();
  }

  private convertJsonError(error: any) {
    try {
      // Se o erro nao tem a funcao toJson, entao da o stringify nas propriedades do primeiro nivel
      // Por exemplo, se for um Error, vai ter somente message e stack
      this._jsonError =
        error != null && error.toJson
          ? JSON.stringify(error)
          : JSON.stringify(error, Object.getOwnPropertyNames(error));
    } catch (e: any) {
      this._jsonError =
        'Nao foi possivel converter "error" para JSON string.' +
        '\nerror.toString(): ' +
        error.toString() +
        '\nstringify.exception.toString(): ' +
        e.toString();
    }
  }

  private parseToJSON(str: string) {
    try {
      return JSON.parse(str);
    } catch {
      return str;
    }
  }

  private checkDevErrors(error: any) {
    const env = this.injector.get(EnvironmentService);
    if (env.isCurrentDev()) {
      // Trata o erro para evitar loop infinito no desenvolvimento
      const currentError =
        this._errorType +
        this._errorName +
        this._userMessage +
        this._errorMessage +
        this._errorCode;
      if (currentError === GlobalErrorHandlerService.previousError) {
        // Se for o mesmo erro, incrementa a quantidade de vezes que aconteceu
        GlobalErrorHandlerService.previousErrorCount++;
        // Se aconteceu o mesmo erro 5 ou mais vezes, entao tem que parar de atualizar a tela
        if (GlobalErrorHandlerService.previousErrorCount > 9) {
          // O ideal era dar um changedetectorref.detach, mas isso nao funcionou
          const debugCtx = error['ngDebugContext'];
          const changeDetectorRef =
            debugCtx && debugCtx.injector.get(ChangeDetectorRef);
          if (changeDetectorRef) {
            changeDetectorRef.context.destroy();
          }
        }
      } else {
        // Se for um erro diferente, zera o contador
        GlobalErrorHandlerService.previousErrorCount = 0;
      }
      GlobalErrorHandlerService.previousError = currentError;
    }
  }

  private handleServerHttpErrorResponse(httpErrorResponse: HttpErrorResponse) {
    const httpError = httpErrorResponse || ({ error: {} } as any);
    if (typeof httpError.error === 'string') {
      // httpError.error = this.parseToJSON(httpError.error);
    }
    const extraErrorMsgs =
      (httpError.message != null
        ? '\nHttpErrorResponse.message: ' + httpError.message
        : '') +
      (httpError.ok != null ? '\nHttpErrorResponse.ok: ' + httpError.ok : '') +
      (httpError.status != null
        ? '\nHttpErrorResponse.status: ' + httpError.status
        : '') +
      (httpError.statusText != null
        ? '\nHttpErrorResponse.statusText: ' + httpError.statusText
        : '') +
      (httpError.url != null
        ? '\nHttpErrorResponse.url: ' + httpError.url
        : '');

    this.handleServerError(
      httpError,
      httpError.error.message,
      httpError.message,
      httpError.status,
      httpError.error.path,
      httpError.error.timestamp,
      httpError.error.code,
      httpError.name,
      httpError.error.error_stack || httpError.error.errorStack,
      httpError.error.errors,
      extraErrorMsgs
    );
  }

  private handleServerErrorResponse(responseError: Response) {
    let body; // json
    try {
      body = responseError.json();
    } catch (err) {
      // pode vir um xml em vez de json
      body = {
        error: responseError['body'],
        status: responseError.status,
      };
    }
    this.handleServerError(responseError);
    // if (body != null) {
    //   this.handleServerError(
    //     responseError,
    //     body.message,
    //     body.error,
    //     body.status,
    //     body.path,
    //     body.timestamp,
    //     body.code,
    //     body.error_name,
    //     body.error_stack,
    //     body.errors
    //   );
    // } else {
    //   this.handleServerError(responseError);
    // }
  }

  private handleServerError(
    httpError: HttpErrorResponse | Response,
    message?: string | undefined,
    error?: string | undefined,
    status?: string | number | undefined,
    path?: string | undefined,
    timestamp?: string | undefined,
    code?: string | undefined,
    error_name?: string | undefined,
    error_stack?: string | undefined,
    errors?: string | any[] | null | undefined,
    extraErrosMessage?: string | undefined
  ) {
    this._errorType = 'Server Error';

    this._userMessage = GlobalErrorHandlerService.DEFAULT_SERVER_USER_MESSAGE;

    let serverMessage = message ? message : null;
    let errStr =
      (message ? 'message: ' + message : '') +
      (error ? '\nerror: ' + error : '') +
      (status ? '\nstatus: ' + status : '') +
      (path ? '\npath: ' + path : '') +
      (timestamp ? '\ntimestamp: ' + timestamp : '') +
      (code ? '\ncode: ' + code : '') +
      (error_name ? '\nerror_name: ' + error_name : '') +
      (error_stack ? '\nerror_stack: ' + error_stack : '') +
      (extraErrosMessage ? extraErrosMessage : '');

    this._errorCode = code ? code : null;
    this._errorName = error_name ? error_name : null;
    this._errorStack = error_stack ? error_stack : null;

    this._errorMessage =
      'status: ' +
      httpError.status +
      '\nstatusText: ' +
      httpError.statusText +
      '\nurl: ' +
      httpError.url +
      (errStr != null ? '\n' + errStr : '');

    // Trata os erros de validacao do spring
    if (errors != null && errors.length > 0) {
      const errorsJson = this.convertJsonServerErrors(errors);
      errStr += '\nerrors_array: ' + errorsJson;

      // Quando vem uma lista de errors, considero eles como o serverMessage
      let errorsDefaultMessage = '';
      for (const err of errors) {
        errorsDefaultMessage +=
          '\n' +
          err.objectName +
          '.' +
          err.field +
          ' => ' +
          err.defaultMessage +
          ';';
      }
      this._errorMessage += '\nValidações:' + errorsDefaultMessage;

      serverMessage =
        GlobalErrorHandlerService.DEFAULT_SERVER_VALIDATION_ERROR_USER_MESSAGE;
    }

    if (serverMessage != null) {
      this._userMessage = serverMessage;
    }

    if (status === 401) {
      this._showDialog = true;
      if (this._errorCode === CODE_TOKEN_INVALIDO) {
        this._userMessage = 'Sessão Expirada! Por favor, faça login novamente.';
      } else if (this._errorCode === CODE_MISSING_AUTHORIZATION) {
        this._userMessage =
          'É necessário fazer login para acessar a plataforma.';
      } else {
        this._userMessage = 'Sessão Expirada! Por favor, faça login novamente.';
      }
    }

    // Se esta sem conexao com a internet, entao mudo a mensagem de erro.
    if (!navigator.onLine) {
      this._userMessage =
        GlobalErrorHandlerService.DEFAULT_SERVER_USER_MESSAGE_OFFLINE;
    }
  }

  private convertJsonServerErrors(errors: any): string {
    let errorsJson = null;
    try {
      errorsJson = JSON.stringify(errors);
    } catch (e: any) {
      errorsJson =
        'Nao foi possivel converter "errors list" para JSON string.' +
        '\nbody.errors.toString(): ' +
        errors.toString() +
        '\nstringify.exception.toString(): ' +
        e.toString();
    }
    return errorsJson;
  }

  private handleWebApiError(error: DOMException) {
    this._errorType = 'Web API Error (DOMException)';

    this._userMessage = GlobalErrorHandlerService.DEFAULT_CLIENT_USER_MESSAGE;

    this._errorStack = error.toString();
    this._errorMessage = error.message;
    this._errorCode = error.code.toString();
    this._errorName = error.name;
  }

  /**
   * Trata dos erros que acontecem no front.
   */
  private handleClientError(error: any) {
    this._errorType = 'Client Error';

    // Para erro de front, nao eh bom mostrar o error.message para o usuario, pois os erros sao em ingles e especificos do codigo
    // Entao mostro uma mensagem padrao
    this._userMessage = GlobalErrorHandlerService.DEFAULT_CLIENT_USER_MESSAGE;

    // Um Error deve vir no formato error = {message: string, stack: string}
    // Se nao tiver o message, entao nao eh um tipo Error e nao eh tratado (erro desconhecido)
    // Se for string, provevelmente veio de um rejection de uma promise
    if (typeof error === 'string') {
      this._errorMessage = error;
    } else {
      this._errorMessage =
        error.message ||
        error.rejection ||
        'Erro nao tratado. Valor "error.message" esta nulo';
    }

    this._errorStack = error.stack;
    this._errorCode = error.code;
    this._errorName = error.name;
  }

  private handleObservableError(error: any) {
    this._errorType = 'Observable Error';
    this._userMessage = error.error;
    this._errorMessage = 'ErrorObservable: ' + error.error;
    this._errorName = 'ErrorObservable';
    this._errorStack = null;
    this._errorCode = null;
  }

  private showUserErrorMessage() {
    const spinner = this.injector.get(NgxSpinnerService);
    // Dismiss loading pra garantir, pois provavelmente foi chamado antes do erro
    spinner.hide();

    const messages = this.injector.get(AlertMessageService);
    // Se for token invalido, devo deslogar antes de mostrar o erro
    if (this._errorCode === CODE_TOKEN_INVALIDO) {
      // Se foi token invalido, tenho que deslogar e redirecionar para login
      const auth = this.injector.get(AuthService);
      auth.logout();
    }

    const zone = this.injector.get(NgZone);
    zone.run(() => {
      // Mostra mensagem de erro
      if (this._showDialog) {
        messages.showAlert(this._userMessage, 'warning');
      } else {
        messages.showAlert(this._userMessage, 'warning');
      }
    });
  }

  private consoleLogError(error: any) {
    const env = this.injector.get(EnvironmentService);
    if (env.isCurrentDev()) {
      // Console log
      console.log('>>>>> GlobalErrorHandler');

      console.error('_userMessage: ' + this._userMessage);
      console.error('_errorMessage": ' + this._errorMessage);
      console.error('_errorStack": ' + this._errorStack);
      console.error('_errorCode": ' + this._errorCode);
      console.error('_errorName": ' + this._errorName);
      console.error('_errorType": ' + this._errorType);
      console.error('_jsonError": ' + this._jsonError);

      super.handleError(error);

      console.log('<<<<< GlobalErrorHandler');
    }
  }

  private appTick() {
    const appref = this.injector.get(ApplicationRef);
    if (appref != null) {
      setTimeout(() => {
        appref.tick();
      }, 50);
    }
  }
}
