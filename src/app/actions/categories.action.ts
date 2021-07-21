import { Action } from '@ngrx/store';
import { Category } from '../interface';

export enum CategoriesActionTypes {
	LoadCategories = '[Category] Load Categories',
	LoadCategoriesSuccess = '[Category] Load Categories Success',
	LoadCategoriesFailure = '[Category] Load Categories Failure',
}

export class LoadCategories implements Action {
	readonly type = CategoriesActionTypes.LoadCategories;
	constructor(public temp: string) { }
}

export class LoadCategoriesSuccess implements Action {
	readonly type = CategoriesActionTypes.LoadCategoriesSuccess;
	constructor(public data: Category[]) { }
}

export class LoadCategoriesFailure implements Action {
	readonly type = CategoriesActionTypes.LoadCategoriesFailure;
	constructor(public temp: string, public payload: any) { }
}

export type CategoryActions = LoadCategories | LoadCategoriesSuccess | LoadCategoriesFailure;

