import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Category, ProductList } from 'src/app/interface';
import { State } from 'src/app/reducers';
@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styles: [
  ], changeDetection: ChangeDetectionStrategy.OnPush
})
export class SharedComponent implements OnInit, OnDestroy {

  products$: Observable<ProductList[]> = this.store.select(state => state.bestSellings.bestSelling);
  categories$:  Observable<Category[]> = this.store.select(state => state.categories.categories);

  constructor(
    readonly router: Router,
    private store: Store<State>) {}

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
  }
}
