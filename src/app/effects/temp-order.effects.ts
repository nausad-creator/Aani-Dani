import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, withLatestFrom } from 'rxjs/operators';
import { AddTempOrders, AddToCart, FailureTempOrders, LoadInitial, ResetTempOrders, SearchEndedSuccess, SearchNewQuery, SearchStart, SearchStartAddToCart, TempOrdersActionTypes } from '../actions/temp-orders.acton';
import { State } from '../reducers';
import { RootService } from '../root.service';

@Injectable()
export class OrdersEffects {
	loadOnNavgate$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(TempOrdersActionTypes.LOAD_INITIAL),
			map((r) => new ResetTempOrders(r.query)),
			map((a) => new SearchStart(a.query)));
	});
	newSearch$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(TempOrdersActionTypes.SEARCH_NEW_QUERY),
			map((r) => new ResetTempOrders(r.query)),
			map((a) => new SearchStart(a.query)));
	});
	addToCart$ = createEffect(() => {
		return this.actions$.pipe(
			ofType(TempOrdersActionTypes.ADD_TO_CART),
			map((r) => new ResetTempOrders(r.query)),
			map((a) => new SearchStartAddToCart(a.query)));
	});
	fetchOrders$ = createEffect((): Observable<SearchEndedSuccess> => {
		return this.actions$.pipe(
			ofType(
				TempOrdersActionTypes.SEARCH_START,
				TempOrdersActionTypes.SEARCH_START_ADD_TO_CART
			),
			withLatestFrom(this.store.select(state => state.tempOrders)),
			switchMap(action => this.root.ordersTemp(action[0].query).pipe(
				map(data => new SearchEndedSuccess([{
					data: data[0]?.data?.length > 0 ? data[0].data : [{
						orderdetails: [],
						userFullName: '',
						userID: '',
						billingDetails: {
							delivery_Tip: null,
							delivery_Fee: null,
							item_Total: null,
							vat: null,
							net_Payable: null
						},
						userMobile: null,
						temporderDate: '',
						temporderID: '0'
					}],
					message: data[0]?.message,
					status: data[0]?.status
				}]),
					catchError((err) => of(new FailureTempOrders(err)))
				), take(1))
			)
		);
	});
	successOrders$ = createEffect(() => {
		return this.actions$.pipe(ofType(TempOrdersActionTypes.SEARCH_ENDED_SUCCESS),
			map((a) => new AddTempOrders(a.payload))
		);
	});
	constructor(
		private actions$: Actions<LoadInitial | SearchNewQuery | AddToCart | SearchEndedSuccess | SearchStart | SearchStartAddToCart>,
		private root: RootService,
		private store: Store<State>,) { }

}
