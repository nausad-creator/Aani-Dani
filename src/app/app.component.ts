import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { merge, Observable, of, Subject } from 'rxjs';
import { catchError, map, mergeMap, take } from 'rxjs/operators';
import { Category } from './interface';
import { RootService } from './root.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  forceReload$ = new Subject<void>();
  category$: Observable<Category[]>;
  constructor(private root: RootService,) { }
  onActivate = () => {
    window.scroll(0, 0);
  }
  getCategories = () => {
    return this.root.getCategories('').pipe(map((res) => res), take(1),
      catchError(() => of([]))) as Observable<Category[]>;
  }
  ngOnInit(): void {
    // categories
    const initialCategory$ = this.root.categories as Observable<Category[]>;
    const updatesCategory$ = this.forceReload$.pipe(mergeMap(() => this.getCategories() as Observable<Category[]>));
    this.category$ = merge(initialCategory$, updatesCategory$);
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
