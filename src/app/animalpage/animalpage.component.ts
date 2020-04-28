import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'pgc-animalpage',
  templateUrl: './animalpage.component.html',
  styleUrls: ['./animalpage.component.css']
})
export class AnimalpageComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const name = params.get('name');
    });
  }

}
