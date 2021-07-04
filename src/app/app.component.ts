import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoadBestSellings } from './actions/best-selling.actions';
import { LoadCategories } from './actions/categories.action';
import { State } from './reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  data = {
    loginuserID: '1',
    languageID: '1',
    searchWord: '',
    productID: '0',
    subcatID: '0',
    categoryID: '0',
    searchkeyword: '',
    cityName: '',
    minPrice: '',
    maxPrice: '',
    sortBy: '',
    page: '0',
    pagesize: '50',
  };
  constructor(private store: Store<State>) { }
  onActivate = () => {
    window.scroll(0, 0);
  }
  ngOnInit(): void {
    this.store.dispatch(new LoadCategories(''));
    this.store.dispatch(new LoadBestSellings(JSON.stringify(this.data)));
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
