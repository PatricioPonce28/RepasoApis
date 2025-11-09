import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChucknorrisService {
  private apiUrl = 'https://api.chucknorris.io/jokes';

  constructor(private http: HttpClient) { }

  // Obtener un chiste aleatorio
  getRandomJoke(): Observable<any> {
    return this.http.get(`${this.apiUrl}/random`);
  }

  // Obtener categorías disponibles
  getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories`);
  }

  // Obtener chiste por categoría
  getJokeByCategory(category: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/random?category=${category}`);
  }

  // Buscar chistes por palabra
  searchJokes(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search?query=${query}`);
  }
}