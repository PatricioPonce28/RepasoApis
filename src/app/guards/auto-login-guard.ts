import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { authService } from '../services/auth';

@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanActivate {

  constructor(
    private authService: authService,
    private router: Router
  ) {}

  async canActivate(): Promise<boolean> {
    const isAuthenticated = await this.authService.isAuthenticated();
    
    if (isAuthenticated) {
      // Si YA está autenticado, redirige al home/sidemenu
      this.router.navigate(['/inbox']);  // Cambia esto a tu ruta principal
      return false;
    }
    
    // Si NO está autenticado, permite ver el login
    return true;
  }
}