import { ActionReducerMap, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { categoriesReducer, CategoryState } from './categories.reducer';
import { homeReducer, HomeState } from './home.reducer';
import { productsReducer, ProductsState } from './products-list.reducer';

export interface State {
  products: ProductsState,
  categories: CategoryState,
  home: HomeState
}

export const reducers: ActionReducerMap<State> = {
  products: productsReducer,
  categories: categoriesReducer,
  home: homeReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

const selectHomeState = (state: State) => state.home;
const selectProductsState = (state: State) => state.products;
const selectCategoriesState = (state: State) => state.categories;

export const selectProductList = createSelector(
  selectProductsState, (state: ProductsState) => state.products
);
export const selectHomeBannerList = createSelector(
  selectHomeState, (state: HomeState) => state.home[0].banners
);
export const selectHomeCategoryList = createSelector(
  selectHomeState, (state: HomeState) => state.home[0].category
);
export const selectHomeBestSellingList = createSelector(
  selectHomeState, (state: HomeState) => state.home[0].bestsealling
);
export const selectCategoryList = createSelector(
  selectCategoriesState, (state: CategoryState) => state.categories
);