import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, withLatestFrom } from 'rxjs/operators';
import { ADD_MY_ORDERS, FAILURE_MY_ORDERS, LOAD_INITIAL, MY_ORDERSACTIONTYPES, RESET_MY_ORDERS, SEARCH_ENDED_SUCCESS, SEARCH_NEW_QUERY, SEARCH_START } from '../actions/my-orders.action';
import { State } from '../reducers';
import { RootService } from '../root.service';

@Injectable()
export class My_OrdersEffects {
	INITIAL$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(MY_ORDERSACTIONTYPES.LOAD_INITIAL),
			map((r) => new RESET_MY_ORDERS(r.query)),
			map((a) => new SEARCH_START(a.query)));
	});
	UPDATES$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(MY_ORDERSACTIONTYPES.SEARCH_NEW_QUERY),
			map((r) => new RESET_MY_ORDERS(r.query)),
			map((a) => new SEARCH_START(a.query)));
	});
	FETCH_WISHLIST$ = createEffect((): Observable<SEARCH_ENDED_SUCCESS> => {
		return this.actions$.pipe(
			ofType(
				MY_ORDERSACTIONTYPES.SEARCH_START
			),
			withLatestFrom(this.store.select(state => state.my_orders.my_orders$.data)),
			switchMap(action => this.root.orders(action[0].query).pipe(
				map(data => new SEARCH_ENDED_SUCCESS(data.status === 'true' ? {
					data: data.data,
					message: data.message,
					status: data.status
				} : {
					data: [],
					message: 'No Data Found',
					status: 'false'
				}),
					catchError(() => of(new FAILURE_MY_ORDERS({
						data: [],
						message: 'No Data Found',
						status: 'false'
					})))
				), take(1))
			)
		);
	});
	SUCCESS$ = createEffect(() => {
		return this.actions$.pipe(ofType(MY_ORDERSACTIONTYPES.SEARCH_ENDED_SUCCESS),
			map((a) => new ADD_MY_ORDERS(a.payload))
		);
	});
	constructor(
		private actions$: Actions<LOAD_INITIAL | SEARCH_NEW_QUERY | SEARCH_ENDED_SUCCESS | SEARCH_START>,
		private root: RootService,
		private store: Store<State>,) { }

}
