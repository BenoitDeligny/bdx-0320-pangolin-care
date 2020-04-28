import { Component, OnInit } from '@angular/core';
import { Animal } from '../models/animal';
import { ResearchService } from '../services/research.service';
import { ActivatedRoute } from '@angular/router';
import { AnimalsByCountryAnswer } from '../models/animal-by-country-answer';
import { DescriptionAnswer } from '../models/description-answer';
import { Description } from '../models/description';

import isocodes from '../models/isocodes.json';

@Component({
  selector: 'pgc-countrypage',
  templateUrl: './countrypage.component.html',
  styleUrls: ['./countrypage.component.css']
})
export class CountrypageComponent implements OnInit {
  countryCompleteName = '';
  countries = isocodes;

  animalsByCountry: Animal[] = [];
  descriptions: Description[] = [];
  flagUrl = '';
  countryDescription = '';
  animalsIcons: string[] = [];

  constructor(private researchService: ResearchService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params) => {
      const isocode = params.get('isocode');

      for (const country of this.countries) {
        if (isocode === country.isocode) {
          this.countryCompleteName = country.country;
        }
      }

      this.researchService.getAnimalsByCountry(isocode).subscribe(
        (animalsByCountryFromServer: AnimalsByCountryAnswer) => {
          const result = animalsByCountryFromServer.result;
          for (const animal of result) {
            if (animal.category === 'CR' || animal.category === 'EW') {
              this.animalsByCountry.push(animal);
              this.researchService.getAnimalDetails(animal.scientific_name).subscribe(
                (animalDetails) => {
                  const nestedResult = animalDetails.result;
                  for (const animalResult of nestedResult) {
                    console.log(animalResult.main_common_name);
                  }
                }
              );
            }
          }
        }
      );
      this.researchService.getCountryFlag(isocode).subscribe(
        (imageURL) => {
          this.flagUrl = imageURL.flag;
        }
      );
    });
    this.researchService.getCountryDescription(this.countryCompleteName).subscribe(
      (data) => {
        this.countryDescription = data.query.pages[0].extract;
      }
    );
  }
}

