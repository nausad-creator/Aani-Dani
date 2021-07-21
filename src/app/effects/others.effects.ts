import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, take } from 'rxjs/operators';
import { LoadNationalitySuccess, NationalityActionTypes, LoadNationalityFailure, LoadNationality, LoadTempCartSuccess, TempCartActionTypes, LoadTempCartFailure, LoadTempCart } from '../actions/others.action';
import { RootService } from '../root.service';

@Injectable()
export class OthersEffects {
	loadNationality$ = createEffect((): Observable<LoadNationalitySuccess> => {
		return this.actions$.pipe(
			ofType(NationalityActionTypes.LoadNationality),
			mergeMap(action => this.root.getNationality(action.temp).pipe(
				map(data => new LoadNationalitySuccess(data),
					catchError((err) => of(new LoadNationalityFailure(action.temp, err)))
				), take(1))));
	});
	// temp orders
	loadTempCart$ = createEffect((): Observable<LoadTempCartSuccess> => {
		return this.actions$.pipe(
			ofType(TempCartActionTypes.LoadTempCart),
			mergeMap(action => this.root.ordersTemp(action.temp).pipe(
				map(data => new LoadTempCartSuccess(data),
					catchError((err) => of(new LoadTempCartFailure(action.temp, err)))
				), take(1))));
	});
	constructor(
		private actions$: Actions<LoadNationality | LoadTempCart>,
		private root: RootService
	) { }

}
