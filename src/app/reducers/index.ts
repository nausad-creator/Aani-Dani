import { ActionReducerMap, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { categoriesReducer, CategoryState } from './categories.reducer';
import { AboutUsState, about_usReducer, faqsReducer, FaqsState, PrivacyPolicyState, privacy_policyReducer, TermsCondtionState, terms_conditionReducer } from './cms.reducers';
import { homeReducer, HomeState } from './home.reducer';
import { NationalityReducer, NationalityState } from './others.reducer';
import { productsReducer, ProductsState } from './products-list.reducer';

export interface State {
  products: ProductsState,
  categories: CategoryState,
  home: HomeState,
  about_us: AboutUsState,
  faqs: FaqsState,
  terms_conditions: TermsCondtionState,
  privacy_policy: PrivacyPolicyState,
  nationalities: NationalityState
}

export const reducers: ActionReducerMap<State> = {
  products: productsReducer,
  categories: categoriesReducer,
  home: homeReducer,
  about_us: about_usReducer,
  faqs: faqsReducer,
  terms_conditions: terms_conditionReducer,
  privacy_policy: privacy_policyReducer,
  nationalities: NationalityReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

const selectHomeState = (state: State) => state.home;
const selectProductsState = (state: State) => state.products;
const selectCategoriesState = (state: State) => state.categories;
const selectNationalityState = (state: State) => state.nationalities;
const selectAboutUsState = (state: State) => state.about_us;
const selectFaqsState = (state: State) => state.faqs;
const selectTermsConditionsState = (state: State) => state.terms_conditions;
const selectPrivacyPolicyState = (state: State) => state.privacy_policy;

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
export const about_us = createSelector(
  selectAboutUsState, (state: AboutUsState) => state.about_us
);
export const faqs = createSelector(
  selectFaqsState, (state: FaqsState) => state.faqs
);
export const terms_conditions = createSelector(
  selectTermsConditionsState, (state: TermsCondtionState) => state.terms_conditions
);
export const privacy_policy = createSelector(
  selectPrivacyPolicyState, (state: PrivacyPolicyState) => state.privacy_policy
);
export const selectCategoryList = createSelector(
  selectCategoriesState, (state: CategoryState) => state.categories
);
export const selectNationalyList = createSelector(
  selectNationalityState, (state: NationalityState) => state.Nationality
);