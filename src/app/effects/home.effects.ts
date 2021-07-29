import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, take } from 'rxjs/operators';
import { HomeActionTypes, LoadHome, LoadHomeFailure, LoadHomeSuccess } from '../actions/home.action';
import { RootService } from '../root.service';

@Injectable()
export class HomeEffects {
	loadHome$ = createEffect((): Observable<LoadHomeSuccess> => {
		return this.actions$.pipe(
			ofType(HomeActionTypes.LoadHome),
			mergeMap(action => this.root.home(action.temp).pipe(
				map(data => new LoadHomeSuccess(data),
					catchError((err) => of(new LoadHomeFailure(action.temp, err)))
				), take(1))
			)
		);
	});
	constructor(
		private actions$: Actions<LoadHome>,
		private root: RootService
	) { }

}
