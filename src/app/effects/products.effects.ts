import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';
import { AddProducts, FailureProducts, FilterQuery, FilterStart, GlobalSearchStart, LoadInitial, ProductActionTypes, ResetProducts, SearchEndedSuccess, SearchGlobal, SearchNewQuery, SearchStart, SortingQuery, SortStart } from '../actions/products.action';
import { State } from '../reducers';
import { RootService } from '../root.service';

@Injectable()
export class ProductsEffects {
	loadOnNavgate$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(ProductActionTypes.LOAD_INITIAL),
			map((r) => new ResetProducts(r.query)),
			map((a) => new SearchStart(a.query)));
	});
	filter$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(ProductActionTypes.FILTER_PRESET),
			map((r) => new ResetProducts(r.preset)),
			withLatestFrom(this.store.select(state => state.products.preset)),
			map((state) => new FilterStart(state[1])));
	});
	sort$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(ProductActionTypes.SORT_PRESET),
			map((r) => new ResetProducts(r.preset)),
			withLatestFrom(this.store.select(state => state.products.preset)),
			map((state) => new SortStart(state[1])));
	});
	search$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(ProductActionTypes.SEARCH_GLOBAL),
			map((r) => new ResetProducts(r.query)),
			withLatestFrom(this.store.select(state => state.products.query)),
			map((state) => new GlobalSearchStart(state[1])));
	});
	change$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(ProductActionTypes.SEARCH_NEW_QUERY),
			filter((action) => this.root.isNewSearchQuery(action.query)),
			map((r) => new ResetProducts(r.query)),
			map((a) => new SearchStart(a.query)));
	});
	fetchProduct$ = createEffect((): Observable<SearchEndedSuccess> => {
		return this.actions$.pipe(
			ofType(
				ProductActionTypes.GLOBAL_SEARCH_START,
				ProductActionTypes.SEARCH_START,
				ProductActionTypes.FILTER_START,
				ProductActionTypes.SORT_START
			),
			withLatestFrom(this.store.select(state => state.products)),
			switchMap(action => this.root.productLists(action[0].query).pipe(
				map(data => new SearchEndedSuccess({
					data: data?.data?.length > 0 ? data.data : [],
					bestselling: data?.bestselling?.length > 0 ? data.bestselling : [],
					message: data?.message,
					status: data?.status,
					itemscount: data?.itemscount
				}),
					catchError((err) => of(new FailureProducts(err)))
				), take(1))
			)
		);
	});
	successProduct$ = createEffect(() => {
		return this.actions$.pipe(ofType(ProductActionTypes.SEARCH_ENDED_SUCCESS),
			map((a) => new AddProducts(a.payload))
		);
	});
	constructor(
		private actions$: Actions<
			SearchNewQuery |
			SearchStart |
			SearchEndedSuccess |
			LoadInitial |
			FilterQuery |
			SortingQuery |
			FilterStart |
			SearchGlobal |
			ResetProducts |
			GlobalSearchStart |
			SortStart>,
		private root: RootService,
		private store: Store<State>,) { }

}
