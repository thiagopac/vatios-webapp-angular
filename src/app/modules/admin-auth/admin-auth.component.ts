import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '<body[root]>',
  templateUrl: './admin-auth.component.html',
  styleUrls: ['./admin-auth.component.scss'],
})
export class AdminAuthComponent implements OnInit, OnDestroy {
  today: Date = new Date();

  constructor() {}

  ngOnInit(): void {
    document.body.classList.add('bg-white');
  }

  ngOnDestroy() {
    document.body.classList.remove('bg-white');
  }
}
