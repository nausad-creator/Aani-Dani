import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import {
	AboutUsActionTypes,
	FaqsActionTypes,
	LoadAboutUs,
	LoadAboutUsFailure,
	LoadAboutUsSuccess,
	LoadFaqs,
	LoadFaqsFailure,
	LoadFaqsSuccess,
	LoadPrivacyPolicy,
	LoadPrivacyPolicyFailure,
	LoadPrivacyPolicySuccess,
	LoadTermsCondition,
	LoadTermsConditionFailure,
	LoadTermsConditionySuccess,
	PrivacyPolicyActionTypes,
	TermsConditionActionTypes
} from '../actions/cms.action';
import { RootService } from '../root.service';

@Injectable()
export class CmsEffects {
	loadAboutUs$ = createEffect((): Observable<LoadAboutUsSuccess> => {
		return this.actions$.pipe(
			ofType(AboutUsActionTypes.LoadAboutUs),
			switchMap(action => this.root.cms(action.temp).pipe(
				map(data => new LoadAboutUsSuccess(data),
					catchError((err) => of(new LoadAboutUsFailure(action.temp, err)))
				), take(1)
			)
			)
		);
	});

	loadTermsConditions$ = createEffect((): Observable<LoadTermsConditionySuccess> => {
		return this.actions$.pipe(
			ofType(TermsConditionActionTypes.LoadTermsCondition),
			switchMap(action => this.root.cms(action.temp).pipe(
				map(data => new LoadTermsConditionySuccess(data),
					catchError((err) => of(new LoadTermsConditionFailure(action.temp, err)))
				), take(1)
			)
			)
		);
	});

	loadFaQs$ = createEffect((): Observable<LoadFaqsSuccess> => {
		return this.actions$.pipe(
			ofType(FaqsActionTypes.LoadFaqs),
			switchMap(_ => this.root.faqs().pipe(
				map(data => new LoadFaqsSuccess(data),
					catchError((err) => of(new LoadFaqsFailure(err)))
				), take(1)
			)
			)
		);
	});

	loadPrivacyPolicy$ = createEffect((): Observable<LoadPrivacyPolicySuccess> => {
		return this.actions$.pipe(
			ofType(PrivacyPolicyActionTypes.LoadPrivacyPolicy),
			switchMap(action => this.root.cms(action.temp).pipe(
				map(data => new LoadPrivacyPolicySuccess(data),
					catchError((err) => of(new LoadPrivacyPolicyFailure(action.temp, err)))
				), take(1)
			)
			)
		);
	});

	constructor(
		private actions$: Actions<LoadAboutUs | LoadTermsCondition | LoadFaqs | LoadPrivacyPolicy>,
		private root: RootService
	) { }

}
