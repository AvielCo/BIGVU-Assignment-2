import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'BIGVU-Assignment';
  bgColor: string = 'white';
  constructor() {}

  onActivate(componentRef: any) {
    this.bgColor = componentRef.router.url.split('/')[1];
  }

  onDeactivate(componentRef: any) {}
}
