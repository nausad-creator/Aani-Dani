import { AboutUsActionTypes, CMSActions, FaqsActionTypes, PrivacyPolicyActionTypes, TermsConditionActionTypes } from '../actions/cms.action';
// about-us state
export interface AboutUsState {
	about_us: {
		cmspageName: string;
		cmspageContents: string;
	}
}
export const initialStateAbout: AboutUsState = {
	about_us: {
		cmspageName: '',
		cmspageContents: ''
	}
};
export function about_usReducer(state = initialStateAbout, action: CMSActions): AboutUsState {
	switch (action.type) {
		case AboutUsActionTypes.LoadAboutUsSuccess:
			return { ...state, about_us: action.data }
		case AboutUsActionTypes.LoadAboutUsFailure:
			return {
				...state, about_us: {
					cmspageContents: '',
					cmspageName: ''
				}
			}
		default:
			return state;
	}
}

// terms-and-condition state
export interface TermsCondtionState {
	terms_conditions: {
		cmspageName: string;
		cmspageContents: string;
	}
}
export const initialStateTermsCondition: TermsCondtionState = {
	terms_conditions: {
		cmspageName: '',
		cmspageContents: ''
	}
};
export function terms_conditionReducer(state = initialStateTermsCondition, action: CMSActions): TermsCondtionState {
	switch (action.type) {
		case TermsConditionActionTypes.LoadTermsConditionSuccess:
			return { ...state, terms_conditions: action.data }
		case TermsConditionActionTypes.LoadTermsConditionFailure:
			return {
				...state, terms_conditions: {
					cmspageContents: '',
					cmspageName: ''
				}
			}
		default:
			return state;
	}
}

// privacy-policy state
export interface PrivacyPolicyState {
	privacy_policy: {
		cmspageName: string;
		cmspageContents: string;
	}
}
export const initialStatePrivacyPolicy: PrivacyPolicyState = {
	privacy_policy: {
		cmspageName: '',
		cmspageContents: ''
	}
};
export function privacy_policyReducer(state = initialStatePrivacyPolicy, action: CMSActions): PrivacyPolicyState {
	switch (action.type) {
		case PrivacyPolicyActionTypes.LoadPrivacyPolicySuccess:
			return { ...state, privacy_policy: action.data }
		case PrivacyPolicyActionTypes.LoadPrivacyPolicyFailure:
			return {
				...state, privacy_policy: {
					cmspageContents: '',
					cmspageName: ''
				}
			}
		default:
			return state;
	}
}

// faqs state
export interface FaqsState {
	faqs: {
		faqID: string;
		faqQuestion: string;
		faqAnswer: string;
	}[]
}
export const initialStateFaqs: FaqsState = {
	faqs: [{
		faqID: '',
		faqQuestion: '',
		faqAnswer: '',
	}]
};
export function faqsReducer(state = initialStateFaqs, action: CMSActions): FaqsState {
	switch (action.type) {
		case FaqsActionTypes.LoadFaqsSuccess:
			return { ...state, faqs: action.data }
		case FaqsActionTypes.LoadFaqsFailure:
			return {
				...state, faqs: []
			}
		default:
			return state;
	}
}
