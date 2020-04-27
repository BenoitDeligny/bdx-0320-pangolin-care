import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnimalByCountryAnswer } from '../models/animal-by-country-answer';
import { AnimalDetailsAnswer } from '../models/animaldetailsanswer';
import { AnimalCountriesAnswer } from '../models/animal-countries-answer';
import { Country } from '../models/country-list';
import { DescriptionAnswer } from '../models/description-answer';


@Injectable({
  providedIn: 'root'
})
export class ResearchService {

  constructor(private http: HttpClient) { }

  allCountriesUrl = 'app/models/isocode-countries.json';

  // API RESTCOUNTRIES
  BASE_COUNTRY_URL = `https://restcountries.eu/rest/v2/alpha/`;

  // API WIKIPEDIA
  BIG_IMG_URL = 'https://fr.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=original&titles=';
  ICON_IMG_URL = 'https://fr.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=thumbnail&titles=';
  DESCRIPTION_URL = 'https://fr.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exsentences=5&exlimit=1&explaintext=1&formatversion=2&titles=';


  // API REDLIST
  BASE_URL = `https://apiv3.iucnredlist.org/api/v3/`;
  TOKEN = `?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee`;


  getAnimalByCountry(criteria: string): Observable<AnimalByCountryAnswer> {
    const url = this.BASE_URL + `country/getspecies/${criteria}` + this.TOKEN;
    return this.http.get<AnimalByCountryAnswer>(url);
  }

  getAnimalDetails(criteria: string): Observable<AnimalDetailsAnswer> {
    const url = this.BASE_URL + `species/${criteria}` + this.TOKEN;
    return this.http.get<AnimalDetailsAnswer>(url);
  }

  getAnimalCountries(criteria: string): Observable<AnimalCountriesAnswer> {
    const url = this.BASE_URL + `species/countries/name/${criteria}` + this.TOKEN;
    return this.http.get<AnimalCountriesAnswer>(url);
  }

  getArrayOfCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.allCountriesUrl);
  }

  getAnimalDescription(criteria: string): Observable<DescriptionAnswer> {
    const url = this.BASE_URL + `species/narrative/${criteria}` + this.TOKEN;
    return this.http.get<DescriptionAnswer>(url);
  }
}
