import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, take } from 'rxjs/operators';
import { LoadNationalitySuccess, NationalityActionTypes, LoadNationalityFailure, LoadNationality } from '../actions/others.action';
import { RootService } from '../root.service';

@Injectable()
export class NationalityEffects {
  loadNationality$ = createEffect((): Observable<LoadNationalitySuccess> => {
    return this.actions$.pipe(
      ofType(NationalityActionTypes.LoadNationality),
      mergeMap(action => this.root.getNationality(action.temp).pipe(
        map(data => new LoadNationalitySuccess(data),
          catchError((err) => of(new LoadNationalityFailure(action.temp, err)))
        ), take(1))));
  });

  constructor(
    private actions$: Actions<LoadNationality>,
    private root: RootService
  ) { }

}
