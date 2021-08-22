import { TestBed, inject } from '@angular/core/testing';
import { Http, HttpModule } from '@angular/http';
import { YoutubeApiFactory } from './youtube-api.service';
import { YoutubeSearch } from './youtube.search';

describe('Youtube Search Service', () => {
  let service: YoutubeSearch;

  beforeEach(() => {
    let youtubeApiServiceSpy = jasmine.createSpyObj('youtubeApiServiceSpy',
      [ 'setOptions', 'setConfig', 'isNewSearchQuery', 'setNextPageToken', 'resetPageToken' ]
    );
    const youtubeApiFactory = {
      create: () => youtubeApiServiceSpy
    };
    youtubeApiServiceSpy.list = (val) => {
      return {
        map: (fn) => fn({ items: [ 'mock' ] })
      };
    };
    youtubeApiServiceSpy.config = {
      q: '',
      get: (q) => youtubeApiServiceSpy.config.q,
      set: (q) => youtubeApiServiceSpy.config.q = q
    };
    // spyOn(youtubeApiServiceSpy, 'list').and.callThrough();
    spyOn(YoutubeSearch.prototype, 'isNewSearchQuery').and.callThrough();
    spyOn(YoutubeSearch.prototype, 'resetPageToken').and.callThrough();

    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        YoutubeSearch,
        { provide: YoutubeApiFactory, useValue: youtubeApiFactory },
      ]
    });
  });

  beforeEach(inject([YoutubeSearch], (youtubeSearch) => {
    service = youtubeSearch;
  }));

  it('should have an api instance', () => {
    const actual = service.api;
    expect(actual).toBeDefined();
  });

  it('should should check if query is new before search', () => {
    const actual = service.isNewSearchQuery;
    service.search('ozrics');
    expect(actual).toHaveBeenCalled();
  });

  it('should reset page token when query is new', () => {
    const query = 'ozrics';
    service.search(query);
    const actual = service.resetPageToken;
    expect(actual).toHaveBeenCalled();
  });

  it('should NOT set the next page token when searching and asked to search more', () => {
    const query = 'ozrics';
    service.isSearching = true;
    service.searchMore();
    const actual = service.api.setNextPageToken;
    expect(actual).not.toHaveBeenCalled();
  });
});
