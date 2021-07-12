
import { NationalityActions, NationalityActionTypes } from '../actions/others.action';
import { Nationality } from '../interface';

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

