import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { LoadProducts, LoadProductsChange, LoadProductsFailure, LoadProductsFilter, LoadProductsSuccess, ProductsActionTypes } from '../actions/products-list.action';
import { RootService } from '../root.service';

@Injectable()
export class ProductsEffects {

  loadProductsData$ = createEffect((): Observable<LoadProductsSuccess> => {
    return this.actions$.pipe(
      ofType(
        ProductsActionTypes.LoadProducts,
        ProductsActionTypes.LoadProductFilter,
        ProductsActionTypes.LoadProductChange,
      ),
      switchMap(action => this.root.productList(action.temp)
        .pipe(map(data => new LoadProductsSuccess(data),
          catchError((err) => of(new LoadProductsFailure(action.temp, err)))))), take(1)
    );
  });
  constructor(
    private actions$: Actions<LoadProducts | LoadProductsFilter | LoadProductsChange | LoadProductsSuccess | LoadProductsFailure>,
    private root: RootService
  ) { }
}
