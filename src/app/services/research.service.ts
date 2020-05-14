import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnimalsByCountryAnswer } from '../models/animal-by-country-answer';
import { AnimalDetailsAnswer } from '../models/animaldetailsanswer';
import { AnimalCountriesAnswer } from '../models/animal-countries-answer';
import { Country } from '../models/country-list';
import { Animal } from '../models/animal';
import { map, filter } from 'rxjs/operators';
import { Description } from '../models/description';
import { DescriptionAnswer } from '../models/description-answer';


@Injectable({
  providedIn: 'root'
})
export class ResearchService {

  constructor(private http: HttpClient) { }

  allCountriesUrl = 'app/models/isocodes.json';

  // API RESTCOUNTRIES
  BASE_COUNTRY_URL = `https://restcountries.eu/rest/v2/alpha/`;

  // API WIKIPEDIA
  DESCRIPTION_URL = 'https://en.wikipedia.org/w/api.php?action=query&origin=%2A&prop=extracts&format=json&exsentences=5&exlimit=1&explaintext=1&formatversion=2&titles=';

  // API REDLIST
  BASE_URL = `https://apiv3.iucnredlist.org/api/v3/`;
  TOKEN = `?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee`;

  // API WITPOC
  WITPOC_URL = 'https://api.witpoc.com/animals';


  getAnimalsByCountry(isocode: string): Observable<Animal[]> {
    const url = this.BASE_URL + `country/getspecies/${isocode}` + this.TOKEN;
    return this.http.get<AnimalsByCountryAnswer>(url).pipe(map((data: AnimalsByCountryAnswer) => {
      return data.result.filter((animal) => {
        return (animal.category === 'CR' || animal.category === 'EW');
      });
    }));
  }

  getAnimalDetails(scientificName: string): Observable<Animal> {
    const url = this.BASE_URL + `species/${scientificName}` + this.TOKEN;
    return this.http.get<AnimalDetailsAnswer>(url).pipe(map((data: AnimalDetailsAnswer) => {
      return data.result[0];
    }));
  }

  getAnimalCountries(criteria: string): Observable<AnimalCountriesAnswer> {
    const url = this.BASE_URL + `species/countries/name/${criteria}` + this.TOKEN;
    return this.http.get<AnimalCountriesAnswer>(url);
  }

  getArrayOfCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.allCountriesUrl);
  }

  getAnimalDescription(criteria: string): Observable<string> {
    const url = this.BASE_URL + `species/narrative/${criteria}` + this.TOKEN;
    return this.http.get<DescriptionAnswer>(url).pipe(map((data: DescriptionAnswer) => {
      return data.result[0].rationale;
    }));
  }

  getFlagOfCountry(criteria: string): Observable<object> {
    const url = this.BASE_COUNTRY_URL + `${criteria}`;
    return this.http.get<object>(url);
  }

  getCountryFlag(isocode: string): Observable<any> {
    return this.http.get<any>(this.BASE_COUNTRY_URL + isocode);
  }

  getCountryDescription(countryName: string): Observable<any> {
    return this.http.get(this.DESCRIPTION_URL + `${countryName}`);
  }

  postAnimalImg(newAnimal: Animal) {
    return this.http.post(this.WITPOC_URL, newAnimal);
  }

  getAnimalImageByName(name: string): Observable<string> {
    return this.http.get<Animal>(this.WITPOC_URL + `/${name}`).pipe(map (data => {
      return data[0].imageUrl;
    }));
  }
}
