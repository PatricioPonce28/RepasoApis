import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SimpsonsService } from 'src/app/services/simpsons';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
  standalone: false
})
export class InboxPage implements OnInit {
  @ViewChild('quoteText', { static: false }) quoteText!: ElementRef;

  character: any = null;
  showQuiz = true;
  selectedAnswers: any = { question1: null, question2: null, question3: null };
  typedQuote = '';
  isTyping = false;

  questions = [
    {
      id: 'question1',
      question: '¿Qué prefieres hacer en tu tiempo libre?',
      options: [
        { value: 'homer', label: 'Comer donas', icon: 'pizza' },
        { value: 'lisa', label: 'Tocar un instrumento', icon: 'musical-notes' },
        { value: 'bart', label: 'Hacer travesuras', icon: 'happy' },
        { value: 'marge', label: 'Organizar la casa', icon: 'home' }
      ]
    },
    {
      id: 'question2',
      question: '¿Cuál es tu comida favorita?',
      options: [
        { value: 'homer', label: 'Hamburguesa', icon: 'fast-food' },
        { value: 'lisa', label: 'Ensalada', icon: 'leaf' },
        { value: 'bart', label: 'Pizza', icon: 'pizza' },
        { value: 'marge', label: 'Pastel casero', icon: 'cafe' }
      ]
    },
    {
      id: 'question3',
      question: '¿Cómo resuelves los problemas?',
      options: [
        { value: 'homer', label: 'Improvisando', icon: 'bulb' },
        { value: 'lisa', label: 'Investigando', icon: 'book' },
        { value: 'bart', label: 'Con astucia', icon: 'flame' },
        { value: 'marge', label: 'Con amor', icon: 'heart' }
      ]
    }
  ];

  // Mapa de frases icónicas cortas (para audio y animación)
  iconicQuotes: any = {
    1: 'D\'oh!',           // Homer
    2: 'Hrmmm...',         // Marge
    3: '¡Ay, caramba!',    // Bart
    4: 'Bart!'             // Lisa
  };

  constructor(
    private simpsonsService: SimpsonsService,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) { }

  ngOnInit() { }

  trackByOption(index: number, option: any): any {
  return option.value;
  }

  selectAnswer(questionId: string, value: string) {
    this.selectedAnswers[questionId] = value;
  }

  isAnswerSelected(questionId: string, value: string): boolean {
    return this.selectedAnswers[questionId] === value;
  }

  allQuestionsAnswered(): boolean {
    return Object.values(this.selectedAnswers).every(answer => answer !== null);
  }

  async getResult() {
    if (!this.allQuestionsAnswered()) {
      const alert = await this.alertController.create({
        header: 'Espera',
        message: 'Por favor responde todas las preguntas',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Descubriendo tu personaje...',
      spinner: 'crescent'
    });
    await loading.present();

    const counts: any = {};
    Object.values(this.selectedAnswers).forEach((answer: any) => {
      counts[answer] = (counts[answer] || 0) + 1;
    });

    const mostVoted = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
    const idMap: any = { 'homer': 1, 'marge': 2, 'bart': 3, 'lisa': 4 };
    const charId = idMap[mostVoted] || 1;

    this.simpsonsService.getCharacter(charId).subscribe({
      next: (data: any) => {
        const randomIndex = Math.floor(Math.random() * data.phrases.length);
        const fullQuote = data.phrases[randomIndex] || 'D\'oh!';
        const iconic = this.iconicQuotes[charId];

        this.character = {
          name: data.name,
          fullQuote: fullQuote,
          iconicQuote: iconic,
          description: this.getShortDescription(charId)
        };

        this.showQuiz = false;
        loading.dismiss();

        // Animar frase + sonido + dona
        setTimeout(() => {
          this.playSound(charId);
          this.typeWriter(iconic);
          this.startDonutAnimation();
        }, 300);
      },
      error: async () => {
        loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'No se pudo conectar con la API.',
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }

  // Descripción corta por personaje
  getShortDescription(id: number): string {
    const desc: any = {
      1: 'Eres perezoso, pero leal. ¡Amas las donas y a tu familia!',
      2: 'Eres organizada, paciente y el pegamento de la familia.',
      3: 'Eres travieso, ingenioso y siempre buscas aventura.',
      4: 'Eres inteligente, idealista y luchas por lo justo.'
    };
    return desc[id] || '¡Eres único en Springfield!';
  }

  // Efecto máquina de escribir
  typeWriter(text: string) {
    this.isTyping = true;
    this.typedQuote = '';
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        this.typedQuote += text.charAt(i);
        i++;
      } else {
        clearInterval(interval);
        this.isTyping = false;
      }
    }, 100);
  }

  // Reproducir sonido (archivos locales en assets/audio)
  playSound(id: number) {
    const audioMap: any = {
      1: 'doh.mp3',
      2: 'hrmmm.mp3',
      3: 'aycaramba.mp3',
      4: 'bart.mp3'
    };
    const audio = new Audio(`assets/audio/${audioMap[id] || 'doh.mp3'}`);
    audio.play().catch(() => {});
  }

  // Dona voladora
  startDonutAnimation() {
    const donut = document.createElement('div');
    donut.innerHTML = 'donut';
    donut.className = 'flying-donut';
    document.body.appendChild(donut);
    setTimeout(() => donut.remove(), 3000);
  }

  resetQuiz() {
    this.showQuiz = true;
    this.character = null;
    this.selectedAnswers = { question1: null, question2: null, question3: null };
    this.typedQuote = '';
  }
}