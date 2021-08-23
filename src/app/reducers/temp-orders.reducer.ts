import { OrdersActions, TempOrdersActionTypes } from '../actions/temp-orders.acton';
import { TempOrders } from '../interface';

export interface OrdersState {
	orders$: {
		data: TempOrders[];
		status: string
		message: string
	}[];
	isSearching: boolean;
}
export const initialState: OrdersState = {
	orders$: [{
		data: [],
		message: '',
		status: ''
	}],
	isSearching: false
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
		case TempOrdersActionTypes.SEARCH_START:
			return { ...state, isSearching: true }
		case TempOrdersActionTypes.SEARCH_ENDED_SUCCESS:
			return { ...state, isSearching: false }
		case TempOrdersActionTypes.LOAD_INITIAL:
			return Object.assign({}, state, {
				query: action.query
			});
		case TempOrdersActionTypes.RESET:
			return Object.assign({}, state, {
				orders$: {
					data: [],
					itemscount: '0',
					bestselling: [],
					message: '',
					status: ''
				}
			});
		default:
			return state;
	}
}
