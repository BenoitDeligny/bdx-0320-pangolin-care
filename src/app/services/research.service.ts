import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnimalDetailsAnswer } from '../models/server-answers';
import { AnimalCountriesAnswer } from '../models/server-answers';

@Injectable({
  providedIn: 'root'
})
export class ResearchService {

  /* animalDetailsURL = '';
  animalCountriesURL = ''; */

  constructor(private http: HttpClient) { }


  /* getAnimalDetails(): Observable<AnimalDetailsAnswer> {
    return this.http.get<AnimalDetailsAnswer>(this.animalDetailsURL);
  }

  getAnimalCountries(): Observable<AnimalCountriesAnswer> {
    return this.http.get<AnimalCountriesAnswer>(this.animalCountriesURL);
  } */

  request(term: string) {
    // this.animalDetailsURL = `https://apiv3.iucnredlist.org/api/v3/species/${term}?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee`;
    // his.animalCountriesURL = `https://apiv3.iucnredlist.org/api/v3/species/countries/name/${term}?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee`;
  }
}
