import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { authService } from 'src/app/services/auth';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
  standalone: false
})
export class VerifyEmailPage implements OnInit {

  constructor(
    private authService: authService,
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit() {}

  async resendVerificationEmail() {
    try {
      await this.authService.sendVerificationEmail();
      const alert = await this.alertController.create({
        header: 'Email enviado',
        message: 'Te hemos reenviado el email de verificación.',
        buttons: ['OK']
      });
      await alert.present();
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No se pudo enviar el email. Intenta más tarde.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }
}