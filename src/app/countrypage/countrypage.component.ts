import { Component, OnInit } from '@angular/core';
import { Animal } from '../models/animal';

@Component({
  selector: 'pgc-countrypage',
  templateUrl: './countrypage.component.html',
  styleUrls: ['./countrypage.component.css']
})
export class CountrypageComponent implements OnInit {

  animalsByCountry: Animal[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  getCountrySelected(country){
    this.animalsByCountry.push(country);
    console.log(this.animalsByCountry);

  }

}
