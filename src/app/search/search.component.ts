import { Component, OnInit } from '@angular/core';
import { Animal } from '../models/animal';
import { ResearchService } from '../services/research.service';
import { AnimalDetailsAnswer, AnimalCountriesAnswer } from '../models/server-answers';
import { Country } from '../models/country-list';

@Component({
  selector: 'pgc-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  term = '';
  myAnimal: Animal[] = [];
  myAnimalCountries: Country[] = [];

  constructor(private researchService: ResearchService) { }

  ngOnInit(): void {
  }

  sendRequest() {
    this.researchService.request(this.term);

    this.researchService.getAnimalDetails().subscribe(
      (animalFromServer: AnimalDetailsAnswer) => {
        this.myAnimal = animalFromServer.result;
      }
    );

    this.researchService.getAnimalCountries().subscribe(
      (countryListFromServer: AnimalCountriesAnswer) => {
        this.myAnimalCountries = countryListFromServer.result;
      }
    );
  }

}
