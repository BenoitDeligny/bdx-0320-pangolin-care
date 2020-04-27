import { Component, OnInit } from '@angular/core';
import { Animal } from '../models/animal';
import { ResearchService } from '../services/research.service';
import { ActivatedRoute } from '@angular/router';
import { AnimalsByCountryAnswer } from '../models/animal-by-country-answer';
import { DescriptionAnswer } from '../models/description-answer';
import { Description } from '../models/description';

@Component({
  selector: 'pgc-countrypage',
  templateUrl: './countrypage.component.html',
  styleUrls: ['./countrypage.component.css']
})
export class CountrypageComponent implements OnInit {

  animalsByCountry: Animal[] = [];
  descriptions: Description[] = [];
  flagUrl = '';

  constructor(private researchService: ResearchService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params) => {
      const isocode = params.get('isocode');

      this.researchService.getAnimalsByCountry(isocode).subscribe(
        (animalsByCountryFromServer: AnimalsByCountryAnswer) => {
          const result = animalsByCountryFromServer.result;
          for (const animal of result) {
            if (animal.category === 'CR' || animal.category === 'EW') {
              this.animalsByCountry.push(animal);
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
  }
}
