import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Picture } from '../canvas/picture.model';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
})
export class DropdownComponent implements OnInit {
  @Output() pictureChangedEvent = new EventEmitter<Picture>();
  pictures: Picture[] = [];

  activePicture?: Picture;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchPictures();
  }

  private fetchPictures() {
    this.http
      .get('https://bigvu-interviews-assets.s3.amazonaws.com/presenters.json')
      .subscribe((pictures) => console.log(pictures));
  }

  onPictureChange(picture: Picture) {
    this.activePicture = picture;
    this.pictureChangedEvent.emit(picture);
  }
}
