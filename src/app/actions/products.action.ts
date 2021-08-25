import { Action } from '@ngrx/store';
import { ProductList } from '../interface';

export enum ProductActionTypes {
	ADD = '[Products] ADD_PRODUCTS',
	LOAD_INITIAL = '[Products] LOAD_INITIAL',
	LOAD_FAILURE = '[Products] LOAD_FAILURE',
	REMOVE = '[Products] REMOVE',
	RESET = '[Products] RESET_PRODUCTS',
	UPDATE_METADATA = '[Products] UPDATE_METADATA',
	SEARCH_NEW_QUERY = '[Products] SEARCH_NEW_QUERY',
	SEARCH_GLOBAL = '[Products] SEARCH_GLOBAL',
	SEARCH_ENDED_SUCCESS = '[Products] SEARCH_ENDED_SUCCESS',
	SEARCH_START = '[Products] SEARCH_START',
	GLOBAL_SEARCH_START = '[Products] GLOBAL_SEARCH_START',
	FILTER_START = '[Products] FILTER_START',
	SORT_START = '[Products] SORT_START',
	SEARCH_MORE = '[Products] SEARCH_MORE',
	FILTER_PRESET = '[Products] FILTER_PRESET',
	SORT_PRESET = '[Products] SORT_PRESET'
}

export class AddProducts implements Action {
	readonly type = ProductActionTypes.ADD;
	constructor(public payload: {
		data: ProductList[];
		itemscount: string;
		bestselling: ProductList[];
		message: string;
		status: string;
	}) { }
}

export class RemoveProducts implements Action {
	readonly type = ProductActionTypes.REMOVE;
	constructor() { }
}

export class SearchStart implements Action {
	readonly type = ProductActionTypes.SEARCH_START;
	constructor(public query: string) { }
}

export class FilterStart implements Action {
	readonly type = ProductActionTypes.FILTER_START;
	constructor(public query: string) { }
}

export class SortStart implements Action {
	readonly type = ProductActionTypes.SORT_START;
	constructor(public query: string) { }
}

export class GlobalSearchStart implements Action {
	readonly type = ProductActionTypes.GLOBAL_SEARCH_START;
	constructor(public query: string) { }
}

export class LoadInitial implements Action {
	readonly type = ProductActionTypes.LOAD_INITIAL;
	constructor(public query: string) { }
}

export class SearchEndedSuccess implements Action {
	readonly type = ProductActionTypes.SEARCH_ENDED_SUCCESS;
	constructor(public payload: {
		data: ProductList[];
		itemscount: string;
		bestselling: ProductList[];
		message: string;
		status: string;
	}) { }
}

export class SearchNewQuery implements Action {
	readonly type = ProductActionTypes.SEARCH_NEW_QUERY;
	constructor(public query: string) { }
}

export class SearchGlobal implements Action {
	readonly type = ProductActionTypes.SEARCH_GLOBAL;
	constructor(public query: string) { }
}

export class FilterQuery implements Action {
	readonly type = ProductActionTypes.FILTER_PRESET;
	constructor(public preset: string) { }
}

export class SortingQuery implements Action {
	readonly type = ProductActionTypes.SORT_PRESET;
	constructor(public preset: string) { }
}

export class FailureProducts implements Action {
	readonly type = ProductActionTypes.LOAD_FAILURE;
	constructor(public err: any) { }
}

export class ResetProducts implements Action {
	readonly type = ProductActionTypes.RESET;
	constructor(public query: string) { }
}

export type ProductActions =
	| AddProducts
	| RemoveProducts
	| FailureProducts
	| SearchStart
	| FilterStart
	| GlobalSearchStart
	| SortStart
	| LoadInitial
	| SearchEndedSuccess
	| SearchNewQuery
	| SearchGlobal
	| FilterQuery
	| SortingQuery
	| ResetProducts;