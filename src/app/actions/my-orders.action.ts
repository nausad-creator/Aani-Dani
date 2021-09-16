import { Action } from '@ngrx/store';
import { Orders } from '../interface';

export enum MY_ORDERSACTIONTYPES {
	ADD = '[MY_ORDERS] ADD_MY_ORDERS',
	LOAD_INITIAL = '[MY_ORDERS] LOAD_INITIAL',
	SEARCH_START = '[MY_ORDERS] SEARCH_START',
	LOAD_FAILURE = '[MY_ORDERS] LOAD_FAILURE',
	REMOVE = '[MY_ORDERS] REMOVE',
	RESET = '[MY_ORDERS] RESET_MY_ORDERS',
	SEARCH_NEW_QUERY = '[MY_ORDERS] SEARCH_NEW_QUERY',
	SEARCH_GLOBAL = '[MY_ORDERS] SEARCH_GLOBAL',
	SEARCH_ENDED_SUCCESS = '[MY_ORDERS] SEARCH_ENDED_SUCCESS',
	SEARCH_MORE = '[MY_ORDERS] SEARCH_MORE'
}

export class ADD_MY_ORDERS implements Action {
	readonly type = MY_ORDERSACTIONTYPES.ADD;
	constructor(public payload: {
		data: Orders[]; message: string; status: string;
	}) { }
}

export class SEARCH_START implements Action {
	readonly type = MY_ORDERSACTIONTYPES.SEARCH_START;
	constructor(public query: string) { }
}

export class REMOVE_MY_ORDERS implements Action {
	readonly type = MY_ORDERSACTIONTYPES.REMOVE;
	constructor() { }
}

export class LOAD_INITIAL implements Action {
	readonly type = MY_ORDERSACTIONTYPES.LOAD_INITIAL;
	constructor(public query: string) { }
}

export class SEARCH_ENDED_SUCCESS implements Action {
	readonly type = MY_ORDERSACTIONTYPES.SEARCH_ENDED_SUCCESS;
	constructor(public payload: {
		data: Orders[]; message: string; status: string;
	}) { }
}

export class SEARCH_NEW_QUERY implements Action {
	readonly type = MY_ORDERSACTIONTYPES.SEARCH_NEW_QUERY;
	constructor(public query: string) { }
}

export class FAILURE_MY_ORDERS implements Action {
	readonly type = MY_ORDERSACTIONTYPES.LOAD_FAILURE;
	constructor(public err: any) { }
}

export class RESET_MY_ORDERS implements Action {
	readonly type = MY_ORDERSACTIONTYPES.RESET;
	constructor(public query: string) { }
}

export type MY_ORDERS_ACTIONS =
	| ADD_MY_ORDERS
	| REMOVE_MY_ORDERS
	| FAILURE_MY_ORDERS
	| SEARCH_START
	| LOAD_INITIAL
	| SEARCH_ENDED_SUCCESS
	| SEARCH_NEW_QUERY
	| RESET_MY_ORDERS;