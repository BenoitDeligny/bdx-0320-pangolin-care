import { Component, OnInit } from '@angular/core';
import { Animal } from '../models/animal';
import { ResearchService } from '../services/research.service';
import { ActivatedRoute } from '@angular/router';
import { AnimalByCountryAnswer } from '../models/animal-by-country-answer';
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
  criteria = '';

  constructor(private researchService: ResearchService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params) => {
      const isocode = params.get('isocode');
      this.researchService.getAnimalByCountry(isocode).subscribe(
        (animalByCountryFromServer: AnimalByCountryAnswer) => {
          const result = animalByCountryFromServer.result;
          for (const animal of result) {
            if (animal.category === 'CR' || animal.category === 'EW') {
              this.animalsByCountry.push(animal);
              this.researchService.getAnimalDescription(animal.scientific_name).subscribe(
                (descriptionsFromServer: DescriptionAnswer) => {
                  const result2 = descriptionsFromServer.result;
                  for (const description of result2) {
                    this.descriptions.push(description);
                  }
                  console.log(this.descriptions);
                }
              );
            }
          }
        }
      );
      /* this.researchService.getAnimalDescription(isocode).subscribe(
        (descriptionsFromServer: DescriptionAnswer) => {
          const result = descriptionsFromServer.result;
          for (const description of result) {
            this.descriptions.push(description);
          }
          console.log(this.descriptions);
        }
      ); */
    });
  }
}
