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

  animal: Animal = {};
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
        (animaldetailsanswer: Animal) => {
          this.animal = animaldetailsanswer;
          this.arrow = this.animal.population_trend;
          this.category = this.animal.category;
          this.currentAnimal = this.animal;
        });

      this.researchService.getAnimalDescription(name).subscribe(
        (animalDescription: string) => {
          this.descriptionString = animalDescription;
        }
      );

      this.researchService.getAnimalImageByName(name).subscribe(
        (data) => {
          this.imageUrl = data;
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
