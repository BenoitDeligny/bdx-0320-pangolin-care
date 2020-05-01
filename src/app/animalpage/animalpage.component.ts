import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResearchService } from '../services/research.service';

@Component({
  selector: 'pgc-animalpage',
  templateUrl: './animalpage.component.html',
  styleUrls: ['./animalpage.component.css']
})
export class AnimalpageComponent implements OnInit {

  constructor(private route: ActivatedRoute, private researchService: ResearchService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const name = params.get('name');

      this.researchService.getAnimalDetails(name).subscribe(
        (animal) => {
          console.log(animal);
        }
      );
    });
  }

}
