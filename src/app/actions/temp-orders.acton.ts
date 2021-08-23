import { Action } from '@ngrx/store';
import { TempOrders } from '../interface';

export enum TempOrdersActionTypes {
	ADD = '[ORDERS] ADD_ORDERS',
	LOAD_INITIAL = '[ORDERS] LOAD_INITIAL',
	LOAD_FAILURE = '[ORDERS] LOAD_FAILURE',
	RESET = '[ORDERS] RESET_ORDERS',
	SEARCH_NEW_QUERY = '[ORDERS] SEARCH_NEW_QUERY',
	SEARCH_ENDED_SUCCESS = '[ORDERS] SEARCH_ENDED_SUCCESS',
	SEARCH_START = '[ORDERS] SEARCH_START'
}

export class AddTempOrders implements Action {
	readonly type = TempOrdersActionTypes.ADD;
	constructor(public payload: {
		data: TempOrders[];
		status: string
		message: string
	}[]) { }
}

export class SearchStart implements Action {
	readonly type = TempOrdersActionTypes.SEARCH_START;
	constructor(public query: string) { }
}

export class LoadInitial implements Action {
	readonly type = TempOrdersActionTypes.LOAD_INITIAL;
	constructor(public query: string) { }
}

export class SearchEndedSuccess implements Action {
	readonly type = TempOrdersActionTypes.SEARCH_ENDED_SUCCESS;
	constructor(public payload: {
		data: TempOrders[];
		status: string
		message: string
	}[]) { }
}

export class SearchNewQuery implements Action {
	readonly type = TempOrdersActionTypes.SEARCH_NEW_QUERY;
	constructor(public query: string) { }
}

export class FailureTempOrders implements Action {
	readonly type = TempOrdersActionTypes.LOAD_FAILURE;
	constructor(public err: any) { }
}

export class ResetTempOrders implements Action {
	readonly type = TempOrdersActionTypes.RESET;
	constructor(public query: string) { }
}

export type OrdersActions =
	| AddTempOrders
	| SearchStart
	| LoadInitial
	| SearchStart
	| SearchEndedSuccess
	| SearchNewQuery
	| ResetTempOrders