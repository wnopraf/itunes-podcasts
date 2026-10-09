interface Label {
  label: string;
}

interface LabelWithAttributes<T extends Record<string, unknown>> extends Label {
  attributes: T;
}

export interface PodcastEntryApiDto {
  'im:name': Label;
  'im:image': LabelWithAttributes<{ height: string }>[];
  summary: Label;
  'im:price': LabelWithAttributes<{ amount: string; currency: string }>;
  'im:contentType': { attributes: { term: string; label: string } };
  rights?: Label;
  title: Label;
  link: { attributes: { rel: string; type: string; href: string } };
  id: LabelWithAttributes<{ 'im:id': string }>;
  'im:artist': LabelWithAttributes<{ href: string }>;
  category: { attributes: { 'im:id': string; term: string; scheme: string; label: string } };
  'im:releaseDate': LabelWithAttributes<{ label: string }>;
}

export interface PodcastsResponseApiDto {
  feed: {
    author: { name: Label; uri: Label };
    entry: PodcastEntryApiDto[];
    updated: Label;
    rights: Label;
    title: Label;
    icon: Label;
    link: { attributes: { rel: string; type?: string; href: string } }[];
    id: Label;
  };
}

export interface PodcastLookupApiDto {
  wrapperType: 'track';
  kind: 'podcast';
  collectionId: number;
  trackId: number;
  artistId?: number;
  artistName: string;
  collectionName: string;
  trackName: string;
  collectionCensoredName: string;
  trackCensoredName: string;
  artistViewUrl?: string;
  collectionViewUrl: string;
  feedUrl: string;
  trackViewUrl: string;
  artworkUrl30: string;
  artworkUrl60: string;
  artworkUrl100: string;
  artworkUrl600: string;
  collectionPrice: number;
  trackPrice: number;
  collectionHdPrice: number;
  releaseDate: string;
  collectionExplicitness: string;
  trackExplicitness: string;
  trackCount: number;
  trackTimeMillis?: number;
  country: string;
  currency: string;
  primaryGenreName: string;
  contentAdvisoryRating?: string;
  genreIds: string[];
  genres: string[];
}
