import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pgc-img-form',
  templateUrl: './img-form.component.html',
  styleUrls: ['./img-form.component.scss']
})
export class ImgFormComponent implements OnInit {

  imgUrl = '';

  @Output() imageUrl = new EventEmitter<string>();
  @Output() isDark = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  sendImage(imgUrl: string, dark: boolean) {
    this.imageUrl.emit(imgUrl);
    this.isDark.emit(dark);
  }
}
