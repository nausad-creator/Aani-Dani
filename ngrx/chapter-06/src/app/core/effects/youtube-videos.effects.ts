import { Store } from '@ngrx/store';
import { EchoesState } from '../store';
import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import 'rxjs/add/operator/withLatestFrom';

import { YoutubeVideosActions } from '../store/youtube-videos';
import { YoutubeSearch } from '../services/youtube.search';
import { YoutubeVideosInfo } from '../services/youtube-videos-info.service';

@Injectable()
export class YoutubeVideosEffects {
	constructor(
		private actions$: Actions,
		private store: Store<EchoesState>,
		private youtubeVideosActions: YoutubeVideosActions,
		private youtubeSearch: YoutubeSearch,
		private youtubeVideosInfo: YoutubeVideosInfo
	) { }

	@Effect()
	resetVideos$ = this.actions$
		.ofType(YoutubeVideosActions.SEARCH_NEW_QUERY)
		.map(toPayload)
		.filter((query: string) => this.youtubeSearch.isNewSearchQuery(query))
		.map(() => this.youtubeSearch.resetPageToken())
		.map(() => this.youtubeVideosActions.reset());

	@Effect()
	startSearch$ = this.actions$
		.ofType(YoutubeVideosActions.SEARCH_NEW_QUERY)
		.map(toPayload)
		.map((query) => this.youtubeVideosActions.searchStart(query));

	@Effect()
	searchVideos$ = this.actions$
		.ofType(YoutubeVideosActions.SEARCH_START)
		.map(toPayload)
		.switchMap((query: string) => this.youtubeSearch.search(query))
		.map((mediaItems) => mediaItems.map(video => video.id.videoId))
		.map((mediaIds) => this.youtubeVideosActions.searchEndedSuccess(mediaIds));

	@Effect()
	fetchMetadata$ = this.actions$
		.ofType(YoutubeVideosActions.SEARCH_ENDED_SUCCESS)
		.map(toPayload)
		.map((mediaIds) => mediaIds.join(','))
		.switchMap((mediaIds) => this.youtubeVideosInfo.fetchVideoData(mediaIds))
		.map((videos) => this.youtubeVideosActions.addVideos(videos));

	@Effect()
	searchMoreVideos$ = this.actions$
		.ofType(YoutubeVideosActions.SEARCH_MORE)
		.map(toPayload)
		.map(() => this.youtubeSearch.searchMore())
		.withLatestFrom(this.store.select(state => state.videos))
		.map((state) => this.youtubeVideosActions.searchStart(state[1].query));
}
