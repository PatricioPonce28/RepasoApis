import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgifyService {
  private apiUrl = 'https://api.agify.io';

  constructor(private http: HttpClient) { }

  // Predecir edad por nombre
  predictAge(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?name=${name}`);
  }

  predictAgeWithCountry(name: string, countryCode: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?name=${name}&country_id=${countryCode}`);
  }
}