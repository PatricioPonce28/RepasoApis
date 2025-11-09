**Documentación Completa - Aplicación Ionic con Firebase y APIs**

**Estructura de Carpetas**

src/

├── app/

│ ├── guards/

│ │ ├── auth.guard.ts

│ │ └── auto-login.guard.ts

│ ├── services/

│ │ ├── auth.service.ts

│ │ ├── simpsons.service.ts

│ │ ├── agify.service.ts

│ │ ├── chucknorris.service.ts

│ │ └── rickandmorty.service.ts

│ ├── pages/

│ │ ├── auth/

│ │ │ ├── login/

│ │ │ ├── register/

│ │ │ ├── forgot-password/

│ │ │ └── verify-email/

│ │ ├── inbox/ (Los Simpson)

│ │ ├── outbox/ (Predictor de Edad)

│ │ ├── archived/ (Chuck Norris)

│ │ └── spam/ (Rick and Morty)

│ ├── pipes/

│ │ └── safe.pipe.ts

│ ├── app.component.ts

│ ├── app-routing.module.ts

│ └── app.module.ts

└── environments/

├── environment.ts

└── environment.prod.ts

**Sistema de Autenticación**

**1\. Configuración de Firebase**

**Credenciales (environment.ts)**

export const environment = {

production: false,

firebaseConfig: {

apiKey: "AIzaSyCEKPhpkPdWGtLFxJXiJx5WzNAc8u8qhVU",

authDomain: "bb-3abd4.firebaseapp.com",

databaseURL: "<https://bb-3abd4-default-rtdb.firebaseio.com>",

projectId: "bb-3abd4",

storageBucket: "bb-3abd4.firebasestorage.app",

messagingSenderId: "713537563741",

appId: "1:713537563741:web:729d0c8aebe201e221b1b4",

measurementId: "G-GLN4KW5CJZ"

}

};

**Inicialización (app.module.ts)**

import { AngularFireModule } from '@angular/fire/compat';

import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { HttpClientModule } from '@angular/common/http';

@NgModule({

imports: \[

BrowserModule,

IonicModule.forRoot(),

AppRoutingModule,

HttpClientModule,

AngularFireModule.initializeApp(environment.firebaseConfig),

AngularFireAuthModule,

\]

})

**Servicio de Autenticación (auth.service.ts)**

**Métodos implementados:**

- register(email, password) - Registro de usuarios
- login(email, password) - Inicio de sesión
- logout() - Cierre de sesión
- resetPassword(email) - Recuperación de contraseña
- sendVerificationEmail() - Envío de verificación
- isAuthenticated() - Verificación de autenticación
- getCurrentUser() - Obtener usuario actual

**Funcionalidades:**

- Manejo de errores con códigos específicos de Firebase
- Redirección automática después del logout
- Observable del estado de autenticación

**Guards de Protección de Rutas**

**AuthGuard (Protege rutas privadas)**

\- Verifica si el usuario está autenticado

\- Si NO está autenticado → redirige a /auth/login

\- Si está autenticado → permite el acceso

**AutoLoginGuard (Evita acceso a login si ya está autenticado)**

\- Verifica si el usuario está autenticado

\- Si está autenticado → redirige a /simpsons

\- Si NO está autenticado → permite ver login

**Páginas de Autenticación**

**Login**

- Formulario reactivo con validaciones
- Email y contraseña requeridos
- Validación de formato de email
- Contraseña mínimo 6 caracteres
- Mensajes de error personalizados
- Navegación a registro y recuperación

**Register**

- Formulario con confirmación de contraseña
- Validador personalizado para coincidencia de contraseñas
- Envío automático de email de verificación
- Redirección a página de verificación

**Forgot Password**

- Formulario simple con email
- Envío de correo de recuperación
- Mensaje de confirmación
- Redirección al login

**Verify Email**

- Pantalla informativa
- Botón para reenviar email de verificación
- Navegación al login

**Páginas Principales con APIs**

**1\. Los Simpson (Inbox) 🍩**

**API Utilizada:** <https://thesimpsonsapi.com/>

**Servicio (simpsons.service.ts):**

Métodos:

\- getMultipleQuotes(count): Obtiene múltiples personajes

\- getRandomQuote(): Obtiene un personaje aleatorio

**Funcionalidad:**

- Quiz interactivo con 3 preguntas
- Opciones visuales con iconos de Ionic
- Sistema de puntuación para determinar personaje
- Búsqueda inteligente de personajes en la API
- Fallback a personaje aleatorio si no encuentra coincidencia
- Visualización de imagen, nombre y frase del personaje
- Botón para reintentar el quiz

**Datos mostrados:**

- Imagen del personaje (circular con borde)
- Nombre completo
- Frase icónica
- Chips con información adicional

**2\. Predictor de Edad (Outbox)**

**API Utilizada:** <https://api.agify.io>

**Servicio (agify.service.ts):**

Métodos:

\- predictAge(name): Predice edad por nombre

\- predictAgeWithCountry(name, countryCode): Predicción con país

**Funcionalidad:**

- Formulario para ingresar nombre
- Predicción de edad basada en datos estadísticos
- Sistema de mensajes personalizados según edad
- Emojis dinámicos según rango de edad
- Colores temáticos por grupo etario
- Historial de búsquedas (localStorage)
- Información sobre cantidad de datos utilizados

**Rangos de edad:**

- < 18 años: "Joven y lleno de energía"
- 18-30 años: "En la mejor etapa"
- 30-50 años: "La experiencia es tu amiga"
- 50-70 años: "La sabiduría te acompaña"
- 70 años: "Una vida de historias"

**Características adicionales:**

- Validación de mínimo 2 caracteres
- Manejo de nombres no encontrados
- Historial de últimas 5 búsquedas
- Botón para limpiar historial

**3\. Chuck Norris Jokes (Archived)**

**API Utilizada:** <https://api.chucknorris.io/jokes>

**Servicio (chucknorris.service.ts):**

Métodos:

\- getRandomJoke(): Chiste aleatorio

\- getCategories(): Lista de categorías

\- getJokeByCategory(category): Chiste por categoría

\- searchJokes(query): Búsqueda de chistes

**Funcionalidad:**

- Visualización de chiste con avatar de Chuck Norris
- Sistema de categorías con colores temáticos
- Filtrado por categoría
- Sistema de favoritos (localStorage)
- Historial de chistes vistos
- Botón para compartir chiste
- Opción de copiar al portapapeles
- Navegación entre chistes con botón de refresh

**Categorías disponibles:** animal, career, celebrity, dev, explicit, fashion, food, history, money, movie, music, political, religion, science, sport, travel

**Características:**

- Detección de favoritos duplicados
- Límite de 10 favoritos
- Límite de 5 en historial
- Colores específicos por categoría
- Deslizar para eliminar favoritos

**4\. Rick and Morty (Spam)**

**API Utilizada:** <https://rickandmortyapi.com/api>

**Servicio (rickandmorty.service.ts):**

Métodos:

\- getCharacters(page): Lista paginada de personajes

\- getCharacterById(id): Personaje específico

\- searchCharacters(name): Búsqueda por nombre

\- filterByStatus(status): Filtrado por estado

\- filterBySpecies(species): Filtrado por especie

\- getRandomCharacters(count): Personajes aleatorios

\- getEpisodes(): Lista de episodios

\- getLocations(): Lista de ubicaciones

**Funcionalidad Principal:**

- Grid de tarjetas con todos los personajes
- Búsqueda en tiempo real
- Filtros por estado (Vivo/Muerto/Desconocido)
- Sistema de paginación (826+ personajes)
- Vista detallada al hacer clic
- Personaje aleatorio
- Información completa del personaje

**Datos mostrados en lista:**

- Imagen del personaje
- Nombre
- Estado con badge de color

**Datos mostrados en detalle:**

- Imagen grande
- Nombre completo
- Especie con icono
- Tipo (si aplica)
- Género
- Planeta de origen
- Última ubicación conocida
- Número de episodios en los que aparece

**Características técnicas:**

- Paginación funcional
- Búsqueda sin filtros activos
- Iconos dinámicos según especie
- Colores de badge según estado
- Animaciones de entrada
- Navegación fluida entre vistas

**Pipe personalizado (safe.pipe.ts):**

- Sanitización de URLs para videos embebidos
- Protección contra XSS
- Soporte para YouTube e iframes

**Sistema de Routing**

**Estructura de Rutas**

const routes: Routes = \[

// Ruta raíz

{ path: '', redirectTo: 'auth/login', pathMatch: 'full' },

// Rutas de autenticación (con AutoLoginGuard)

{ path: 'auth/login', canActivate: \[AutoLoginGuard\] },

{ path: 'auth/register', canActivate: \[AutoLoginGuard\] },

{ path: 'auth/forgot-password', canActivate: \[AutoLoginGuard\] },

{ path: 'auth/verify-email' },

// Rutas protegidas (con AuthGuard)

{ path: 'simpsons', canActivate: \[AuthGuard\] },

{ path: 'age-predictor', canActivate: \[AuthGuard\] },

{ path: 'chuck-norris', canActivate: \[AuthGuard\] },

{ path: 'nasa', canActivate: \[AuthGuard\] },

\];

**Flujo de Navegación**

- **Usuario NO autenticado:**
  - Acceso libre a: login, register, forgot-password
  - Cualquier ruta protegida redirige a /auth/login
- **Usuario autenticado:**
  - No puede acceder a login/register (redirige a /simpsons)
  - Acceso completo a todas las páginas de contenido
  - Al cerrar sesión, redirige a /auth/login

**Side Menu**

**Configuración (app.component.ts)**

public appPages = \[

{ title: '🍩 Los Simpson', url: '/simpsons', icon: 'cafe' },

{ title: '🎂 Adivina tu edad', url: '/age-predictor', icon: 'calendar' },

{ title: '💪 Chuck Norris', url: '/chuck-norris', icon: 'fitness' },

{ title: '🛸 Rick and Morty', url: '/nasa', icon: 'rocket' }

\];

**Funcionalidades:**

- Menú deslizable desde la izquierda
- Íconos de Ionic personalizados
- Botón de logout en la parte inferior
- Color distintivo para logout (danger)
- Navegación automática al hacer clic
- Cierre automático después de selección

**Dependencias Principales**

**NPM Packages:**

{

"@angular/core": "^17.x",

"@angular/fire": "^7.x",

"@ionic/angular": "^7.x",

"firebase": "^10.x",

"rxjs": "^7.x",

"tslib": "^2.x",

"zone.js": "^0.14.x"

}

**Comandos de Instalación:**

\# Crear proyecto

ionic start myApp sidemenu

\# Instalar Firebase

npm install @angular/fire firebase

\# Generar páginas

ionic generate page pages/auth/login

ionic generate page pages/auth/register

ionic generate page pages/inbox

ionic generate page pages/outbox

\# Generar servicios

ionic generate service services/auth

ionic generate service services/simpsons

ionic generate service services/agify

\# Generar guards

ionic generate guard guards/auth

ionic generate guard guards/auto-login

**🔧 Configuración de Firebase Console**

**Pasos realizados:**

- **Crear proyecto en Firebase Console**
  - Nombre: bb-3abd4
  - Región: Predeterminada
- **Habilitar Authentication**
  - Método: Email/Password
  - Sin verificación obligatoria
- **Configurar dominios autorizados**
  - localhost (para desarrollo)
  - Dominio de producción (para despliegue)
- **Obtener configuración web**
  - Registrar app web
  - Copiar firebaseConfig
  - Pegar en environment.ts
- **Reglas de seguridad**
  - Authentication maneja la seguridad
  - No se requiere Firestore/Realtime Database

**PASO 1: Instalar Firebase Tools (CLI)**

Firebase Tools es la herramienta de línea de comandos para interactuar con Firebase.

npm install -g firebase-tools

**Verificar instalación:**

firebase --version

Deberías ver algo como: 13.x.x

**PASO 2: Autenticarse en Firebase**

firebase login

**¿Qué pasa?**

- Se abrirá tu navegador predeterminado
- Te pedirá que inicies sesión con tu cuenta de Google
- Selecciona la cuenta que usaste para crear el proyecto Firebase
- Autoriza los permisos
- Verás un mensaje: "Success! Logged in as <tu-email@gmail.com>"

**Si ya habías iniciado sesión antes:**

firebase login --reauth

**Para cerrar sesión:**

firebase logout

**PASO 3: Inicializar Firebase en el Proyecto**

Navega a la raíz de tu proyecto Ionic:

cd tu-proyecto-ionic

firebase init

**Proceso interactivo (responde lo siguiente):**

- **Are you ready to proceed?**
  - Respuesta: Yes (Y)
- **Which Firebase features do you want to set up?**
  - Usa flechas ↑↓ para moverte
  - Usa ESPACIO para seleccionar
  - Selecciona: Hosting: Configure files for Firebase Hosting
  - Presiona ENTER
- **Please select an option:**
  - Selecciona: Use an existing project
  - Presiona ENTER
- **Select a default Firebase project:**
  - Selecciona: bb-3abd4 (tu proyecto)
  - Presiona ENTER
- **What do you want to use as your public directory?**
  - Escribe: www
  - Presiona ENTER
  - (Ionic genera el build en la carpeta www)
- **Configure as a single-page app (rewrite all urls to /index.html)?**
  - Respuesta: Yes (Y)
  - (Esto es importante para el routing de Angular)
- **Set up automatic builds and deploys with GitHub?**
  - Respuesta: No (n)
  - (Opcional, pero no es necesario ahora)
- **File www/index.html already exists. Overwrite?**
  - Respuesta: No (n)
  - (NO sobrescribas tu archivo)

**Resultado:** Se crearán estos archivos en tu proyecto:

.firebaserc

firebase.json

.firebase/ (carpeta)

**PASO 4: Configurar firebase.json (Verificar)**

Abre el archivo firebase.json y asegúrate que se vea así:

{

"hosting": {

"public": "www",

"ignore": \[

"firebase.json",

"\*\*/.\*",

"\*\*/node_modules/\*\*"

\],

"rewrites": \[

{

"source": "\*\*",

"destination": "/index.html"

}

\]

}

}

**Explicación:**

- "public": "www" → Carpeta donde está el build
- "rewrites" → Redirige todas las rutas a index.html (para Angular routing)
- "ignore" → Archivos que no se subirán

**PASO 5: Build de Producción**

Genera los archivos optimizados para producción:

ionic build --prod

**¿Qué hace este comando?**

- Compila el proyecto Angular/Ionic
- Minifica JavaScript y CSS
- Optimiza imágenes
- Genera source maps
- Crea la carpeta www/ con todo listo

**Salida esperada:**

Browser application bundle generation complete.

Copying assets complete.

Index html generation complete.

**Verifica:** La carpeta www/ debe existir con archivos dentro.

**PASO 6: Deploy a Firebase Hosting**

firebase deploy

**¿Qué pasa?**

- Sube todos los archivos de www/ a Firebase Hosting
- Configura el servidor
- Te da una URL pública

**Salida esperada:**

\=== Deploying to 'bb-3abd4'...

i deploying hosting

i hosting\[bb-3abd4\]: beginning deploy...

i hosting\[bb-3abd4\]: found 50 files in www

hosting\[bb-3abd4\]: file upload complete

i hosting\[bb-3abd4\]: finalizing version...

hosting\[bb-3abd4\]: version finalized

i hosting\[bb-3abd4\]: releasing new version...

hosting\[bb-3abd4\]: release complete

Deploy complete!

Project Console: <https://console.firebase.google.com/project/bb-3abd4/overview>

Hosting URL: <https://bb-3abd4.web.app>

**PASO 7: Ver tu App Publicada**

Abre en tu navegador:

- **URL principal:** <https://bb-3abd4.web.app>
- **URL alternativa:** <https://bb-3abd4.firebaseapp.com>

**COMANDOS PARA FUTUROS DEPLOYS**

Una vez configurado, solo necesitas estos 2 comandos:

\# 1. Generar build

ionic build --prod

\# 2. Subir a Firebase

firebase deploy

**COMANDOS ÚTILES ADICIONALES**

\# Ver el proyecto activo

firebase projects:list

\# Cambiar de proyecto

firebase use otro-proyecto

\# Deploy solo hosting (si tienes otros servicios)

firebase deploy --only hosting

\# Ver logs del deploy

firebase hosting:logs

\# Eliminar un deploy antiguo

firebase hosting:clone SOURCE_SITE_ID:SOURCE_VERSION_ID SITE_ID

\# Probar localmente antes de deploy

firebase serve

**SOLUCIÓN A ERRORES COMUNES**

**Error: "No project active"**

firebase use bb-3abd4

**Error: "www folder not found"**

\# Primero haz el build

ionic build --prod

\# Luego deploy

firebase deploy

**Error: "Permission denied"**

\# Vuelve a autenticarte

firebase login --reauth

**Error: "Deployment failed"**

\# Verifica que estés en la carpeta correcta

pwd

\# Debe mostrar la raíz de tu proyecto

**CONFIGURACIÓN OPCIONAL: Dominio Personalizado**

- Ve a Firebase Console → Hosting
- Clic en "Add custom domain"
- Ingresa tu dominio (ej: miapp.com)
- Sigue las instrucciones para configurar DNS
- Firebase te dará registros DNS para agregar

**LLAMADAS HTTP A APIS REST**

**CONFIGURACIÓN INICIAL EN ANGULAR/IONIC**

**1\. Importar HttpClientModule**

Archivo: src/app/app.module.ts

import { HttpClientModule } from '@angular/common/http';

@NgModule({

declarations: \[AppComponent\],

imports: \[

BrowserModule,

IonicModule.forRoot(),

AppRoutingModule,

HttpClientModule, // ← Agregar aquí

\],

providers: \[\],

bootstrap: \[AppComponent\],

})

export class AppModule {}

**ESTRUCTURA DE UN SERVICIO HTTP**

**Crear un servicio:**

ionic generate service services/nombre-api

**Anatomía básica:**

import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({

providedIn: 'root'

})

export class NombreApiService {

private apiUrl = '<https://api.ejemplo.com>';

constructor(private http: HttpClient) { }

// Método para obtener datos

getData(): Observable&lt;any&gt; {

return this.http.get(\`\${this.apiUrl}/endpoint\`);

}

}

**Componentes clave:**

- @Injectable() → Hace que el servicio sea inyectable
- providedIn: 'root' → Disponible en toda la app
- HttpClient → Servicio para hacer peticiones
- Observable&lt;any&gt; → Tipo de retorno (patrón observer)

**EJEMPLOS PRÁCTICOS DE CADA API**

**1\. API DE LOS SIMPSON**

**URL:** <https://thesimpsonsquoteapi.glitch.me/quotes>

**Servicio (simpsons.service.ts):**

import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({

providedIn: 'root'

})

export class SimpsonsService {

private apiUrl = '<https://thesimpsonsquoteapi.glitch.me/quotes>';

constructor(private http: HttpClient) { }

// Obtener múltiples personajes

getMultipleQuotes(count: number = 10): Observable&lt;any&gt; {

return this.http.get(\`\${this.apiUrl}?count=\${count}\`);

}

// Obtener una frase aleatoria

getRandomQuote(): Observable&lt;any&gt; {

return this.http.get(this.apiUrl);

}

}

**Uso en componente:**

import { SimpsonsService } from 'src/app/services/simpsons.service';

export class InboxPage implements OnInit {

characters: any\[\] = \[\];

constructor(private simpsonsService: SimpsonsService) { }

ngOnInit() {

this.loadCharacters();

}

loadCharacters() {

this.simpsonsService.getMultipleQuotes(20).subscribe({

next: (data: any) => {

console.log('Datos recibidos:', data);

this.characters = data;

},

error: (error: any) => {

console.error('Error:', error);

}

});

}

}

**Respuesta de la API:**

\[

{

"quote": "D'oh!",

"character": "Homer Simpson",

"image": "<https://cdn.glitch.com/>...",

"characterDirection": "Right"

}

\]

**2\. API DE AGIFY (Predictor de edad)**

**URL:** <https://api.agify.io>

**Servicio (agify.service.ts):**

import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({

providedIn: 'root'

})

export class AgifyService {

private apiUrl = '<https://api.agify.io>';

constructor(private http: HttpClient) { }

// Predecir edad por nombre

predictAge(name: string): Observable&lt;any&gt; {

return this.http.get(\`\${this.apiUrl}?name=\${name}\`);

}

// Predecir con país

predictAgeWithCountry(name: string, countryCode: string): Observable&lt;any&gt; {

return this.http.get(\`\${this.apiUrl}?name=\${name}&country_id=\${countryCode}\`);

}

}

**Uso en componente:**

import { AgifyService } from 'src/app/services/agify.service';

export class OutboxPage implements OnInit {

result: any = null;

constructor(private agifyService: AgifyService) { }

predictAge() {

const name = 'Maria';

this.agifyService.predictAge(name).subscribe({

next: (data: any) => {

console.log('Predicción:', data);

this.result = data;

// data = { name: "Maria", age: 45, count: 12345 }

},

error: (error: any) => {

console.error('Error:', error);

}

});

}

}

**Respuesta de la API:**

{

"name": "Maria",

"age": 45,

"count": 12345

}

**3\. API DE CHUCK NORRIS**

**URL:** <https://api.chucknorris.io/jokes>

**Servicio (chucknorris.service.ts):**

import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({

providedIn: 'root'

})

export class ChucknorrisService {

private apiUrl = '<https://api.chucknorris.io/jokes>';

constructor(private http: HttpClient) { }

// Obtener chiste aleatorio

getRandomJoke(): Observable&lt;any&gt; {

return this.http.get(\`\${this.apiUrl}/random\`);

}

// Obtener categorías

getCategories(): Observable&lt;any&gt; {

return this.http.get(\`\${this.apiUrl}/categories\`);

}

// Chiste por categoría

getJokeByCategory(category: string): Observable&lt;any&gt; {

return this.http.get(\`\${this.apiUrl}/random?category=\${category}\`);

}

// Buscar chistes

searchJokes(query: string): Observable&lt;any&gt; {

return this.http.get(\`\${this.apiUrl}/search?query=\${query}\`);

}

}

**Uso en componente:**

import { ChucknorrisService } from 'src/app/services/chucknorris.service';

export class ArchivedPage implements OnInit {

joke: any = null;

constructor(private chucknorrisService: ChucknorrisService) { }

ngOnInit() {

this.loadRandomJoke();

}

loadRandomJoke() {

this.chucknorrisService.getRandomJoke().subscribe({

next: (data: any) => {

console.log('Chiste:', data);

this.joke = data;

},

error: (error: any) => {

console.error('Error:', error);

}

});

}

}

**Respuesta de la API:**

{

"categories": \["dev"\],

"created_at": "2020-01-05 13:42:19.576875",

"icon_url": "https://...",

"id": "abc123",

"updated_at": "2020-01-05 13:42:19.576875",

"url": "<https://api.chucknorris.io/jokes/abc123>",

"value": "Chuck Norris can write infinite loops that terminate."

}

**4\. API DE RICK AND MORTY**

**URL:** <https://rickandmortyapi.com/api>

**Servicio (rickandmorty.service.ts):**

import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({

providedIn: 'root'

})

export class RickandmortyService {

private apiUrl = '<https://rickandmortyapi.com/api>';

constructor(private http: HttpClient) { }

// Obtener personajes (con paginación)

getCharacters(page: number = 1): Observable&lt;any&gt; {

return this.http.get(\`\${this.apiUrl}/character?page=\${page}\`);

}

// Obtener personaje por ID

getCharacterById(id: number): Observable&lt;any&gt; {

return this.http.get(\`\${this.apiUrl}/character/\${id}\`);

}

// Buscar personajes

searchCharacters(name: string): Observable&lt;any&gt; {

return this.http.get(\`\${this.apiUrl}/character/?name=\${name}\`);

}

// Filtrar por estado

filterByStatus(status: string): Observable&lt;any&gt; {

return this.http.get(\`\${this.apiUrl}/character/?status=\${status}\`);

}

}

**Uso en componente:**

import { RickandmortyService } from 'src/app/services/rickandmorty.service';

export class SpamPage implements OnInit {

characters: any\[\] = \[\];

constructor(private rickandmortyService: RickandmortyService) { }

ngOnInit() {

this.loadCharacters();

}

loadCharacters() {

this.rickandmortyService.getCharacters(1).subscribe({

next: (data: any) => {

console.log('Personajes:', data);

this.characters = data.results;

// data.info contiene info de paginación

},

error: (error: any) => {

console.error('Error:', error);

}

});

}

}

**Respuesta de la API:**

{

"info": {

"count": 826,

"pages": 42,

"next": "<https://rickandmortyapi.com/api/character?page=2>",

"prev": null

},

"results": \[

{

"id": 1,

"name": "Rick Sanchez",

"status": "Alive",

"species": "Human",

"type": "",

"gender": "Male",

"origin": {

"name": "Earth (C-137)",

"url": "https://..."

},

"location": {

"name": "Citadel of Ricks",

"url": "https://..."

},

"image": "<https://rickandmortyapi.com/api/character/avatar/1.jpeg>",

"episode": \["https://...", "https://..."\],

"url": "<https://rickandmortyapi.com/api/character/1>",

"created": "2017-11-04T18:48:46.250Z"

}

\]

}

**MÉTODOS HTTP DETALLADOS**

**1\. GET - Obtener datos**

// Sin parámetros

this.http.get('<https://api.ejemplo.com/users>')

// Con parámetros en URL

this.http.get('<https://api.ejemplo.com/users?page=1&limit=10>')

// Con parámetros usando HttpParams

import { HttpParams } from '@angular/common/http';

let params = new HttpParams()

.set('page', '1')

.set('limit', '10');

this.http.get('<https://api.ejemplo.com/users>', { params })

**2\. POST - Crear datos**

const newUser = {

name: 'Juan',

email: '<juan@example.com>'

};

this.http.post('<https://api.ejemplo.com/users>', newUser)

.subscribe({

next: (response) => console.log('Usuario creado:', response),

error: (error) => console.error('Error:', error)

});

**3\. PUT - Actualizar datos completos**

const updatedUser = {

id: 1,

name: 'Juan Pérez',

email: '<juan.perez@example.com>'

};

this.http.put('<https://api.ejemplo.com/users/1>', updatedUser)

.subscribe({

next: (response) => console.log('Usuario actualizado:', response),

error: (error) => console.error('Error:', error)

});

**4\. DELETE - Eliminar datos**

this.http.delete('<https://api.ejemplo.com/users/1>')

.subscribe({

next: (response) => console.log('Usuario eliminado:', response),

error: (error) => console.error('Error:', error)

});

**MANEJO DE HEADERS**

import { HttpHeaders } from '@angular/common/http';

// Crear headers

const headers = new HttpHeaders({

'Content-Type': 'application/json',

'Authorization': 'Bearer mi-token-123'

});

// Usar en petición

this.http.get('<https://api.ejemplo.com/users>', { headers })

.subscribe({

next: (data) => console.log(data),

error: (error) => console.error(error)

});

**MANEJO DE ERRORES**

**Opción 1: En el subscribe**

this.http.get('<https://api.ejemplo.com/users').subscribe({>

next: (data) => {

console.log('Éxito:', data);

},

error: (error) => {

console.error('Error:', error);

// Tipos de errores

if (error.status === 404) {

console.log('No encontrado');

} else if (error.status === 500) {

console.log('Error del servidor');

} else if (error.status === 0) {

console.log('Sin conexión a internet');

}

}

});

**Opción 2: Con RxJS operators**

import { catchError, retry } from 'rxjs/operators';

import { throwError } from 'rxjs';

getData(): Observable&lt;any&gt; {

return this.http.get('<https://api.ejemplo.com/users').pipe(>

retry(3), // Reintenta 3 veces si falla

catchError((error) => {

console.error('Error capturado:', error);

return throwError(() => new Error('Algo salió mal'));

})

);

}

**USANDO ASYNC/AWAIT (Alternativa)**

async loadData() {

try {

const data = await this.http.get('<https://api.ejemplo.com/users').toPromise(>);

console.log('Datos:', data);

} catch (error) {

console.error('Error:', error);

}

}

**MEJORES PRÁCTICAS**

**1\. Crear interfaces para tipado:**

// user.interface.ts

export interface User {

id: number;

name: string;

email: string;

}

// En el servicio

getData(): Observable&lt;User\[\]&gt; {

return this.http.get&lt;User\[\]&gt;('<https://api.ejemplo.com/users>');

}

**2\. Usar variables de entorno:**

// environment.ts

export const environment = {

production: false,

apiUrl: '<https://api.ejemplo.com>'

};

// En el servicio

import { environment } from 'src/environments/environment';

export class MiServicio {

private apiUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

}

**3\. Cancelar subscripciones:**

import { Subscription } from 'rxjs';

export class MiComponente implements OnInit, OnDestroy {

private subscription: Subscription;

ngOnInit() {

this.subscription = this.http.get('...').subscribe(data => {

console.log(data);

});

}

ngOnDestroy() {

if (this.subscription) {

this.subscription.unsubscribe();

}

}

}

**TESTING DE APIS CON LOADING Y ALERTS**

import { LoadingController, AlertController } from '@ionic/angular';

export class MiPage {

constructor(

private http: HttpClient,

private loadingController: LoadingController,

private alertController: AlertController

) {}

async loadData() {

// Mostrar loading

const loading = await this.loadingController.create({

message: 'Cargando...',

spinner: 'crescent'

});

await loading.present();

// Hacer petición

this.http.get('<https://api.ejemplo.com/users').subscribe({>

next: async (data) => {

await loading.dismiss();

console.log('Datos:', data);

},

error: async (error) => {

await loading.dismiss();

// Mostrar alert de error

const alert = await this.alertController.create({

header: 'Error',

message: 'No se pudo cargar los datos',

buttons: \['OK'\]

});

await alert.present();

}

});

}

}

**Ejecución del Proyecto**

**Desarrollo:**

\# Instalar dependencias

npm install

\# Ejecutar en navegador

ionic serve

\# Ver en dispositivo específico

ionic serve --lab

**Build:**

\# Producción web

ionic build --prod

\# Android

ionic capacitor add android

ionic capacitor build android

\# iOS

ionic capacitor add ios

ionic capacitor build ios

**Manejo de Errores**

**Errores de Firebase Auth:**

- auth/user-not-found: Usuario no encontrado
- auth/wrong-password: Contraseña incorrecta
- auth/email-already-in-use: Email ya registrado
- auth/weak-password: Contraseña débil
- auth/invalid-email: Email inválido

**Errores de APIs:**

- Network error: Problemas de conexión
- 404: Recurso no encontrado
- 400: Bad request (parámetros incorrectos)

**Implementación:**

- Try-catch en métodos async
- Subscribe con manejo de next/error
- Alerts de Ionic para mostrar errores
- Loading indicators durante peticiones

**Almacenamiento Local**

**Uso de localStorage:**

- **Chuck Norris Favoritos:**
  - Key: chuckFavorites
  - Formato: Array de objetos JSON
  - Límite: 10 elementos
- **Historial de edad:**
  - Key: ageHistory
  - Formato: Array de objetos JSON
  - Límite: 5 elementos

**Métodos:**

// Guardar

localStorage.setItem('key', JSON.stringify(data));

// Leer

const data = JSON.parse(localStorage.getItem('key'));

// Eliminar

localStorage.removeItem('key');

**Seguridad**

**Buenas prácticas implementadas:**

- Guards en todas las rutas privadas
- Validación de formularios
- Sanitización de URLs (SafePipe)
- Manejo de errores en todas las peticiones
- No almacenar contraseñas en el código
- Credenciales de Firebase en environment
- HTTPS en todas las APIs

**Nota sobre credenciales públicas:**

Las credenciales de Firebase para web son públicas por diseño. La seguridad real se maneja en Firebase Console con:

- Authentication rules
- Dominios autorizados
- Rate limiting

**APIs Documentadas**

**1\. The Simpsons Quote API**

- **URL:** <https://thesimpsonsquoteapi.glitch.me/quotes>
- **Método:** GET
- **Parámetros:** ?count=10
- **Respuesta:** Array de objetos
- **Gratuita:** Sí
- **Límite:** No especificado

**2\. Agify API**

- **URL:** <https://api.agify.io>
- **Método:** GET
- **Parámetros:** ?name=nombre
- **Respuesta:** { name, age, count }
- **Gratuita:** Sí (1000 requests/día)
- **Límite:** Rate limit aplicado

**3\. Chuck Norris Jokes API**

- **URL:** <https://api.chucknorris.io/jokes>
- **Método:** GET
- **Endpoints:** /random, /categories, /search
- **Respuesta:** Objeto con chiste
- **Gratuita:** Sí
- **Límite:** No especificado

**4\. Rick and Morty API**

- **URL:** <https://rickandmortyapi.com/api>
- **Método:** GET
- **Endpoints:** /character, /episode, /location
- **Respuesta:** Objeto con paginación
- **Gratuita:** Sí
- **Límite:** No especificado
- **Total personajes:** 826+

**Conceptos Aplicados**

**Angular/Ionic:**

- Componentes
- Servicios e inyección de dependencias
- Routing y navegación
- Guards de rutas
- Formularios reactivos
- Pipes personalizados
- Observables y RxJS
- HttpClient
- Módulos lazy-loaded

**Firebase:**

- Authentication
- Email/Password provider
- Auth state observer
- Error handling

**Conclusión**

Este proyecto demuestra una implementación completa de:

- Sistema de autenticación robusto
- Consumo de múltiples APIs REST
- Diseño responsivo y atractivo
- Navegación protegida con guards
- Manejo de estado y persistencia
- Experiencia de usuario fluida

Todas las funcionalidades están operativas y listas para producción o evaluación académica.
