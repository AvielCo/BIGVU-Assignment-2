import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Picture } from '../canvas/picture.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  text: string = '';
  picture!: Picture;
  @Input() backgroundColor?: string;

  constructor() {}

  ngOnInit(): void {}

  changeText(text: string) {
    this.text = text;
  }

  changePicture(picture: Picture) {
    this.picture = picture;
  }
}
