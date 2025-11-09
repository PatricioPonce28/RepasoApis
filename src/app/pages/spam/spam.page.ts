import { Component, OnInit } from '@angular/core';
import { RickandmortyService } from 'src/app/services/rickandmorty';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-spam',
  templateUrl: './spam.page.html',
  styleUrls: ['./spam.page.scss'],
  standalone: false
})
export class SpamPage implements OnInit {
  characters: any[] = [];
  filteredCharacters: any[] = [];
  selectedCharacter: any = null;
  searchTerm: string = '';
  selectedStatus: string = 'all';
  currentPage: number = 1;
  totalPages: number = 1;
  showDetail: boolean = false;

  statusOptions = [
    { value: 'all', label: 'Todos' },
    { value: 'alive', label: 'Vivos' },
    { value: 'dead', label: 'Muertos' },
    { value: 'unknown', label: 'Desconocido' }
  ];

  constructor(
    private rickandmortyService: RickandmortyService,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.loadCharacters();
  }

  async loadCharacters(page: number = 1) {
    const loading = await this.loadingController.create({
      message: 'Cargando personajes...',
      spinner: 'crescent'
    });
    await loading.present();

    this.rickandmortyService.getCharacters(page).subscribe({
      next: (data: any) => {
        this.characters = data.results;
        this.filteredCharacters = data.results;
        this.currentPage = page;
        this.totalPages = data.info.pages;
        loading.dismiss();
      },
      error: async (error: any) => {
        loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'No se pudo cargar los personajes. Intenta de nuevo.',
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }

  async filterByStatus() {
    if (this.selectedStatus === 'all') {
      this.loadCharacters();
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Filtrando...',
    });
    await loading.present();

    this.rickandmortyService.filterByStatus(this.selectedStatus).subscribe({
      next: (data: any) => {
        this.characters = data.results;
        this.filteredCharacters = data.results;
        loading.dismiss();
      },
      error: async (error: any) => {
        loading.dismiss();
        this.loadCharacters();
      }
    });
  }

  searchCharacters() {
    if (!this.searchTerm || this.searchTerm.trim() === '') {
      this.filteredCharacters = this.characters;
      return;
    }

    this.rickandmortyService.searchCharacters(this.searchTerm).subscribe({
      next: (data: any) => {
        this.filteredCharacters = data.results;
      },
      error: (error: any) => {
        this.filteredCharacters = [];
      }
    });
  }

  clearSearch() {
    this.searchTerm = '';
    this.filteredCharacters = this.characters;
  }

  viewCharacter(character: any) {
    this.selectedCharacter = character;
    this.showDetail = true;
  }

  closeDetail() {
    this.showDetail = false;
    this.selectedCharacter = null;
  }

  getStatusColor(status: string): string {
    const colors: any = {
      'Alive': 'success',
      'Dead': 'danger',
      'unknown': 'medium'
    };
    return colors[status] || 'medium';
  }

  getSpeciesIcon(species: string): string {
    const icons: any = {
      'Human': 'person',
      'Alien': 'planet',
      'Robot': 'hardware-chip',
      'Humanoid': 'body',
      'Animal': 'paw',
      'Cronenberg': 'bug',
      'Disease': 'medkit'
    };
    return icons[species] || 'help-circle';
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.loadCharacters(this.currentPage + 1);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.loadCharacters(this.currentPage - 1);
    }
  }

  async loadRandomCharacter() {
    const loading = await this.loadingController.create({
      message: 'Cargando personaje aleatorio...',
    });
    await loading.present();

    const randomId = Math.floor(Math.random() * 826) + 1;
    
    this.rickandmortyService.getCharacterById(randomId).subscribe({
      next: (data: any) => {
        this.selectedCharacter = data;
        this.showDetail = true;
        loading.dismiss();
      },
      error: async (error: any) => {
        loading.dismiss();
      }
    });
  }
}