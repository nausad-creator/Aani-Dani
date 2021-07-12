import { Action } from '@ngrx/store';
import { Nationality } from '../interface';

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

