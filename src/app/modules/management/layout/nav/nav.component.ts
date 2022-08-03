import { Component, OnInit } from '@angular/core';
import { EnvironmentService } from 'src/app/services/environment.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  tokenHolderChartUrl: string;
  allUsersTransfersUrl: string;

  constructor(private environmentService: EnvironmentService) {
    this.tokenHolderChartUrl = this.environmentService.getTokenHolderChartUrl();
    this.allUsersTransfersUrl = this.environmentService.getTokenAllUsersTransfersUrl();
  }

  ngOnInit(): void {}

}
