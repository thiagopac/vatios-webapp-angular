import { EnvironmentService } from 'src/app/services/environment.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService, UserType } from 'src/app/modules/auth';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
})
export class OverviewComponent implements OnInit {
  user: UserType;
  tokenUserTransfersUrl: string;

  constructor(
    private auth: AuthService,
    private environmentService: EnvironmentService,
    protected asyncPipe: AsyncPipe
  ) {}

  ngOnInit(): void {
    this.user = this.asyncPipe.transform(
      this.auth.currentUserSubject.asObservable()
    )!;
    this.tokenUserTransfersUrl =
      this.environmentService.getTokenUserTransfersUrl(
        this.user.info.wallet_address
      );
  }
}
