import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnimalDetailsAnswer, AnimalByCountryAnswer} from '../models/server-answers';
import { AnimalCountriesAnswer } from '../models/server-answers';

@Injectable({
  providedIn: 'root'
})
export class ResearchService {

  constructor(private http: HttpClient) { }

  animalByCountryURL = '';
  animalDetailsURL = '';
  animalCountriesURL = '';

  getAnimalByCountry(): Observable<AnimalByCountryAnswer> {
    return this.http.get<AnimalByCountryAnswer>(this.animalByCountryURL);
  }

  getAnimalDetails(): Observable<AnimalDetailsAnswer> {
    return this.http.get<AnimalDetailsAnswer>(this.animalDetailsURL);
  }

  getAnimalCountries(): Observable<AnimalCountriesAnswer> {
    return this.http.get<AnimalCountriesAnswer>(this.animalCountriesURL);
  }

  request(term: string) {
  this.animalByCountryURL = `https://apiv3.iucnredlist.org/api/v3/country/getspecies/${term}?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee`;
  console.log(`https://apiv3.iucnredlist.org/api/v3/country/getspecies/${term}?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee`);
  this.animalDetailsURL = `https://apiv3.iucnredlist.org/api/v3/species/${term}?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee`;
  this.animalCountriesURL = `https://apiv3.iucnredlist.org/api/v3/species/countries/name/${term}?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee`;
}
}
