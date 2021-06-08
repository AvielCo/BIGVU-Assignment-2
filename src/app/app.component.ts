import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'BIGVU-Assignment';
  bgColor: string = 'white';
  constructor() {}

  ngOnInit(): void {}

  onActivate(componentRef: any) {
    this.bgColor = componentRef.router.url.split('/')[1];
  }

  onDeactivate(componentRef: any) {}
}
