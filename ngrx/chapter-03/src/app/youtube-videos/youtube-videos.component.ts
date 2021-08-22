import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { EchoesState } from '../core/store';
import { EchoesVideos, videos, YoutubeVideosActions } from '../core/store/youtube-videos';

import { YoutubeSearch } from '../core/services/youtube.search';
import { NowPlaylistService } from '../core/services/now-playlist.service';

import './youtube-videos.less';

import { YoutubeMediaItemsMock } from '../../../tests/mocks/youtube.media.items';

@Component({
  selector: 'youtube-videos',
  template: `
  <article class="col-md-12">
    <h1>Search Results</h1>
    <code>
      There are {{ (videos$ | async).length }} videos
    </code>
    <ul class="list-unstyled">
      <li *ngFor="let video of (videos$ | async)">
        <img [src]="video.snippet.thumbnails.default.url">
        {{ video.snippet.title }}
      </li>
    </ul>
  </article>
  `
})
export class YoutubeVideosComponent implements OnInit {
  videos$: Observable<EchoesVideos>;

  constructor(
    private youtubeSearch: YoutubeSearch,
    private nowPlaylistService: NowPlaylistService,
    private youtubeVideosActions: YoutubeVideosActions,
    private store: Store<EchoesState>
  ) {
  }

  ngOnInit() {
    this.videos$ = this.store.select(state => state.videos);
    this.store.dispatch(this.youtubeVideosActions.addVideos(<any>YoutubeMediaItemsMock));
  }

  search (query: string) {

  }

  playSelectedVideo (media: GoogleApiYouTubeSearchResource) {



  }

  queueSelectedVideo (media: GoogleApiYouTubeSearchResource) {

  }

  resetPageToken() {

  }

  searchMore () {

  }
}
