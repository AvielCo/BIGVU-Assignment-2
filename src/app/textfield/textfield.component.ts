import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-textfield',
  templateUrl: './textfield.component.html',
  styleUrls: ['./textfield.component.css'],
})
export class TextfieldComponent implements OnInit {
  @Output() textChangedEvent = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}

  textChangedd() {}

  onTextChange(event: any) {
    this.textChangedEvent?.emit(event.target.value);
  }
}
