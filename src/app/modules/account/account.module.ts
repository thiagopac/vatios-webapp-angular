import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg-2';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from '../account/account.component';
import { OverviewComponent } from './overview/overview.component';
import { SettingsComponent } from './settings/settings.component';
import { SecurityComponent } from './security/security.component';
import { ProfileDetailsComponent } from './settings/forms/profile-details/profile-details.component';
import { DeactivateAccountComponent } from './settings/forms/deactivate-account/deactivate-account.component';
import { EmailPreferencesComponent } from './settings/forms/email-preferences/email-preferences.component';
import { NotificationsComponent } from './settings/forms/notifications/notifications.component';
import { SignInMethodComponent } from './security/forms/sign-in-method/sign-in-method.component';
import { DropdownMenusModule } from '../../template/partials';
import { AccountBalanceComponent } from './account-balance/account-balance.component';

@NgModule({
  declarations: [
    AccountComponent,
    OverviewComponent,
    SettingsComponent,
    SecurityComponent,
    ProfileDetailsComponent,
    DeactivateAccountComponent,
    EmailPreferencesComponent,
    NotificationsComponent,
    SignInMethodComponent,
    AccountBalanceComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    InlineSVGModule,
    DropdownMenusModule,
    PipesModule,
  ],
})
export class AccountModule {}
