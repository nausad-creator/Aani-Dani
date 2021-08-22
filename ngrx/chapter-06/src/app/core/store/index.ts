import { NgModule } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';

import { ActionReducer, Action, combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';

// reducers
import { videos, EchoesVideos, YoutubeVideosActions } from './youtube-videos';
import { nowPlaylist, NowPlaylistActions, YoutubeMediaPlaylist } from './now-playlist';

// plugins

/**
 * we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface EchoesState {
  videos: EchoesVideos;
  nowPlaylist: YoutubeMediaPlaylist;
}

const actions = [
  YoutubeVideosActions,
  NowPlaylistActions
];

const reducers = { videos, nowPlaylist };

@NgModule({
  imports: [
    StoreModule.provideStore(reducers),
  ],
  declarations: [

  ],
  exports: [

  ],
  providers: [ ...actions ]
})
export class CoreStoreModule {};
