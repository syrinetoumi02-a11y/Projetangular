import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AdminService } from '../services/admin';

export const adminGuard: CanActivateFn = () => {

  const adminService = inject(AdminService);
  const router = inject(Router);

  if (adminService.isLoggedIn()) {
    return true;
  }

  router.navigate(['/admin']);
  return false;
};