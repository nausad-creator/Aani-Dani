
import { CountryActions, CountryActionTypes, LabelsActions, LabelsActionTypes, LanguageActions, LanguageActionTypes, NationalityActions, NationalityActionTypes, TempCartActions, TempCartActionTypes } from '../actions/others.action';
import { Country, Labels, Language, Nationality, TempOrders } from '../interface';

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
export interface CountryState {
	CountryList: Country[];
}
export const initialStateCountry: CountryState = {
	CountryList: []
};

export function CountryReducer(state = initialStateCountry, action: CountryActions): CountryState {
	switch (action.type) {
		case CountryActionTypes.LoadCountrySuccess:
			return { ...state, CountryList: action.data }
		case CountryActionTypes.LoadCountryFailure:
			return { ...state, CountryList: [] }
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
// Language
export interface LanguageState {
	Language: Language[];
}
export const initialStateLanguage: LanguageState = {
	Language: [{
		"languageID": "1",
		"languageName": "English"
	},
	{
		"languageID": "2",
		"languageName": "عربي"
	}]
};

export function LanguageReducer(state = initialStateLanguage, action: LanguageActions): LanguageState {
	switch (action.type) {
		case LanguageActionTypes.LoadLanguageSuccess:
			return { ...state, Language: action.data }
		case LanguageActionTypes.LoadLanguageFailure:
			return { ...state, Language: [] }
		default:
			return state;
	}
}
// Labels
export interface LabelsState {
	Labels: Labels;
}
export const initialStateLabels: LabelsState = {
	Labels: null
};

export function LabelsReducer(state = initialStateLabels, action: LabelsActions): LabelsState {
	switch (action.type) {
		case LabelsActionTypes.LoadLabelsSuccess:
			return { ...state, Labels: action.data }
		case LabelsActionTypes.LoadLabelsFailure:
			return { ...state, Labels: null }
		default:
			return state;
	}
}

