import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  collapsed = true;
  @Input() backgroundColor?: string;
  constructor() {}

  ngOnInit(): void {}

  getColor() {
    return this.backgroundColor;
  }
}
