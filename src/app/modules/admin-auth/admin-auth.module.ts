import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminAuthRoutingModule } from './admin-auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AdminAuthComponent } from './admin-auth.component';
import { TranslationModule } from '../i18n/translation.module';

@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    AdminAuthComponent,
  ],
  imports: [
    CommonModule,
    TranslationModule,
    AdminAuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class AdminAuthModule {}
