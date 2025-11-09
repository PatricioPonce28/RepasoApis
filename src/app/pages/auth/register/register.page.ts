import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { authService } from 'src/app/services/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: authService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  ngOnInit() {}

  // Validador personalizado para verificar que las contraseñas coincidan
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  async register() {
    if (this.registerForm.valid) {
      const loading = await this.loadingController.create({
        message: 'Creando cuenta...',
      });
      await loading.present();

      const { email, password } = this.registerForm.value;

      try {
        await this.authService.register(email, password);
        await loading.dismiss();

        const alert = await this.alertController.create({
          header: '¡Cuenta creada!',
          message: 'Felicidades, acabas de Loguearte para prepararte para el repaso del Examen Bimestral.',
          buttons: [{
            text: 'OK',
            handler: () => {
              this.router.navigate(['/auth/verify-email']);
            }
          }]
        });
        await alert.present();
      } catch (error: any) {
        await loading.dismiss();
        let message = 'Error al crear la cuenta';
        
        if (error.code === 'auth/email-already-in-use') {
          message = 'Este email ya está registrado';
        } else if (error.code === 'auth/invalid-email') {
          message = 'Email inválido';
        } else if (error.code === 'auth/weak-password') {
          message = 'La contraseña es muy débil';
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