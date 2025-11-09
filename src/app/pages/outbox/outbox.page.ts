import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgifyService } from 'src/app/services/agify';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-outbox',
  templateUrl: './outbox.page.html',
  styleUrls: ['./outbox.page.scss'],
  standalone: false,
})
export class OutboxPage implements OnInit {
  nameForm: FormGroup;
  result: any = null;
  showResult = false;
  history: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private agifyService: AgifyService,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {
    this.nameForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  ngOnInit() {
    this.loadHistory();
  }

  async predictAge() {
    if (this.nameForm.valid) {
      const loading = await this.loadingController.create({
        message: 'Adivinando edad...',
        spinner: 'crescent'
      });
      await loading.present();

      const name = this.nameForm.value.name.trim();

      this.agifyService.predictAge(name).subscribe({
        next: (data: any) => {
          loading.dismiss();
          
          if (data.age === null) {
            this.showNoResultAlert(name);
            return;
          }

          this.result = {
            name: data.name,
            age: data.age,
            count: data.count,
            message: this.getAgeMessage(data.age),
            emoji: this.getAgeEmoji(data.age),
            color: this.getAgeColor(data.age)
          };
          
          this.showResult = true;
          this.addToHistory(this.result);
        },
        error: async (error: any) => {
          loading.dismiss();
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'No se pudo conectar con la API. Intenta de nuevo.',
            buttons: ['OK']
          });
          await alert.present();
        }
      });
    }
  }

  async showNoResultAlert(name: string) {
    const alert = await this.alertController.create({
      header: 'Nombre no encontrado',
      message: `No hay suficientes datos para predecir la edad de "${name}". Intenta con otro nombre más común.`,
      buttons: ['OK']
    });
    await alert.present();
  }

  getAgeMessage(age: number): string {
    if (age < 18) {
      return '¡Eres joven y lleno de energía!';
    } else if (age < 30) {
      return '¡En la mejor etapa de tu vida!';
    } else if (age < 50) {
      return '¡La experiencia es tu mejor amiga!';
    } else if (age < 70) {
      return '¡La sabiduría te acompaña!';
    } else {
      return '¡Una vida llena de historias!';
    }
  }

  getAgeEmoji(age: number): string {
    if (age < 18) return '👶';
    if (age < 30) return '🧑';
    if (age < 50) return '👨';
    if (age < 70) return '👴';
    return '🧓';
  }

  getAgeColor(age: number): string {
    if (age < 18) return 'success';
    if (age < 30) return 'primary';
    if (age < 50) return 'warning';
    if (age < 70) return 'secondary';
    return 'medium';
  }

  addToHistory(result: any) {
    // Evitar duplicados
    this.history = this.history.filter(item => 
      item.name.toLowerCase() !== result.name.toLowerCase()
    );
    
    // Agregar al inicio
    this.history.unshift({
      name: result.name,
      age: result.age,
      emoji: result.emoji,
      date: new Date()
    });
    
    // Mantener solo los últimos 5
    if (this.history.length > 5) {
      this.history = this.history.slice(0, 5);
    }
    
    // Guardar en localStorage
    localStorage.setItem('ageHistory', JSON.stringify(this.history));
  }

  loadHistory() {
    const stored = localStorage.getItem('ageHistory');
    if (stored) {
      this.history = JSON.parse(stored);
    }
  }

  clearHistory() {
    this.history = [];
    localStorage.removeItem('ageHistory');
  }

  reset() {
    this.showResult = false;
    this.result = null;
    this.nameForm.reset();
  }

  searchFromHistory(name: string) {
    this.nameForm.patchValue({ name: name });
    this.showResult = false;
  }
}