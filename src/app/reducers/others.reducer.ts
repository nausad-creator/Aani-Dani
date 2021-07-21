
import { NationalityActions, NationalityActionTypes, TempCartActions, TempCartActionTypes } from '../actions/others.action';
import { Nationality, TempOrders } from '../interface';

export interface NationalityState {
	Nationality: Nationality[];
}
export const initialState: NationalityState = {
	Nationality: []
};

export function NationalityReducer(state = initialState, action: NationalityActions): NationalityState {
	switch (action.type) {
		case NationalityActionTypes.LoadNationalitySuccess:
			return { ...state, Nationality: action.data }
		case NationalityActionTypes.LoadNationalityFailure:
			return { ...state, Nationality: [] }
		default:
			return state;
	}
}
// temp oredrs
export interface TempCartState {
	TempCart: {
		data: TempOrders[];
		status: string
		message: string
	}[];
}
export const initialStateTempCart: TempCartState = {
	TempCart: []
};

export function TempCartReducer(state = initialStateTempCart, action: TempCartActions): TempCartState {
	switch (action.type) {
		case TempCartActionTypes.LoadTempCartSuccess:
			return { ...state, TempCart: action.data }
		case TempCartActionTypes.LoadTempCartFailure:
			return { ...state, TempCart: [] }
		default:
			return state;
	}
}

