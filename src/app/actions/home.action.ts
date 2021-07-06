import { Action } from '@ngrx/store';
import { Banner, Category, ProductList } from '../interface';

export enum HomeActionTypes {
    LoadHome = '[Home] Load Home',
    LoadHomeSuccess = '[Home] Load Home Success',
    LoadHomeFailure = '[Home] Load Home Failure',
}

export class LoadHome implements Action {
    readonly type = HomeActionTypes.LoadHome;
    constructor(public temp: string) { }
}

export class LoadHomeSuccess implements Action {
    readonly type = HomeActionTypes.LoadHomeSuccess;
    constructor(public data: {
        banners: Banner[];
        category: Category[];
        bestsealling: ProductList[];
    }[]) { }
}

export class LoadHomeFailure implements Action {
    readonly type = HomeActionTypes.LoadHomeFailure;
    constructor(public temp: string, public payload: any) { }
}

export type HomeActions = LoadHome | LoadHomeSuccess | LoadHomeFailure;

