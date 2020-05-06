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

  constructor(private researchService: ResearchService, public router: Router) { }

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
