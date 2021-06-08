import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Picture } from '../canvas/picture.model';
import { IPicture } from '../canvas/picture.interface';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
})
export class DropdownComponent implements OnInit {
  @Output() pictureChangedEvent = new EventEmitter<Picture>();
  pictures: Picture[] = [];

  activePicture?: Picture;

  constructor(private http: HttpClient, private titleService: Title) {}

  async ngOnInit() {
    await this.fetchPictures();
  }

  private async fetchPictures() {
    const _pictures = await this.http
      .get<IPicture[]>(
        'https://bigvu-interviews-assets.s3.amazonaws.com/presenters.json'
      )
      .toPromise();
    _pictures.forEach((picture) => {
      this.pictures.push(new Picture(picture.name, picture.value));
    });
  }

  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  onPictureChange(picture: Picture) {
    this.setTitle(`BIGVU - ${picture.name}`);
    this.activePicture = picture;
    this.pictureChangedEvent.emit(picture);
  }
}
