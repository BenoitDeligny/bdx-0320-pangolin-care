import { Component, OnInit } from '@angular/core';
import { Animal } from '../models/animal';
import { ResearchService } from '../services/research.service';
import { ActivatedRoute } from '@angular/router';
import { AnimalsByCountryAnswer } from '../models/animal-by-country-answer';
import { DescriptionAnswer } from '../models/description-answer';
import { Description } from '../models/description';
import { Router } from '@angular/router';

import isocodes from '../models/isocodes.json';

@Component({
  selector: 'pgc-countrypage',
  templateUrl: './countrypage.component.html',
  styleUrls: ['./countrypage.component.scss']
})
export class CountrypageComponent implements OnInit {
  countryCompleteName = '';
  countries = isocodes;

  animalsByCountry: Animal[] = [];
  descriptions: Description[] = [];

  flagUrl = '';
  countryDescription = '';
  animalsIcons: string[] = [];

  animalDescriptions = [];
  criteria = '';

  isLoading = true;


  constructor(private researchService: ResearchService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params) => {
      const isocode = params.get('isocode');

      for (const country of this.countries) {
        if (isocode === country.isocode) {
          this.countryCompleteName = country.country;
        }
      }

      this.researchService.getAnimalsByCountry(isocode).subscribe(
        (animalsByCountryFromServer: Animal[]) => {
          const results = animalsByCountryFromServer;
          for (const animal of results) {
            this.animalsByCountry.push(animal);
            this.researchService.getAnimalDescription(animal.scientific_name).subscribe(
              (descriptionsFromServer: string) => {
                const result2 = descriptionsFromServer;
                this.animalDescriptions.push({ name: animal.scientific_name, info: result2});
                this.isLoading = false;
              }
            );
          }
        });
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

  searchAnimal(name: string) {
    this.router.navigate(['/animals', name]);
  }

}

