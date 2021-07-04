import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, take } from 'rxjs/operators';
import { BestSellingActionTypes, LoadBestSellings, LoadBestSellingsFailure, LoadBestSellingsSuccess } from '../actions/best-selling.actions';
import { RootService } from '../root.service';

@Injectable()
export class BestSellingsEffects {

  loadCurrentBestSellingData$ = createEffect((): Observable<LoadBestSellingsSuccess> => {
    return this.actions$.pipe(
      ofType(BestSellingActionTypes.LoadBestSellings),
      mergeMap(action => this.root.productList(action.temp).pipe(
        // If successfull, dispatch success action with result
        map(data => new LoadBestSellingsSuccess(data),
          // If request fails, dispatch failure action with error
          catchError((err) => of(new LoadBestSellingsFailure(action.temp, err)))
        )
      )
      ), take(1)
    );
  });

  constructor(
    private actions$: Actions<LoadBestSellings>,
    private root: RootService
  ) { }

}
