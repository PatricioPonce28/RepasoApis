import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RickandmortyService {
  private apiUrl = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) { }

  // Obtener todos los personajes (con paginación)
  getCharacters(page: number = 1): Observable<any> {
    return this.http.get(`${this.apiUrl}/character?page=${page}`);
  }

  // Obtener personaje por ID
  getCharacterById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/character/${id}`);
  }

  // Buscar personajes por nombre
  searchCharacters(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/character/?name=${name}`);
  }

  // Filtrar por status
  filterByStatus(status: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/character/?status=${status}`);
  }

  // Filtrar por especie
  filterBySpecies(species: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/character/?species=${species}`);
  }

  // Obtener personajes aleatorios
  getRandomCharacters(count: number = 5): Observable<any> {
    const randomIds = Array.from({ length: count }, () => Math.floor(Math.random() * 826) + 1);
    return this.http.get(`${this.apiUrl}/character/${randomIds.join(',')}`);
  }

  // Obtener episodios
  getEpisodes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/episode`);
  }

  // Obtener locaciones
  getLocations(): Observable<any> {
    return this.http.get(`${this.apiUrl}/location`);
  }
}