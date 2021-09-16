import { MY_ORDERSACTIONTYPES, MY_ORDERS_ACTIONS } from '../actions/my-orders.action';
import { Orders } from '../interface';

export interface MY_ORDERS_STATE {
	my_orders$: {
		data: Orders[];
		message: string;
		status: string;
	};
	query: string;
	preset: string;
	isChange: boolean;
	isSearch: boolean;
}
export const initialState: MY_ORDERS_STATE = {
	my_orders$: {
		data: [],
		message: 'initial_load',
		status: 'initial'
	},
	query: '',
	preset: '',
	isChange: false,
	isSearch: false
};

export function my_orders_reducer(state = initialState, action: MY_ORDERS_ACTIONS): MY_ORDERS_STATE {
	switch (action.type) {
		case MY_ORDERSACTIONTYPES.ADD:
			return Object.assign({}, state, {
				my_orders$: action.payload
			});
		case MY_ORDERSACTIONTYPES.SEARCH_NEW_QUERY:
			return Object.assign({}, state, {
				query: action.query
			});
		case MY_ORDERSACTIONTYPES.SEARCH_START:
			return { ...state, isChange: true }
		case MY_ORDERSACTIONTYPES.SEARCH_ENDED_SUCCESS:
			return {
				...state,
				isChange: false,
				isSearch: false
			}
		case MY_ORDERSACTIONTYPES.LOAD_INITIAL:
			return Object.assign({}, state, {
				query: action.query
			});
		case MY_ORDERSACTIONTYPES.RESET:
			return Object.assign({}, state, {
				my_orders$: {
					data: [],
					message: 'reset_state',
					status: 'reset'
				}
			});
		case MY_ORDERSACTIONTYPES.REMOVE:
			return state;
		default:
			return state;
	}
}
