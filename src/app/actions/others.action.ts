import { Action } from '@ngrx/store';
import { Nationality, TempOrders } from '../interface';

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

