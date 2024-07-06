import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const sellerGaurdGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const role = localStorage.getItem('userRole');
  if (role == 'Seller') {
    return true;
  } else {
    router.navigate(['seller/login']);
    return false;
  }
};
