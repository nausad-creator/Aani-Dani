import { Action } from '@ngrx/store';
import { Wishlist } from '../interface';

export enum WISHLISTACTIONTYPES {
	ADD = '[WISHLIST] ADD_WISHLIST',
	LOAD_INITIAL = '[WISHLIST] LOAD_INITIAL',
	SEARCH_START = '[WISHLIST] SEARCH_START',
	LOAD_FAILURE = '[WISHLIST] LOAD_FAILURE',
	REMOVE = '[WISHLIST] REMOVE',
	RESET = '[WISHLIST] RESET_WISHLIST',
	SEARCH_NEW_QUERY = '[WISHLIST] SEARCH_NEW_QUERY',
	SEARCH_GLOBAL = '[WISHLIST] SEARCH_GLOBAL',
	SEARCH_ENDED_SUCCESS = '[WISHLIST] SEARCH_ENDED_SUCCESS',
	SEARCH_MORE = '[WISHLIST] SEARCH_MORE'
}

export class ADD_WISHLIST implements Action {
	readonly type = WISHLISTACTIONTYPES.ADD;
	constructor(public payload: {
		count: number; data: Wishlist[]; message: string; status: string;
	}) { }
}

export class SEARCH_START implements Action {
	readonly type = WISHLISTACTIONTYPES.SEARCH_START;
	constructor(public query: string) { }
}

export class REMOVE_WISHLIST implements Action {
	readonly type = WISHLISTACTIONTYPES.REMOVE;
	constructor() { }
}

export class LOAD_INITIAL implements Action {
	readonly type = WISHLISTACTIONTYPES.LOAD_INITIAL;
	constructor(public query: string) { }
}

export class SEARCH_ENDED_SUCCESS implements Action {
	readonly type = WISHLISTACTIONTYPES.SEARCH_ENDED_SUCCESS;
	constructor(public payload: {
		count: number; data: Wishlist[]; message: string; status: string;
	}) { }
}

export class SEARCH_NEW_QUERY implements Action {
	readonly type = WISHLISTACTIONTYPES.SEARCH_NEW_QUERY;
	constructor(public query: string) { }
}

export class FAILURE_WISHLIST implements Action {
	readonly type = WISHLISTACTIONTYPES.LOAD_FAILURE;
	constructor(public err: any) { }
}

export class RESET_WISHLIST implements Action {
	readonly type = WISHLISTACTIONTYPES.RESET;
	constructor(public query: string) { }
}

export type WISHLIST_ACTIONS =
	| ADD_WISHLIST
	| REMOVE_WISHLIST
	| FAILURE_WISHLIST
	| SEARCH_START
	| LOAD_INITIAL
	| SEARCH_ENDED_SUCCESS
	| SEARCH_NEW_QUERY
	| RESET_WISHLIST;