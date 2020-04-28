import { Component, OnInit } from '@angular/core';
import { Animal } from '../models/animal';
import { ResearchService } from '../services/research.service';
import { ActivatedRoute } from '@angular/router';
import { AnimalByCountryAnswer } from '../models/animal-by-country-answer';
import { DescriptionAnswer } from '../models/description-answer';
import { Description } from '../models/description';
import { Router } from '@angular/router';

@Component({
  selector: 'pgc-countrypage',
  templateUrl: './countrypage.component.html',
  styleUrls: ['./countrypage.component.css']
})
export class CountrypageComponent implements OnInit {

  animalsByCountry: Animal[] = [];
  descriptions: Description[] = [];
  animalDescriptions = [];
  criteria = '';

  constructor(private researchService: ResearchService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params) => {
      const isocode = params.get('isocode');
      this.researchService.getAnimalByCountry(isocode).subscribe(
        (animalByCountryFromServer: AnimalByCountryAnswer) => {
          const result = animalByCountryFromServer.result;
          for (const animal of result) {
            if (animal.category === 'CR' || animal.category === 'EW') {
              this.researchService.getAnimalDescription(animal.scientific_name).subscribe(
                (descriptionsFromServer: DescriptionAnswer) => {
                  const result2 = descriptionsFromServer.result;
                  this.animalDescriptions.push({name: animal.scientific_name, info: result2[0].rationale});
                  /* for (const description of result2) {
                    this.animalDescriptions.push({info: description.species_id});
                  } */
                }
              );
            }
          }
        }
      );
    });
  }

  searchAnimal(name: string){
    this.router.navigate(['/animals', name]);
  }
}
