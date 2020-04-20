import { Component, OnInit } from '@angular/core';
import { Animal } from '../models/animal';
import { ResearchService } from '../services/research.service';
import { Country } from '../models/country-list';
import { AnimalByCountryAnswer } from '../models/animal-by-country-answer';
import { AnimalDetailsAnswer } from '../models/animaldetailsanswer';
import { AnimalCountriesAnswer } from '../models/animal-countries-answer';

@Component({
  selector: 'pgc-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  criteria = '';

  allCountries: Country[] = [];

  animals: Animal[] = [];
  countries: Country[] = [];
  animalsByCountry: Animal[] = [];

  constructor(private researchService: ResearchService) { }

  ngOnInit(): void {
    this.researchService.getArrayOfCountries()
      .subscribe(data => this.allCountries = data);
  }

  sendRequest() {
    const country = this.allCountries.find(currentElement => currentElement.country.toUpperCase() === this.criteria.toUpperCase());
    if (country === undefined) {
      alert('Pays inconnu');
      return;
    }

    // this.criteria = testing.isocode;

    this.researchService.getAnimalByCountry(country.isocode).subscribe(
      (animalByCountryFromServer: AnimalByCountryAnswer) => {
        this.animalsByCountry = animalByCountryFromServer.result;
      }
    );

    this.researchService.getAnimalDetails(country.isocode).subscribe(
      (animalFromServer: AnimalDetailsAnswer) => {
        this.animals = animalFromServer.result;
      }
    );

    this.researchService.getAnimalCountries(country.isocode).subscribe(
      (countryListFromServer: AnimalCountriesAnswer) => {
        this.countries = countryListFromServer.result;
      }
    );
  }

}
