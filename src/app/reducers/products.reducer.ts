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
	isSearching: boolean;
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
	isSearching: false,
	isFilter: false,
	isSorting: false
};

export function productReducer(state = initialState, action: ProductActions): ProductsState {
	switch (action.type) {
		case ProductActionTypes.ADD:
			return { ...state, products$: action.payload }
		case ProductActionTypes.SEARCH_NEW_QUERY:
			return Object.assign({}, state, {
				query: action.query
			});
		case ProductActionTypes.SEARCH_START:
			return Object.assign({}, state, {
				isSearching: true
			});
		case ProductActionTypes.FILTER_START:
			return Object.assign({}, state, {
				isFilter: true
			});
		case ProductActionTypes.SORT_START:
			return Object.assign({}, state, {
				isSorting: true
			});
		case ProductActionTypes.SEARCH_ENDED_SUCCESS:
			return Object.assign({}, state, {
				isSearching: false,
				isFilter: false,
				isSorting: false
			});
		case ProductActionTypes.LOAD_INITIAL:
			return Object.assign({}, state, {
				query: action.query
			});
		case ProductActionTypes.RESET:
			return Object.assign({}, state, {
				results: []
			});
		case ProductActionTypes.FILTER_PRESET:
			return Object.assign({}, state, {
				preset: action.preset
			});
		case ProductActionTypes.SORT_PRESET:
			return Object.assign({}, state, {
				preset: action.preset
			});
		case ProductActionTypes.REMOVE:
			return state;
		default:
			return state;
	}
}
