import { Component, OnInit } from '@angular/core';
import { Animal } from '../models/animal';
import { ResearchService } from '../services/research.service';
import { Country } from '../models/country-list';
import { AnimalByCountryAnswer } from '../models/animal-by-country-answer';
import { AnimalDetailsAnswer } from '../models/animaldetailsanswer';
import { AnimalCountriesAnswer } from '../models/animal-countries-answer';
import { Router } from '@angular/router';

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

  constructor(private researchService: ResearchService, private router: Router) { }

  ngOnInit(): void {
    this.researchService.getArrayOfCountries()
      .subscribe(data => this.allCountries = data);
  }

  sendRequest() {

    // Convert the user Input to ISOCODE
    const country = this.allCountries.find(currentElement => currentElement.country.toUpperCase() === this.criteria.toUpperCase());
    if (country === undefined) {
      alert('Pays inconnu');
      return;
    }
    // this.criteria = testing.isocode;

    // Search for list of animal IN one Country
    this.researchService.getAnimalByCountry(country.isocode).subscribe(
      (animalByCountryFromServer: AnimalByCountryAnswer) => {
        this.animalsByCountry = animalByCountryFromServer.result;
      }
    );

    // Search for Details of one Animal
    this.researchService.getAnimalDetails(country.isocode).subscribe(
      (animalFromServer: AnimalDetailsAnswer) => {
        this.animals = animalFromServer.result;
      }
    );

    // Search for all Countries in one animal lives
    this.researchService.getAnimalCountries(country.isocode).subscribe(
      (countryListFromServer: AnimalCountriesAnswer) => {
        this.countries = countryListFromServer.result;
      }
    );
  }

}
