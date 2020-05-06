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
        (animalsByCountryFromServer: AnimalsByCountryAnswer) => {
          const result = animalsByCountryFromServer.result;
          for (const animal of result) {
            if (animal.category === 'CR' || animal.category === 'EW') {

              this.animalsByCountry.push(animal);
              this.researchService.getAnimalDetails(animal.scientific_name).subscribe(
                (animalDetails) => {
                  const nestedResult = animalDetails.result[0].main_common_name;

                  this.researchService.getAnimalUid(animal.scientific_name).subscribe(
                (animalUid) => {
                  const animalNameUid = animalUid.result[0].canonicalName.uid;
                  this.researchService.getAnimalImagesUid(animalNameUid).subscribe(
                    () => {
                      const animalImagesIud = animalUid.result[0].canonicalName.uid;
                      this.researchService.getAnimalIcon(animalImagesIud).subscribe(
                        (imgUrl) => {
                          this.animalsIcons.push(imgUrl);
                        }
                      );
                    }
                  );
                });
                  this.researchService.getAnimalDescription(animal.scientific_name).subscribe(
                (descriptionsFromServer: DescriptionAnswer) => {
                  const result2 = descriptionsFromServer.result;
                  this.animalDescriptions.push({ name: animal.scientific_name, info: result2[0].rationale });
                }
              );
            });
          }
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

