import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class authService {
  user$: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) { 
    this.user$ = this.afAuth.authState.pipe(
      map(user => user ? {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || user.email?.split('@')[0] || 'Usuario'
      } : null)
    );
  }

  // Obtener el usuario actual como Observable
  getCurrentUser(): Observable<any> {
    return this.afAuth.authState;
  }

  // Registro con email y contraseña
  async register(email: string, password: string) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      // Enviar email de verificación
      await this.sendVerificationEmail();
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Login con email y contraseña
  async login(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Cerrar sesión
  async logout() {
    try {
      await this.afAuth.signOut();
      this.router.navigate(['/auth/login']);
    } catch (error) {
      throw error;
    }
  }

  // Recuperar contraseña
  async resetPassword(email: string) {
    try {
      await this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      throw error;
    }
  }

  // Enviar email de verificación
  async sendVerificationEmail() {
    try {
      const user = await this.afAuth.currentUser;
      await user?.sendEmailVerification();
    } catch (error) {
      throw error;
    }
  }

  // Verificar si el usuario está autenticado (promesa)
  async isAuthenticated(): Promise<boolean> {
    const user = await this.afAuth.currentUser;
    return user !== null;
  }
}