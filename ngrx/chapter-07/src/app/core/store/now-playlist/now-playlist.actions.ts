import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class NowPlaylistActions {
	static QUEUE_LOAD_VIDEO = '[NOW PLAYLIST] QUEUE_LOAD_VIDEO';
	static QUEUE = '[NOW PLAYLIST] QUEUE';
	static QUEUE_LOAD_VIDEO_SUCCESS = '[NOW PLAYLIST] QUEUE_LOAD_VIDEO_SUCCESS';
	static SELECT = '[NOW PLAYLIST] SELECT';
	static REMOVE = '[NOW PLAYLIST] REMOVE';
	static UPDATE_INDEX = '[NOW PLAYLIST] UPDATE_INDEX';
	static QUEUE_FAILED = '[NOW PLAYLIST] QUEUE_FAILED';
	static FILTER_CHANGE = '[NOW PLAYLIST] FILTER_CHANGE';
	static REMOVE_ALL = '[NOW PLAYLIST] REMOVE_ALL';
	static SELECT_NEXT = '[NOW PLAYLIST] SELECT_NEXT';
	static SELECT_PREVIOUS = '[NOW PLAYLIST] SELECT_PREVIOUS';
	static QUEUE_VIDEOS = '[NOW PLAYLIST] QUEUE_VIDEOS';

	queueLoadVideo(media): Action {
		return {
			type: NowPlaylistActions.QUEUE_LOAD_VIDEO,
			payload: media
		};
	}

	queueVideo(media: GoogleApiYouTubeVideoResource): Action {
		return {
			type: NowPlaylistActions.QUEUE,
			payload: media
		};
	}

	updateIndexByMedia(mediaId: string): Action {
		return {
			type: NowPlaylistActions.UPDATE_INDEX,
			payload: mediaId
		};
	}

	queueFailed(media): Action {
		return {
			type: NowPlaylistActions.QUEUE_FAILED,
			payload: media
		};
	}

	queueVideos(videos: any): Action {
		return {
			type: NowPlaylistActions.QUEUE_VIDEOS,
			payload: videos
		};
	}

	selectVideo(media: GoogleApiYouTubeVideoResource): Action {
		return {
			type: NowPlaylistActions.SELECT,
			payload: media
		};
	}

	removeVideo(media): Action {
		return {
			type: NowPlaylistActions.REMOVE,
			payload: media
		};
	}

	changeFilter(filter: string): Action {
		return {
			type: NowPlaylistActions.FILTER_CHANGE,
			payload: filter
		};
	}
}
