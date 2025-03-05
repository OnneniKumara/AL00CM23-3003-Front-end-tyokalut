import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {SessionManagementService} from '../services/session-management.service';
import {PopUpService} from '../services/pop-up.service';

export const authGuard: CanActivateFn = (route, state) => {

  // Palvelut

  // SessionManagementService
  const sessionService = inject(SessionManagementService);

  const router = inject(Router);

  // PopUpService
  const popUpService = inject(PopUpService);

  if (!sessionService.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  if (sessionService.isAuthenticated()) {
    const currentTime = new Date().getTime() / 1000;
    const expiresAt = Number(sessionService.getExpiration());

    if (currentTime > expiresAt) {
      sessionService.endSession();
      popUpService.openDialog('Istuntosi on vanhentunut');
      console.log('Session expired / istunto vanhentunut');
      router.navigate(['/login']);
      return false;
    }
  }

  const roles = sessionService.getRole();

  if (state.url.startsWith('/acp') && !roles.includes('Admin')) {
    popUpService.openDialog('Pääsy evätty!');
    router.navigate(['']);
    return false;
  }

  return true;
};
