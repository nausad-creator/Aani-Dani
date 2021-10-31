import { OrdersActions, TempOrdersActionTypes } from '../actions/temp-orders.acton';
import { TempOrders } from '../interface';

export interface OrdersState {
	orders$: {
		data: TempOrders[];
		status: string
		message: string
	}[];
	isSearching: boolean;
	onAdd: boolean;
}
export const initialState: OrdersState = {
	orders$: [{
		data: [],
		message: '',
		status: ''
	}],
	isSearching: false,
	onAdd: false
};

export function OrdersReducer(state = initialState, action: OrdersActions): OrdersState {
	switch (action.type) {
		case TempOrdersActionTypes.ADD:
			return Object.assign({}, state, {
				orders$: action.payload
			});
		case TempOrdersActionTypes.SEARCH_NEW_QUERY:
			return Object.assign({}, state, {
				query: action.query
			});
		case TempOrdersActionTypes.ADD_TO_CART:
			return Object.assign({}, state, {
				query: action.query
			});
		case TempOrdersActionTypes.SEARCH_START:
			return {
				...state,
				isSearching: true
			}
		case TempOrdersActionTypes.SEARCH_START_ADD_TO_CART:
			return {
				...state,
				onAdd: true
			}
		case TempOrdersActionTypes.SEARCH_ENDED_SUCCESS:
			return {
				...state,
				onAdd: false,
				isSearching: false
			}
		case TempOrdersActionTypes.LOAD_INITIAL:
			return Object.assign({}, state, {
				query: action.query
			});
		case TempOrdersActionTypes.RESET:
			return Object.assign({}, state, {
				orders$: [{
					data: [],
					message: '',
					status: ''
				}],
			});
		default:
			return state;
	}
}
