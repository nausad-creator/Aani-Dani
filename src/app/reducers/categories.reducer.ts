import { CategoriesActionTypes, CategoryActions } from '../actions/categories.action';
import { Category } from '../interface';

export interface CategoryState {
	categories: Category[];
}
export const initialState: CategoryState = {
	categories: []
};

export function categoriesReducer(state = initialState, action: CategoryActions): CategoryState {
	switch (action.type) {
		case CategoriesActionTypes.LoadCategoriesSuccess:
			return { ...state, categories: action.data }
		case CategoriesActionTypes.LoadCategoriesFailure:
			return { ...state, categories: [] }
		default:
			return state;
	}
}

