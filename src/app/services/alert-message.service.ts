import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertMessageService {
  toast: any;

  constructor() {
    this.toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 10000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });
  }

  showToast(message: string, icon: SweetAlertIcon) {
    this.toast.fire({
      icon: icon,
      title: message,
    });
  }

  showAlert(message: string, icon: SweetAlertIcon = 'info') {
    Swal.fire({
      text: message,
      icon: icon,
      confirmButtonText: 'OK',
      confirmButtonColor: '#31abcc',
    });
  }

  alertWithHandler(
    message: string,
    icon: SweetAlertIcon = 'question',
    handleConfirmation: Function
  ) {
    Swal.fire({
      text: message,
      icon: 'error',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sim',
      confirmButtonColor: '#31abcc',
    }).then((result) => {
      if (result.isConfirmed) handleConfirmation();
    });
  }
}
