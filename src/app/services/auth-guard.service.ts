import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private auth: AuthService) { }
  canActivate(): boolean {
    if (this.auth.isAuthenticated()) {
      return true;
    }
    return false;
  }
}
