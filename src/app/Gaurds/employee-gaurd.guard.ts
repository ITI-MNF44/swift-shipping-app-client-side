import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const employeeGaurdGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const role = localStorage.getItem('userRole');
  if (role == 'Employee') {
    return true;
  } else {
    router.navigate(['employee/login']);
    return false;
  }
};
