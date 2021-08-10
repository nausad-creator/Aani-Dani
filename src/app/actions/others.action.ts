import { Action } from '@ngrx/store';
import { Labels, Language, Nationality, TempOrders } from '../interface';

export enum NationalityActionTypes {
	LoadNationality = '[Nationality] Load Nationality',
	LoadNationalitySuccess = '[Nationality] Load Nationality Success',
	LoadNationalityFailure = '[Nationality] Load Nationality Failure',
}

export class LoadNationality implements Action {
	readonly type = NationalityActionTypes.LoadNationality;
	constructor(public temp: string) { }
}

export class LoadNationalitySuccess implements Action {
	readonly type = NationalityActionTypes.LoadNationalitySuccess;
	constructor(public data: Nationality[]) { }
}

export class LoadNationalityFailure implements Action {
	readonly type = NationalityActionTypes.LoadNationalityFailure;
	constructor(public temp: string, public payload: any) { }
}

export type NationalityActions = LoadNationality | LoadNationalitySuccess | LoadNationalityFailure;

// temporary cart actions
export enum TempCartActionTypes {
	LoadTempCart = '[TempCart] Load TempCart',
	LoadTempCartSuccess = '[TempCart] Load TempCart Success',
	LoadTempCartFailure = '[TempCart] Load TempCart Failure',
}

export class LoadTempCart implements Action {
	readonly type = TempCartActionTypes.LoadTempCart;
	constructor(public temp: string) { }
}

export class LoadTempCartSuccess implements Action {
	readonly type = TempCartActionTypes.LoadTempCartSuccess;
	constructor(public data: {
		data: TempOrders[];
		status: string
		message: string
	}[]) { }
}

export class LoadTempCartFailure implements Action {
	readonly type = TempCartActionTypes.LoadTempCartFailure;
	constructor(public temp: string, public payload: any) { }
}

export type TempCartActions = LoadTempCart | LoadTempCartSuccess | LoadTempCartFailure;

// labels action
export enum LabelsActionTypes {
	LoadLabels = '[Labels] Load Labels',
	LoadLabelsSuccess = '[Labels] Load Labels Success',
	LoadLabelsFailure = '[Labels] Load Labels Failure',
}

export class LoadLabels implements Action {
	readonly type = LabelsActionTypes.LoadLabels;
	constructor(public languageID: string) { }
}

export class LoadLabelsSuccess implements Action {
	readonly type = LabelsActionTypes.LoadLabelsSuccess;
	constructor(public data: Labels) { }
}

export class LoadLabelsFailure implements Action {
	readonly type = LabelsActionTypes.LoadLabelsFailure;
	constructor(public temp: string, public payload: any) { }
}

export type LabelsActions = LoadLabels | LoadLabelsSuccess | LoadLabelsFailure;

// language action
export enum LanguageActionTypes {
	LoadLanguage = '[Language] Load Language',
	LoadLanguageSuccess = '[Language] Load Language Success',
	LoadLanguageFailure = '[Language] Load Language Failure',
}

export class LoadLanguage implements Action {
	readonly type = LanguageActionTypes.LoadLanguage;
	constructor() { }
}

export class LoadLanguageSuccess implements Action {
	readonly type = LanguageActionTypes.LoadLanguageSuccess;
	constructor(public data: Language[]) { }
}

export class LoadLanguageFailure implements Action {
	readonly type = LanguageActionTypes.LoadLanguageFailure;
	constructor(public payload: any) { }
}

export type LanguageActions = LoadLanguage | LoadLanguageSuccess | LoadLanguageFailure;

