// Netflix API Types
export interface NetflixSubtitle {
  language: string;
  languageDescription: string;
  new_track_id: string;
  isForcedNarrative?: boolean;
  isNoneTrack?: boolean;
  rawTrackType?: string;
  ttDownloadables?: {
    [key: string]: {
      urls: Array<{ url: string }>;
    };
  };
}

export interface NetflixManifest {
  result: {
    movieId: string;
    timedtexttracks: NetflixSubtitle[];
  };
}

export interface NetflixMoviesResponse {
  result: {
    movies: {
      [movieId: string]: {
        movieId: string;
        timedtexttracks: NetflixSubtitle[];
      };
    };
  };
}

export interface NetflixAlternativeResponse {
  result: {
    result: {
      movieId: string;
      timedtexttracks: NetflixSubtitle[];
    };
  };
}

// Extension Message Types
export interface ExtensionMessage {
  type: 'NETFLIX_SUBTITLES' | 'NETFLIX_SUBTITLES_REQUEST';
  action: string;
  data?: any;
}

export interface SubtitleTrack {
  id: string;
  language: string;
  languageDescription: string;
  bestUrl: string;
  isClosedCaptions: boolean;
}

export interface TracksAvailableMessage extends ExtensionMessage {
  type: 'NETFLIX_SUBTITLES';
  action: 'TRACKS_AVAILABLE';
  data: {
    movieId: string;
    tracks: SubtitleTrack[];
  };
}

export interface DownloadRequestMessage extends ExtensionMessage {
  type: 'NETFLIX_SUBTITLES_REQUEST';
  action: 'DOWNLOAD_SUBTITLE';
  trackId: string;
}

export interface GetTracksMessage extends ExtensionMessage {
  type: 'NETFLIX_SUBTITLES_REQUEST';
  action: 'GET_TRACKS';
}

// Chrome Extension Types
export interface ChromeTab {
  id: number;
  url: string;
  title: string;
}

export interface ChromeMessage {
  action: 'checkNetflixPage' | 'getSubtitles' | 'downloadSubtitle';
  trackId?: string;
}

export interface ChromeResponse {
  success: boolean;
  isNetflixEpisode?: boolean;
  title?: string;
  url?: string;
  tracks?: SubtitleTrack[];
  movieId?: string;
  message?: string;
  error?: string;
}
