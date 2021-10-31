import { ActionReducerMap, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { categoriesReducer, CategoryState } from './categories.reducer';
import { AboutUsState, about_usReducer, faqsReducer, FaqsState, PrivacyPolicyState, privacy_policyReducer, TermsCondtionState, terms_conditionReducer } from './cms.reducers';
import { homeReducer, HomeState } from './home.reducer';
import { my_orders_reducer, MY_ORDERS_STATE } from './my-orders.reducers';
import { CountryReducer, CountryState, LabelsReducer, LabelsState, LanguageReducer, LanguageState, NationalityReducer, NationalityState, TempCartReducer, TempCartState } from './others.reducer';
import { productReducer, productReducerFastPay, ProductsState, ProductStateFastPay } from './products.reducer';
import { OrdersReducer, OrdersState } from './temp-orders.reducer';
import { wishlistReducer, WISHLIST_STATE } from './wishlists.reducers';

export interface State {
	categories: CategoryState,
	home: HomeState,
	about_us: AboutUsState,
	faqs: FaqsState,
	terms_conditions: TermsCondtionState,
	privacy_policy: PrivacyPolicyState,
	nationalities: NationalityState,
	countries: CountryState,
	tempCart: TempCartState,
	fastPay: ProductStateFastPay,
	language: LanguageState,
	labels: LabelsState,
	products: ProductsState,
	tempOrders: OrdersState,
	wishlists: WISHLIST_STATE,
	my_orders: MY_ORDERS_STATE
}

export const reducers: ActionReducerMap<State> = {
	categories: categoriesReducer,
	home: homeReducer,
	about_us: about_usReducer,
	faqs: faqsReducer,
	terms_conditions: terms_conditionReducer,
	privacy_policy: privacy_policyReducer,
	nationalities: NationalityReducer,
	countries: CountryReducer,
	tempCart: TempCartReducer,
	fastPay: productReducerFastPay,
	language: LanguageReducer,
	labels: LabelsReducer,
	products: productReducer,
	tempOrders: OrdersReducer,
	wishlists: wishlistReducer,
	my_orders: my_orders_reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

const selectHomeState = (state: State) => state.home;
const selectCategoriesState = (state: State) => state.categories;
const selectNationalityState = (state: State) => state.nationalities;
const selectCountryState = (state: State) => state.countries;
const selectAboutUsState = (state: State) => state.about_us;
const selectFaqsState = (state: State) => state.faqs;
const selectTermsConditionsState = (state: State) => state.terms_conditions;
const selectPrivacyPolicyState = (state: State) => state.privacy_policy;
const selectTempCartState = (state: State) => state.tempCart;
const selectFastPayState = (state: State) => state.fastPay;
const selectLanguageState = (state: State) => state.language;
const selectLabelsState = (state: State) => state.labels;
const selectProductState = (state: State) => state.products;
const selectOrdersState = (state: State) => state.tempOrders;
const selectWishlistState = (state: State) => state.wishlists;
const selectMyOrdersState = (state: State) => state.my_orders;

export const selectLanguage = createSelector(selectLanguageState, (state: LanguageState) => state.Language);
export const selectLabels = createSelector(selectLabelsState, (state: LabelsState) => state.Labels);
export const selectTempCart = createSelector(selectTempCartState, (state: TempCartState) => state.TempCart);
export const selectHomeBannerList = createSelector(selectHomeState, (state: HomeState) => state.home[0].banners);
export const selectHomeCategoryList = createSelector(selectHomeState, (state: HomeState) => state.home[0].category);
export const selectHomeBestSellingList = createSelector(selectHomeState, (state: HomeState) => state.home[0].bestsealling);
export const about_us = createSelector(selectAboutUsState, (state: AboutUsState) => state.about_us);
export const faqs = createSelector(selectFaqsState, (state: FaqsState) => state.faqs);
export const terms_conditions = createSelector(selectTermsConditionsState, (state: TermsCondtionState) => state.terms_conditions);
export const privacy_policy = createSelector(selectPrivacyPolicyState, (state: PrivacyPolicyState) => state.privacy_policy);
export const selectCategoryList = createSelector(selectCategoriesState, (state: CategoryState) => state.categories);
export const selectNationalyList = createSelector(selectNationalityState, (state: NationalityState) => state.Nationality);
export const selectCountryList = createSelector(selectCountryState, (state: CountryState) => state.CountryList);
export const selectProductList = createSelector(selectProductState, (state: ProductsState) => state);
export const selectTempOrdersList = createSelector(selectOrdersState, (state: OrdersState) => state);
export const selectFastPay = createSelector(selectFastPayState, (state: ProductStateFastPay) => state);
export const selectWishList = createSelector(selectWishlistState, (state: WISHLIST_STATE) => state.wishLists$);
export const select_my_orders = createSelector(selectMyOrdersState, (state: MY_ORDERS_STATE) => state.my_orders$);