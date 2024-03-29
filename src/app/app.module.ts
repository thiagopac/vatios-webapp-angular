import { SpinnerInterceptor } from './services/spinner/spinner.interceptor';
import { NgModule, APP_INITIALIZER, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClipboardModule } from 'ngx-clipboard';
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth';
import { NgxSpinnerModule } from 'ngx-spinner';
import { GlobalErrorHandlerService } from 'src/app/services/global-error-handler.service';
import { AdminAuthService } from 'src/app/services/admin-auth';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

function appInitializer(authService: AuthService) {
  return () => {
    return new Promise((resolve) => {
      // @ts-ignore
      authService.getUserByToken().subscribe().add(resolve);
    });
  };
}

function appInitializerAdmin(adminAuthService: AdminAuthService) {
  return () => {
    return new Promise((resolve) => {
      // @ts-ignore
      adminAuthService.getUserByToken().subscribe().add(resolve);
    });
  };
}

const config: SocketIoConfig = {
  url: environment.socketUrl,
  options: { transports: ['websocket'] },
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    HttpClientModule,
    ClipboardModule,
    AppRoutingModule,
    InlineSVGModule.forRoot(),
    NgbModule,
    NgxSpinnerModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthService],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerAdmin,
      multi: true,
      deps: [AdminAuthService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: SpinnerInterceptor,
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandlerService,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
