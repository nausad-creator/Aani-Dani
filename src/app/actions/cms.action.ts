import { Action } from '@ngrx/store';
// about-us section
export enum AboutUsActionTypes {
	LoadAboutUs = '[About] Load About-us',
	LoadAboutUsSuccess = '[About] Load About-us Success',
	LoadAboutUsFailure = '[About] Load About-us Failure',
}

export class LoadAboutUs implements Action {
	readonly type = AboutUsActionTypes.LoadAboutUs;
	constructor(public temp: string) { }
}

export class LoadAboutUsSuccess implements Action {
	readonly type = AboutUsActionTypes.LoadAboutUsSuccess;
	constructor(public data: {
		cmspageName: string;
		cmspageContents: string;
	}) { }
}

export class LoadAboutUsFailure implements Action {
	readonly type = AboutUsActionTypes.LoadAboutUsFailure;
	constructor(public temp: string, public payload: any) { }
}


// privacy-policy section
export enum PrivacyPolicyActionTypes {
	LoadPrivacyPolicy = '[PrivacyPolicy] Load PrivacyPolicy',
	LoadPrivacyPolicySuccess = '[PrivacyPolicy] Load PrivacyPolicy Success',
	LoadPrivacyPolicyFailure = '[PrivacyPolicy] Load PrivacyPolicy Failure',
}

export class LoadPrivacyPolicy implements Action {
	readonly type = PrivacyPolicyActionTypes.LoadPrivacyPolicy;
	constructor(public temp: string) { }
}

export class LoadPrivacyPolicySuccess implements Action {
	readonly type = PrivacyPolicyActionTypes.LoadPrivacyPolicySuccess;
	constructor(public data: {
		cmspageName: string;
		cmspageContents: string;
	}) { }
}

export class LoadPrivacyPolicyFailure implements Action {
	readonly type = PrivacyPolicyActionTypes.LoadPrivacyPolicyFailure;
	constructor(public temp: string, public payload: any) { }
}


// terms-and-conditions section
export enum TermsConditionActionTypes {
	LoadTermsCondition = '[TermsCondition] Load TermsCondition',
	LoadTermsConditionSuccess = '[TermsCondition] Load TermsCondition Success',
	LoadTermsConditionFailure = '[TermsCondition] Load TermsCondition Failure',
}

export class LoadTermsCondition implements Action {
	readonly type = TermsConditionActionTypes.LoadTermsCondition;
	constructor(public temp: string) { }
}

export class LoadTermsConditionySuccess implements Action {
	readonly type = TermsConditionActionTypes.LoadTermsConditionSuccess;
	constructor(public data: {
		cmspageName: string;
		cmspageContents: string;
	}) { }
}

export class LoadTermsConditionFailure implements Action {
	readonly type = TermsConditionActionTypes.LoadTermsConditionFailure;
	constructor(public temp: string, public payload: any) { }
}


// terms-and-conditions section
export enum FaqsActionTypes {
	LoadFaqs = '[Faqs] Load Faqs',
	LoadFaqsSuccess = '[Faqs] Load Faqs Success',
	LoadFaqsFailure = '[Faqs] Load Faqs Failure',
}

export class LoadFaqs implements Action {
	readonly type = FaqsActionTypes.LoadFaqs;
	constructor() { }
}

export class LoadFaqsSuccess implements Action {
	readonly type = FaqsActionTypes.LoadFaqsSuccess;
	constructor(public data: {
		faqID: string;
		faqQuestion: string;
		faqAnswer: string;
	}[]) { }
}

export class LoadFaqsFailure implements Action {
	readonly type = FaqsActionTypes.LoadFaqsFailure;
	constructor(public payload: any) { }
}

export type CMSActions =
	LoadAboutUs |
	LoadAboutUsSuccess |
	LoadAboutUsFailure |
	LoadPrivacyPolicy |
	LoadPrivacyPolicySuccess |
	LoadPrivacyPolicyFailure |
	LoadTermsCondition |
	LoadTermsConditionySuccess |
	LoadTermsConditionFailure |
	LoadFaqs |
	LoadFaqsSuccess |
	LoadFaqsFailure

