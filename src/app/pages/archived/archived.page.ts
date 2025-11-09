import { Component, OnInit } from '@angular/core';
import { ChucknorrisService } from 'src/app/services/chucknorris';
import { LoadingController, AlertController } from '@ionic/angular';


@Component({
  selector: 'app-archived',
  templateUrl: './archived.page.html',
  styleUrls: ['./archived.page.scss'],
  standalone: false,
})
export class ArchivedPage implements OnInit {
  currentJoke: any = null;
  categories: string[] = [];
  selectedCategory: string = '';
  favoriteJokes: any[] = [];
  jokeHistory: any[] = [];

  constructor(
    private chucknorrisService: ChucknorrisService,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.loadCategories();
    this.loadFavorites();
    this.getRandomJoke();
  }

  loadCategories() {
    this.chucknorrisService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        console.error('Error loading categories', error);
      }
    });
  }

  async getRandomJoke() {
    const loading = await this.loadingController.create({
      message: 'Cargando chiste...',
      duration: 1000
    });
    await loading.present();

    this.chucknorrisService.getRandomJoke().subscribe({
      next: (data) => {
        this.currentJoke = data;
        this.addToHistory(data);
        loading.dismiss();
      },
      error: async (error) => {
        loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'No se pudo cargar el chiste. Intenta de nuevo.',
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }

  async getJokeByCategory() {
    if (!this.selectedCategory) {
      this.getRandomJoke();
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Cargando chiste...',
      duration: 1000
    });
    await loading.present();

    this.chucknorrisService.getJokeByCategory(this.selectedCategory).subscribe({
      next: (data) => {
        this.currentJoke = data;
        this.addToHistory(data);
        loading.dismiss();
      },
      error: async (error) => {
        loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'No se pudo cargar el chiste. Intenta de nuevo.',
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }

  addToFavorites() {
    if (!this.currentJoke) return;

    // Verificar si ya existe
    const exists = this.favoriteJokes.some(joke => joke.id === this.currentJoke.id);
    
    if (exists) {
      this.showAlert('Ya está en favoritos', 'Este chiste ya está en tu lista de favoritos');
      return;
    }

    this.favoriteJokes.unshift(this.currentJoke);
    
    // Mantener solo los últimos 10
    if (this.favoriteJokes.length > 10) {
      this.favoriteJokes = this.favoriteJokes.slice(0, 10);
    }

    localStorage.setItem('chuckFavorites', JSON.stringify(this.favoriteJokes));
    this.showAlert('¡Agregado!', 'Chiste guardado en favoritos');
  }

  removeFromFavorites(jokeId: string) {
    this.favoriteJokes = this.favoriteJokes.filter(joke => joke.id !== jokeId);
    localStorage.setItem('chuckFavorites', JSON.stringify(this.favoriteJokes));
  }

  loadFavorites() {
    const stored = localStorage.getItem('chuckFavorites');
    if (stored) {
      this.favoriteJokes = JSON.parse(stored);
    }
  }

  addToHistory(joke: any) {
    // Evitar duplicados consecutivos
    if (this.jokeHistory.length > 0 && this.jokeHistory[0].id === joke.id) {
      return;
    }

    this.jokeHistory.unshift({
      ...joke,
      timestamp: new Date()
    });

    // Mantener solo los últimos 5
    if (this.jokeHistory.length > 5) {
      this.jokeHistory = this.jokeHistory.slice(0, 5);
    }
  }

  viewJoke(joke: any) {
    this.currentJoke = joke;
  }

  shareJoke() {
    if (this.currentJoke) {
      if (navigator.share) {
        navigator.share({
          title: 'Chuck Norris Joke',
          text: this.currentJoke.value,
          url: this.currentJoke.url
        });
      } else {
        this.copyToClipboard(this.currentJoke.value);
      }
    }
  }

  async copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      this.showAlert('¡Copiado!', 'Chiste copiado al portapapeles');
    } catch (err) {
      console.error('Error copying text: ', err);
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  isFavorite(): boolean {
    if (!this.currentJoke) return false;
    return this.favoriteJokes.some(joke => joke.id === this.currentJoke.id);
  }

  getCategoryColor(category: string): string {
    const colors: any = {
      'animal': 'success',
      'career': 'primary',
      'celebrity': 'warning',
      'dev': 'secondary',
      'explicit': 'danger',
      'fashion': 'tertiary',
      'food': 'warning',
      'history': 'medium',
      'money': 'success',
      'movie': 'primary',
      'music': 'secondary',
      'political': 'danger',
      'religion': 'medium',
      'science': 'tertiary',
      'sport': 'success',
      'travel': 'primary'
    };
    return colors[category] || 'medium';
  }
}