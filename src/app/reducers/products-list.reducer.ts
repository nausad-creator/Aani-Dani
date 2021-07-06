import { ProductsActions, ProductsActionTypes } from '../actions/products-list.action';
import { ProductList } from '../interface';

export interface ProductsState {
  products: ProductList[];
}
export const initialState: ProductsState = {
  products: null
};

export function productsReducer(state = initialState, action: ProductsActions): ProductsState {
  switch (action.type) {
    case ProductsActionTypes.LoadProductsSuccess:
      return { ...state, products: action.data }
    case ProductsActionTypes.LoadProductsFailure:
      return { ...state, products: [] }
    default:
      return state;
  }
}

