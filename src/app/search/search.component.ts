import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Animal } from '../models/animal';
import { ResearchService } from '../services/research.service';
import { Country } from '../models/country-list';
import { Description } from '../models/description';
import { Router } from '@angular/router';

@Component({
  selector: 'pgc-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  criteria = '';
  isHidden = false;

  allCountries: Country[] = [];

  animals: Animal[] = [];
  countries: Country[] = [];
  animalsByCountry: Animal[] = [];
  descriptions: Description[];

  searchResults: Country[] = [];

  constructor(private researchService: ResearchService, private router: Router) { }

  ngOnInit(): void {
    this.researchService.getArrayOfCountries()
      .subscribe(data => this.allCountries = data);
  }

  searchResult() {
    if (this.criteria.length >= 2) {
      this.isHidden = false;
      this.searchResults = this.allCountries
        .filter(currentElement => currentElement.country.toUpperCase().includes(this.criteria.toUpperCase().trim()));
    } else if (this.criteria.length < 2) {
      this.isHidden = true;
    }
  }

  searchByCountry(searchCountry: Country) {
    this.router.navigate(['/countries', searchCountry.isocode]);
    this.isHidden = true;
    this.criteria = searchCountry.country;
  }

}
 /* this.researchService.getAnimalDescription(this.criteria).subscribe(
      (descriptionsFromServer: DescriptionAnswer) => {
        this.descriptions = descriptionsFromServer.result;
      }
    ); */
// sendRequest() {

//   // Navigate on the countries page
//   this.router.navigate(['/countries']);

//   // Convert the user Input to ISOCODE
//   const country = this.allCountries.find(currentElement => currentElement.country.toUpperCase() === this.criteria.toUpperCase());
//   if (country === undefined) {
//     alert('Pays inconnu');
//     return;
//   }
//   // this.criteria = testing.isocode;

//   // Search for list of animal IN one Country
//   this.researchService.getAnimalByCountry(country.isocode).subscribe(
//     (animalByCountryFromServer: AnimalByCountryAnswer) => {
//       this.animalsByCountry = animalByCountryFromServer.result;
//     }
//   );

//   // Search for Details of one Animal
//   this.researchService.getAnimalDetails(country.isocode).subscribe(
//     (animalFromServer: AnimalDetailsAnswer) => {
//       this.animals = animalFromServer.result;
//     }
//   );

//   // Search for all Countries in one animal lives
//   this.researchService.getAnimalCountries(country.isocode).subscribe(
//     (countryListFromServer: AnimalCountriesAnswer) => {
//       this.countries = countryListFromServer.result;
//     }
//   );
// }
