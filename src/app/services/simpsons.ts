import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SimpsonsService {
  private apiUrl = 'https://thesimpsonsapi.com/api';

  constructor(private http: HttpClient) { }

  getCharacter(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/characters/${id}`);
  }
}