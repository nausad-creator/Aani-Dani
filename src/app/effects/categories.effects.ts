import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, take } from 'rxjs/operators';
import { CategoriesActionTypes, LoadCategories, LoadCategoriesFailure, LoadCategoriesSuccess } from '../actions/categories.action';
import { RootService } from '../root.service';

@Injectable()
export class CategoriesEffects {
	loadCategories$ = createEffect((): Observable<LoadCategoriesSuccess> => {
		return this.actions$.pipe(
			ofType(CategoriesActionTypes.LoadCategories),
			mergeMap(action => this.root.getCategories(action.temp).pipe(
				map(data => new LoadCategoriesSuccess(data),
					catchError((err) => of(new LoadCategoriesFailure(action.temp, err)))
				), take(1))
			)
		);
	});
	constructor(
		private actions$: Actions<LoadCategories>,
		private root: RootService
	) { }

}
