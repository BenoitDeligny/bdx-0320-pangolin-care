import { Component, OnInit } from '@angular/core';
import { Animal } from '../models/animal';
import { ResearchService } from '../services/research.service';
import { Country } from '../models/country-list';
import { AnimalByCountryAnswer } from '../models/animal-by-country-answer';
import { AnimalDetailsAnswer } from '../models/animaldetailsanswer';
import { AnimalCountriesAnswer } from '../models/animal-countries-answer';
import { Description } from '../models/description';
import { DescriptionAnswer } from '../models/description-answer';

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
  descriptions: Description[];

  constructor(private researchService: ResearchService) { }

  ngOnInit(): void {
    this.researchService.getArrayOfCountries()
      .subscribe(data => this.allCountries = data);
  }

  sendRequest() {
    /* const country = this.allCountries.find(currentElement => currentElement.country.toUpperCase() === this.criteria.toUpperCase());
    if (country === undefined) {
      alert('Pays inconnu');
      return;
    } */

    // this.criteria = testing.isocode;

    this.researchService.getAnimalByCountry(this.criteria).subscribe(
      (animalByCountryFromServer: AnimalByCountryAnswer) => {
        this.animalsByCountry = animalByCountryFromServer.result;
      }
    );

    this.researchService.getAnimalDetails(this.criteria).subscribe(
      (animalFromServer: AnimalDetailsAnswer) => {
        this.animals = animalFromServer.result;
      }
    );

    this.researchService.getAnimalCountries(this.criteria).subscribe(
      (countryListFromServer: AnimalCountriesAnswer) => {
        this.countries = countryListFromServer.result;
      }
    );
    this.researchService.getAnimalDescription(this.criteria).subscribe(
      (descriptionsFromServer: DescriptionAnswer) => {
        this.descriptions = descriptionsFromServer.result;
      }
    );
  }

}
