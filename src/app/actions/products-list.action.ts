import { Action } from '@ngrx/store';
import { ProductList } from '../interface';

export enum ProductsActionTypes {
  LoadProducts = '[Products] Load Products',
  LoadProductFilter = '[Products] Load Products Filter',
  LoadProductChange = '[Products] Load Products Change',
  LoadProductsSuccess = '[Products] Load Products Success',
  LoadProductsFailure = '[Products] Load Products Failure',
}

export class LoadProducts implements Action {
  readonly type = ProductsActionTypes.LoadProducts;
  constructor(public temp: string) { }
}

export class LoadProductsFilter implements Action {
  readonly type = ProductsActionTypes.LoadProductFilter;
  constructor(public temp: string) { }
}

export class LoadProductsChange implements Action {
  readonly type = ProductsActionTypes.LoadProductChange;
  constructor(public temp: string) { }
}

export class LoadProductsSuccess implements Action {
  readonly type = ProductsActionTypes.LoadProductsSuccess;
  constructor(public data: ProductList[]) { }
}

export class LoadProductsFailure implements Action {
  readonly type = ProductsActionTypes.LoadProductsFailure;
  constructor(public temp: string, public payload: any) { }
}

export type ProductsActions = LoadProducts | LoadProductsSuccess | LoadProductsFailure | LoadProductsFilter | LoadProductsChange;

