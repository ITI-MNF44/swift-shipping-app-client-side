import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const deliveryManGaurdGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const role = localStorage.getItem('userRole');
  if (role == 'DeliveryMan') {
    return true;
  } else {
    router.navigate(['deliveryman/login']);
    return false;
  }
};
