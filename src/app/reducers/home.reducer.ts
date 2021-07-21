import { HomeActions, HomeActionTypes } from '../actions/home.action';
import { Home } from '../interface';

export interface HomeState {
	home: Home[];
}
export const initialState: HomeState = {
	home: [{
		banners: [],
		category: [],
		bestsealling: null,
	}]
};

export function homeReducer(state = initialState, action: HomeActions): HomeState {
	switch (action.type) {
		case HomeActionTypes.LoadHomeSuccess:
			return { ...state, home: action.data }
		case HomeActionTypes.LoadHomeFailure:
			return {
				...state, home: []
			}
		default:
			return state;
	}
}
