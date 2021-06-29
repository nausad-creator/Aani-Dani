import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  constructor() { }
  onActivate = () => {
    window.scroll(0, 0);
  }
  ngOnInit(): void {
    // scrolling
    jQuery(() => {
      ($(window) as any).scroll(() => {
        const windowTop = ($(window) as any).scrollTop() + 1;
        if (windowTop > 50) {
          $('body').addClass('stick-header');
        } else {
          $('body').removeClass('stick-header');
        }
      });
    })
  }
}
