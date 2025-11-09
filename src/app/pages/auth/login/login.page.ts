import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { authService } from 'src/app/services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: authService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {}

  async login() {
    if (this.loginForm.valid) {
      const loading = await this.loadingController.create({
        message: 'Iniciando sesión...',
      });
      await loading.present();

      const { email, password } = this.loginForm.value;

      try {
        await this.authService.login(email, password);
        await loading.dismiss();
        this.router.navigate(['/folder/Inbox']);
      } catch (error: any) {
        await loading.dismiss();
        let message = 'Error al iniciar sesión';
        
        if (error.code === 'auth/user-not-found') {
          message = 'Usuario no encontrado';
        } else if (error.code === 'auth/wrong-password') {
          message = 'Contraseña incorrecta';
        } else if (error.code === 'auth/invalid-email') {
          message = 'Email inválido';
        }

        const alert = await this.alertController.create({
          header: 'Error',
          message: message,
          buttons: ['OK']
        });
        await alert.present();
      }
    }
  }

  goToRegister() {
    this.router.navigate(['/auth/register']);
  }

  goToForgotPassword() {
    this.router.navigate(['/auth/forgot-password']);
  }
}