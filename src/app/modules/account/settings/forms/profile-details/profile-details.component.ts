import {
  UserService,
  InfoType,
} from './../../../../../services/user/user.service';
import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { NgSelectConfig } from '@ng-select/ng-select';
import { AlertMessageService } from 'src/app/services/alert-message.service';
import {
  CityType,
  LocationService,
  StateType,
} from 'src/app/services/location/location.service';
import { AsyncPipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, UserType } from 'src/app/modules/auth';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
})
export class ProfileDetailsComponent implements OnInit, OnDestroy {
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  private unsubscribe: Subscription[] = [];
  private sub: Subscription;

  fg: FormGroup;
  user: UserType;
  states$: Observable<StateType[]>;
  cities$: Observable<CityType[]>;

  constructor(
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private locationService: LocationService,
    private config: NgSelectConfig,
    private alertMessageService: AlertMessageService,
    private authService: AuthService,
    private asyncPipe: AsyncPipe,
    private userService: UserService
  ) {
    const loadingSubscr = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);

    this.config.notFoundText = 'Nenhum registro encontrado';
    this.config.appendTo = 'body';
  }

  ngOnInit(): void {
    this.user = this.asyncPipe.transform(
      this.authService.currentUserSubject.asObservable()
    )!;
    this.states$ = this.locationService.getStates();
    const state_id = this.user.info.city.state_id;
    this.cities$ = this.locationService.getCitiesByState(state_id);
    this.buildFormGroup();
    this.fg.patchValue({ state_id, ...this.user.info });
  }

  buildFormGroup() {
    this.fg = this.fb.group({
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      state_id: [null, [Validators.required]],
      city_id: [null, [Validators.required]],
    });
  }

  selectedState(event: any) {
    this.cities$ = this.locationService.getCitiesByState(event.letter);
  }

  saveSettings() {
    this.isLoading$.next(true);
    const filledInfo: InfoType = this.fg.value;

    this.sub = this.userService.updateInfo(filledInfo).subscribe(() => {
      this.alertMessageService.showToast(
        'Seus dados foram atualizados com sucesso!',
        'success'
      );
      this.isLoading$.next(false);
      this.cdr.detectChanges();
    });

    this.unsubscribe.push(this.sub);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
