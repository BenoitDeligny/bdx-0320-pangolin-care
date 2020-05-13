import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResearchService } from '../services/research.service';
import { AnimalDetailsAnswer } from '../models/animaldetailsanswer';
import { Animal } from '../models/animal';
import { DescriptionAnswer } from '../models/description-answer';
import { Description } from '../models/description';


@Component({
  selector: 'pgc-animalpage',
  templateUrl: './animalpage.component.html',
  styleUrls: ['./animalpage.component.scss']
})
export class AnimalpageComponent implements OnInit {

  animals: Animal[] = [];
  animalsDescriptions: Description[] = [];
  descriptionString = '';
  arrow: string;
  category: string;

  displayDarkness = false;
  imageUrl = '';
  currentAnimal: Animal;

  constructor(private route: ActivatedRoute, private researchService: ResearchService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const name = params.get('name');

      this.researchService.getAnimalDetails(name).subscribe(
        (animaldetailsanswer: AnimalDetailsAnswer) => {
          this.animals = animaldetailsanswer.result;
          for (const animal of this.animals) {
            this.arrow = animal.population_trend;
            this.category = animal.category;
            this.currentAnimal = animal;
          }
        });

      this.researchService.getAnimalDescription(name).subscribe(
        (animalDescription: DescriptionAnswer) => {
          this.animalsDescriptions = animalDescription.result;
          for (const description of this.animalsDescriptions) {
            this.descriptionString = description.rationale;
          }
        }
      );

      this.researchService.getAnimalImageByName(name).subscribe(
        (data) => {
          this.imageUrl = data[0].imageUrl;
        }
      );
    });
  }

  onSendImg($event: string) {
    this.displayDarkness = false;
    this.imageUrl = $event;
    this.currentAnimal.imageUrl = $event;
    this.researchService.postAnimalImg(this.currentAnimal).subscribe(
      () => {
      }
    );
  }

  onCloseForm($event: boolean) {
    this.displayDarkness = $event;
  }
}
