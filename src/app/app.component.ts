import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoadHome } from './actions/home.action';
import { State } from './reducers';
import { about_us, home, privacy_policy, search, terms_conditions } from 'src/app/global';
import { LoadAboutUs, LoadFaqs, LoadPrivacyPolicy, LoadTermsCondition } from './actions/cms.action';
import { LoadNationality } from './actions/others.action';
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
    this.store.dispatch(new LoadAboutUs(about_us.code));
    this.store.dispatch(new LoadTermsCondition(terms_conditions.code));
    this.store.dispatch(new LoadFaqs());
    this.store.dispatch(new LoadPrivacyPolicy(privacy_policy.code));
    this.store.dispatch(new LoadNationality(search.code));
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
