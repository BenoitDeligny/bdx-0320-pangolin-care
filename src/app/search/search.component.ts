import { Component, OnInit } from '@angular/core';
import { Animal } from '../models/animal';
import { ResearchService } from '../services/research.service';

@Component({
  selector: 'pgc-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  testingAnimal: Animal = new Animal();

  constructor(private researchService: ResearchService) { }

  ngOnInit(): void {
    this.researchService.getAnimal().subscribe(
      (animalFromServer: Animal) => {
        this.testingAnimal = animalFromServer;
      }
    );
  }

}
