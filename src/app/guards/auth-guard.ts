import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { authService } from '../services/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: authService,
    private router: Router
  ) {}

  async canActivate(): Promise<boolean> {
    const isAuthenticated = await this.authService.isAuthenticated();
    
    if (!isAuthenticated) {
      // Si NO está autenticado, redirige al login
      this.router.navigate(['/auth/login']);
      return false;
    }
    
    // Si está autenticado, permite el acceso
    return true;
  }
}