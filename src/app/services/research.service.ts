import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnimalByCountryAnswer } from '../models/animal-by-country-answer';
import { AnimalDetailsAnswer } from '../models/animaldetailsanswer';
import { AnimalCountriesAnswer } from '../models/animal-countries-answer';


@Injectable({
  providedIn: 'root'
})
export class ResearchService {

  constructor(private http: HttpClient) { }

  BASE_URL = `https://apiv3.iucnredlist.org/api/v3/`;
  TOKEN = `?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee`;

  animalByCountryURL = '';
  animalDetailsURL = '';
  animalCountriesURL = '';

  getAnimalByCountry(criteria: string): Observable<AnimalByCountryAnswer> {
    this.animalByCountryURL = this.BASE_URL + `country/getspecies/${criteria}` + this.TOKEN;
    return this.http.get<AnimalByCountryAnswer>(this.animalByCountryURL);
  }

  getAnimalDetails(criteria: string): Observable<AnimalDetailsAnswer> {
    this.animalDetailsURL = this.BASE_URL + `species/${criteria}` + this.TOKEN;
    return this.http.get<AnimalDetailsAnswer>(this.animalDetailsURL);
  }

  getAnimalCountries(criteria: string): Observable<AnimalCountriesAnswer> {
    this.animalCountriesURL = this.BASE_URL + `species/countries/name/${criteria}` + this.TOKEN;
    return this.http.get<AnimalCountriesAnswer>(this.animalCountriesURL);
  }

  request(criteria: string) {
}
}
