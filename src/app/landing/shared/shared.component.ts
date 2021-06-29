import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, of, merge } from 'rxjs';
import { take, catchError, mergeMap, map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/authentication.service';
import { Category, ProductList } from 'src/app/interface';
import { RootService } from 'src/app/root.service';
import { SubSink } from 'subsink';
@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styles: [
  ], changeDetection: ChangeDetectionStrategy.OnPush
})
export class SharedComponent implements OnInit {
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
  constructor(
    readonly router: Router,
    private root: RootService,
    private auth: AuthenticationService,
    private route: ActivatedRoute
  ) {
    // getting auth user data
    this.subs.add(this.auth.user.subscribe(x => {
      if (x) {
        this.data.loginuserID = x.restaurantID ? x.restaurantID : '1';
      }
    }));
  }
  subs = new SubSink();
  category$: Observable<Category[]>;
  products$: Observable<ProductList[]>;
  forceReload$ = new Subject<void>();

  getProducts = () => {
    return this.root.productLists(JSON.stringify(this.data)).pipe(map((res) => res), take(1),
      catchError(() => of([]))) as Observable<ProductList[]>;
  }
  ngOnInit(): void {
    // categories
    this.category$ = this.route.snapshot.data['category'];
    // products
    const initialProducts$ = this.root.productList(JSON.stringify(this.data)) as Observable<ProductList[]>;
    const updatesProducts$ = this.forceReload$.pipe(mergeMap(() => this.getProducts() as Observable<ProductList[]>));
    this.products$ = merge(initialProducts$, updatesProducts$);
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
