import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoadHome } from './actions/home.action';
import { State } from './reducers';
import { home } from 'src/app/global';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  constructor(private store: Store<State>) { }
  onActivate = () => {
    window.scroll(0, 0);
  }
  ngOnInit(): void {
    // dispatch initial action;
    this.store.dispatch(new LoadHome(JSON.stringify(home)));
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
