import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { authService } from 'src/app/services/auth';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: false
})
export class ForgotPasswordPage implements OnInit {
  forgotPasswordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: authService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {}

  async resetPassword() {
    if (this.forgotPasswordForm.valid) {
      const loading = await this.loadingController.create({
        message: 'Enviando email...',
      });
      await loading.present();

      const { email } = this.forgotPasswordForm.value;

      try {
        await this.authService.resetPassword(email);
        await loading.dismiss();

        const alert = await this.alertController.create({
          header: 'Email enviado',
          message: 'Te hemos enviado un correo con instrucciones para recuperar tu contraseña.',
          buttons: [{
            text: 'OK',
            handler: () => {
              this.router.navigate(['/auth/login']);
            }
          }]
        });
        await alert.present();
      } catch (error: any) {
        await loading.dismiss();
        let message = 'Error al enviar el email';
        
        if (error.code === 'auth/user-not-found') {
          message = 'No existe una cuenta con ese email';
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

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }
}