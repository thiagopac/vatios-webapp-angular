import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ManagementComponent } from './management.component';
import { NavComponent } from 'src/app/modules/management/layout/nav/nav.component';
import { HeaderComponent } from 'src/app/modules/management/layout/header/header.component';
import { FooterComponent } from 'src/app/modules/management/layout/footer/footer.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { PipesModule } from 'src/app/pipes/pipes.module';
import { ManagementHomeComponent } from 'src/app/modules/management/modules/management-home/management-home.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { ManagementTransactionsComponent } from 'src/app/modules/management/modules/management-transactions/management-transactions.component';
import { ManagementRoutingModule } from 'src/app/modules/management/management-routing.module';
import { ManagementUsersComponent } from 'src/app/modules/management/modules/management-users/management-users.component';
import { ManagementAdminsComponent } from 'src/app/modules/management/modules/management-admins/management-admins.component';

@NgModule({
  declarations: [
    ManagementComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    ManagementHomeComponent,
    ManagementTransactionsComponent,
    ManagementUsersComponent,
    ManagementAdminsComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatMenuModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    PipesModule,
    NgxSpinnerModule,
    ManagementRoutingModule,
  ],
  providers: [DatePipe],
})
export class ManagementModule {}
