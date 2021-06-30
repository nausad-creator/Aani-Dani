import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-router-outlet',
  template: `
    <router-outlet (activate)="onActivate()"></router-outlet>
  `,
  styles: [
  ]
})
export class RouterOutletComponent implements OnInit {

  constructor() { }
  onActivate = () => {
    window.scroll(0, 0);
  }
  ngOnInit(): void {
  }

}
