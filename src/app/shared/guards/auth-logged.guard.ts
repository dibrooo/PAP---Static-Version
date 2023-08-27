import { CanActivate, Router } from '@angular/router';

import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthLoggedGuard implements CanActivate {
  constructor(private storageService: StorageService, private router: Router) {}

  canActivate(): boolean {
    if (!this.storageService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/profile']);
      return false;
    }
  }
}
