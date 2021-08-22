import { PlayerService } from '../core/services/player.service';
import { YoutubeVideosInfo } from '../core/services/youtube-videos-info.service';
import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { EchoesState } from '../core/store';
import { EchoesVideos, videos, YoutubeVideosActions } from '../core/store/youtube-videos';
import { NowPlaylistActions } from '../core/store/now-playlist';

import { YoutubeSearch } from '../core/services/youtube.search';
import { NowPlaylistService } from '../core/services/now-playlist.service';

import './youtube-videos.less';

import { YoutubeMediaItemsMock } from '../../../tests/mocks/youtube.media.items';

@Component({
  selector: 'youtube-videos',
  template: `
  <article class="col-md-12">
    <div>
      <form class="navbar-form form-search" id="media-explorer"
        (ngSubmit)="search(mediaSearch.value)">
        <div class="form-group clearfix">
          <input placeholder="Explore Media" id="media-search" 
            type="search" class="form-control" autocomplete="off"
            [value]="searchQuery" #mediaSearch name="mediaSearch"
            >
          <button class="btn btn-transparent btn-submit" type="submit" title="search with echoes">
            <i class="fa fa-search"></i>
          </button>
        </div>
      </form>
    </div>
    <code>
      There are {{ (videos$ | async).length }} videos
    </code>
    <ul class="list-unstyled">
      <youtube-list [list]="videos$ | async"
        (queue)="queueSelectedVideo($event)"
        (play)="playSelectedVideo($event)"
      ></youtube-list>
    </ul>
    <section *ngIf="(videos$ | async).length">
      <button class="btn btn-primary"
        (click)="searchMore(mediaSearch.value)">
        Search More
      </button>
    </section>
  </article>
  `
})
export class YoutubeVideosComponent implements OnInit {
  videos$: Observable<EchoesVideos>;
  searchQuery: string = '';

  constructor(
    private youtubeSearch: YoutubeSearch,
    private nowPlaylistService: NowPlaylistService,
    private youtubeVideosActions: YoutubeVideosActions,
    private nowPlaylistActions: NowPlaylistActions,
    private youtubeVideosInfo: YoutubeVideosInfo,
    private playerService: PlayerService,
    private store: Store<EchoesState>
  ) {
  }

  ngOnInit() {
    this.videos$ = this.store.select(state => state.videos);
  }

  search (query: string) {
    if (this.youtubeSearch.isNewSearchQuery(query)) {
      this.store.dispatch(this.youtubeVideosActions.reset());
    }
    this.youtubeSearch
      .search(query)
      .map((mediaItems: GoogleApiYouTubeSearchResource[]) => mediaItems.map(video => video.id.videoId))
      .switchMap((mediaIds: string[]) => this.youtubeVideosInfo.fetchVideoData(mediaIds.join(',')))
      .subscribe(mediaItems => {
        this.store.dispatch(this.youtubeVideosActions.addVideos(mediaItems));
      });
  }

  playSelectedVideo (media: GoogleApiYouTubeVideoResource) {
    this.playerService.playVideo(media);
    this.queueSelectedVideo(media);
  }

  queueSelectedVideo (media) {
    this.store.dispatch(this.nowPlaylistActions.queueVideo(media));
  }

  resetPageToken() {

  }

  searchMore (query: string) {
    this.youtubeSearch.searchMore();
    this.search(query);
  }
}
