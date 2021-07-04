import { BestSellingActions, BestSellingActionTypes } from '../actions/best-selling.actions';
import { ProductList } from '../interface';

export interface BestSellingsState {
  bestSelling: ProductList[];
}
export const initialState: BestSellingsState = {
  bestSelling: null
};

export function bestSellingReducer(state = initialState, action: BestSellingActions): BestSellingsState {
  switch (action.type) {
    case BestSellingActionTypes.LoadBestSellingsSuccess:
      return { ...state, bestSelling: action.data }
    case BestSellingActionTypes.LoadBestSellingsFailure:
      return { ...state, bestSelling: [] }
    default:
      return state;
  }
}

