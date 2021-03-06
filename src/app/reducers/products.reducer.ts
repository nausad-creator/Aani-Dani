import { ProductActions, ProductActionTypes } from '../actions/products.action';
import { ProductList } from '../interface';

export interface ProductsState {
	products$: {
		data: ProductList[];
		itemscount: string;
		bestselling: ProductList[];
		message: string;
		status: string;
	};
	query: string;
	preset: string;
	isChange: boolean;
	isSearch: boolean;
	isFilter: boolean;
	isSorting: boolean;
}
export const initialState: ProductsState = {
	products$: {
		data: [],
		itemscount: '0',
		bestselling: [],
		message: '',
		status: ''
	},
	query: '',
	preset: '',
	isChange: false,
	isSearch: false,
	isFilter: false,
	isSorting: false
};
// fast pay
export interface ProductStateFastPay {
	data: ProductList[];
	message: string;
	status: string;
	query: string;
	isSearch: boolean;
}
export const initialStateFastPay: ProductStateFastPay = {
	data: [],
	message: '',
	status: '',
	query: '',
	isSearch: false
};

export function productReducer(state = initialState, action: ProductActions): ProductsState {
	switch (action.type) {
		case ProductActionTypes.ADD:
			return Object.assign({}, state, {
				products$: action.payload
			});
		case ProductActionTypes.SEARCH_NEW_QUERY:
			return Object.assign({}, state, {
				query: action.query
			});
		case ProductActionTypes.SEARCH_START:
			return { ...state, isChange: true }
		case ProductActionTypes.FILTER_START:
			return Object.assign({}, state, {
				isFilter: true
			});
		case ProductActionTypes.SORT_START:
			return Object.assign({}, state, {
				isSorting: true
			});
		case ProductActionTypes.GLOBAL_SEARCH_START:
			return Object.assign({}, state, {
				isSearch: true
			});
		case ProductActionTypes.SEARCH_ENDED_SUCCESS:
			return {
				...state,
				isChange: false,
				isFilter: false,
				isSorting: false,
				isSearch: false
			}
		case ProductActionTypes.LOAD_INITIAL:
			return Object.assign({}, state, {
				query: action.query
			});
		case ProductActionTypes.RESET:
			return Object.assign({}, state, {
				products$: {
					data: [],
					itemscount: '0',
					bestselling: [],
					message: '',
					status: ''
				}
			});
		case ProductActionTypes.FILTER_PRESET:
			return Object.assign({}, state, {
				preset: action.preset
			});
		case ProductActionTypes.SORT_PRESET:
			return Object.assign({}, state, {
				preset: action.preset
			});
		case ProductActionTypes.SEARCH_GLOBAL:
			return Object.assign({}, state, {
				query: action.query
			});
		case ProductActionTypes.REMOVE:
			return state;
		default:
			return state;
	}
}
// fast pay
export function productReducerFastPay(state = initialStateFastPay, action: ProductActions): ProductStateFastPay {
	switch (action.type) {
		case ProductActionTypes.ADD_FAST_PAY:
			return Object.assign({}, state, {
				data: action?.payload?.data,
				message: action?.payload?.message,
				status: action?.payload?.status,
			});
		case ProductActionTypes.SEARCH_NEW_QUERY_FAST_PAY:
			return Object.assign({}, state, {
				query: action?.query
			});
		case ProductActionTypes.SEARCH_START_FAST_PAY:
			return { ...state, isSearch: true }
		case ProductActionTypes.SEARCH_ENDED_SUCCESS_FAST_PAY:
			return {
				...state,
				isSearch: false
			}
		case ProductActionTypes.LOAD_INITIAL_FAST_PAY:
			return Object.assign({}, state, {
				query: action?.query
			});
		default:
			return state;
	}
}
