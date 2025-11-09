import { Component } from '@angular/core';
import { authService } from './services/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
public appPages = [
  { title: '🍩 Los Simpson', url: '/inbox', icon: 'cafe' },
  { title: '🎂 Adivina tu edad', url: '/outbox', icon: 'calendar' },
  { title: '💪 Chuck Norris Jokes', url: '/archived', icon: 'fitness' }, 
  { title: '🛸 Rick and Morty', url: '/spam', icon: 'rocket' }
];

  user: any = null;

constructor(private authService: authService) {}

  ngOnInit() { // ← Agrega ngOnInit
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }

  async logout() {
    await this.authService.logout();
  }
}