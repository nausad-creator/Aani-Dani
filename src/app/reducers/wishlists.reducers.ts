import { WISHLISTACTIONTYPES, WISHLIST_ACTIONS } from '../actions/wishlist.action';
import { Wishlist } from '../interface';

export interface WISHLIST_STATE {
	wishLists$: {
		count: number;
		data: Wishlist[];
		message: string;
		status: string;
	};
	query: string;
	preset: string;
	isChange: boolean;
	isSearch: boolean;
}
export const initialState: WISHLIST_STATE = {
	wishLists$: {
		count: 0,
		data: [],
		message: 'initial_load',
		status: 'initial'
	},
	query: '',
	preset: '',
	isChange: false,
	isSearch: false
};

export function wishlistReducer(state = initialState, action: WISHLIST_ACTIONS): WISHLIST_STATE {
	switch (action.type) {
		case WISHLISTACTIONTYPES.ADD:
			return Object.assign({}, state, {
				wishLists$: action.payload
			});
		case WISHLISTACTIONTYPES.SEARCH_NEW_QUERY:
			return Object.assign({}, state, {
				query: action.query
			});
		case WISHLISTACTIONTYPES.SEARCH_START:
			return { ...state, isChange: true }
		case WISHLISTACTIONTYPES.SEARCH_ENDED_SUCCESS:
			return {
				...state,
				isChange: false,
				isSearch: false
			}
		case WISHLISTACTIONTYPES.LOAD_INITIAL:
			return Object.assign({}, state, {
				query: action.query
			});
		case WISHLISTACTIONTYPES.RESET:
			return Object.assign({}, state, {
				wishLists$: {
					count: 0,
					data: [],
					message: 'reset_state',
					status: 'reset'
				}
			});
		case WISHLISTACTIONTYPES.REMOVE:
			return state;
		default:
			return state;
	}
}
