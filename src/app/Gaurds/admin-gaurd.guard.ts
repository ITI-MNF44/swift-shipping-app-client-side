import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGaurdGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const role = localStorage.getItem('userRole');
  if (role == 'Admin') {
    return true;
  } else {
    router.navigate(['admin/login']);
    return false;
  }
};
