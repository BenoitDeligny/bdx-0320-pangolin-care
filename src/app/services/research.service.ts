import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServerAnswer } from '../models/server-answer';

@Injectable({
  providedIn: 'root'
})
export class ResearchService {

  animalDetailsURL = '';
  animalCountriesURL = '';

  constructor(private http: HttpClient) { }


  getAnimal(): Observable<ServerAnswer> {
    return this.http.get<ServerAnswer>(this.animalDetailsURL);
  }

  request(term: string) {
    this.animalDetailsURL = `https://apiv3.iucnredlist.org/api/v3/species/${term}?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee`;
    this.animalCountriesURL = `https://apiv3.iucnredlist.org/api/v3/species/countries/name/${term}?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee`;
  }
}
