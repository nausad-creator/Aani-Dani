import { Action } from '@ngrx/store';
import { ProductList } from '../interface';

export enum BestSellingActionTypes {
  LoadBestSellings = '[BestSelling] Load BestSellings',
  LoadBestSellingsSuccess = '[BestSelling] Load BestSellings Success',
  LoadBestSellingsFailure = '[BestSelling] Load BestSellings Failure',
}

export class LoadBestSellings implements Action {
  readonly type = BestSellingActionTypes.LoadBestSellings;
  constructor(public temp: string) { }
}

export class LoadBestSellingsSuccess implements Action {
  readonly type = BestSellingActionTypes.LoadBestSellingsSuccess;
  constructor(public data: ProductList[]) { }
}

export class LoadBestSellingsFailure implements Action {
  readonly type = BestSellingActionTypes.LoadBestSellingsFailure;
  constructor(public temp: string, public payload: any) { }
}

export type BestSellingActions = LoadBestSellings | LoadBestSellingsSuccess | LoadBestSellingsFailure;

