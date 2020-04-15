import { Component, OnInit } from '@angular/core';
import { Animal } from '../models/animal';
import { ResearchService } from '../services/research.service';
import { ServerAnswer } from '../models/server-answer';

@Component({
  selector: 'pgc-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  term = '';
  myAnimals: Animal[] = [];

  constructor(private researchService: ResearchService) { }

  ngOnInit(): void {
    this.researchService.getAnimal().subscribe(
      (animalFromServer: ServerAnswer) => {
        this.myAnimals = animalFromServer.result;
        console.log(animalFromServer);
        console.log(animalFromServer.name);
        console.log(this.myAnimals);
      }
    );
  }

  sendRequest() {
    this.researchService.request(this.term);
  }

}
