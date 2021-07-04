import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { bestSellingReducer, BestSellingsState } from './best-selling.reducer';
import { categoriesReducer, CategoryState } from './categories.reducer';

export interface State {
  bestSellings: BestSellingsState,
  categories: CategoryState
}

export const reducers: ActionReducerMap<State> = {
  bestSellings: bestSellingReducer,
  categories: categoriesReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
