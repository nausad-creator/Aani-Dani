import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, withLatestFrom } from 'rxjs/operators';
import { ADD_WISHLIST, FAILURE_WISHLIST, LOAD_INITIAL, RESET_WISHLIST, SEARCH_ENDED_SUCCESS, SEARCH_NEW_QUERY, SEARCH_START, WISHLISTACTIONTYPES } from '../actions/wishlist.action';
import { State } from '../reducers';
import { RootService } from '../root.service';

@Injectable()
export class WishlistEffects {
	INITIAL$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(WISHLISTACTIONTYPES.LOAD_INITIAL),
			map((r) => new RESET_WISHLIST(r.query)),
			map((a) => new SEARCH_START(a.query)));
	});
	UPDATES$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(WISHLISTACTIONTYPES.SEARCH_NEW_QUERY),
			map((r) => new RESET_WISHLIST(r.query)),
			map((a) => new SEARCH_START(a.query)));
	});
	FETCH_WISHLIST$ = createEffect((): Observable<SEARCH_ENDED_SUCCESS> => {
		return this.actions$.pipe(
			ofType(
				WISHLISTACTIONTYPES.SEARCH_START
			),
			withLatestFrom(this.store.select(state => state.wishlists.wishLists$)),
			switchMap(action => this.root.wishlists(action[0].query).pipe(
				map(data => new SEARCH_ENDED_SUCCESS(data.status === 'true' ? {
					data: data.data,
					count: data.count,
					message: data.message,
					status: data.status
				} : {
					data: [],
					count: 0,
					message: 'No Data Found',
					status: 'false'
				}),
					catchError(() => of(new FAILURE_WISHLIST({
						data: [],
						count: 0,
						message: 'No Data Found',
						status: 'false'
					})))
				), take(1))
			)
		);
	});
	SUCCESS$ = createEffect(() => {
		return this.actions$.pipe(ofType(WISHLISTACTIONTYPES.SEARCH_ENDED_SUCCESS),
			map((a) => new ADD_WISHLIST(a.payload))
		);
	});
	constructor(
		private actions$: Actions<LOAD_INITIAL | SEARCH_NEW_QUERY | SEARCH_ENDED_SUCCESS | SEARCH_START>,
		private root: RootService,
		private store: Store<State>,) { }

}
