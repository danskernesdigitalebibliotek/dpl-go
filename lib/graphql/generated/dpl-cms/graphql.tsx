import { useQuery, useSuspenseQuery, UseQueryOptions, UseSuspenseQueryOptions } from '@tanstack/react-query';
import { fetcher } from '@/lib/graphql/fetchers/dpl-cms.fetcher';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Cursor: { input: unknown; output: unknown; }
  Email: { input: unknown; output: unknown; }
  Html: { input: unknown; output: unknown; }
  PhoneNumber: { input: unknown; output: unknown; }
  Time: { input: unknown; output: unknown; }
  TimeZone: { input: unknown; output: unknown; }
  Timestamp: { input: unknown; output: unknown; }
  UntypedStructuredData: { input: unknown; output: unknown; }
  UtcOffset: { input: unknown; output: unknown; }
};

/** Complex address data. */
export type Address = {
  __typename?: 'Address';
  additionalName?: Maybe<Scalars['String']['output']>;
  addressLine1?: Maybe<Scalars['String']['output']>;
  addressLine2?: Maybe<Scalars['String']['output']>;
  administrativeArea?: Maybe<Scalars['String']['output']>;
  country?: Maybe<AddressCountry>;
  dependentLocality?: Maybe<Scalars['String']['output']>;
  familyName?: Maybe<Scalars['String']['output']>;
  givenName?: Maybe<Scalars['String']['output']>;
  langcode?: Maybe<Scalars['String']['output']>;
  locality?: Maybe<Scalars['String']['output']>;
  organization?: Maybe<Scalars['String']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  sortingCode?: Maybe<Scalars['String']['output']>;
};

/** Address country. */
export type AddressCountry = {
  __typename?: 'AddressCountry';
  /** The code of the country. */
  code?: Maybe<Scalars['String']['output']>;
  /** The name of the country. */
  name?: Maybe<Scalars['String']['output']>;
};

/** A paginated set of results. */
export type Connection = {
  /** The edges of this connection. */
  edges: Array<Edge>;
  /** The nodes of the edges of this connection. */
  nodes: Array<EdgeNode>;
  /** Information to aid in pagination. */
  pageInfo: ConnectionPageInfo;
};

/** Information about the page in a connection. */
export type ConnectionPageInfo = {
  __typename?: 'ConnectionPageInfo';
  /** The cursor for the last element in this page. */
  endCursor?: Maybe<Scalars['Cursor']['output']>;
  /** Whether there are more pages in this connection. */
  hasNextPage: Scalars['Boolean']['output'];
  /** Whether there are previous pages in this connection. */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** The cursor for the first element in this page. */
  startCursor?: Maybe<Scalars['Cursor']['output']>;
};

/** Choose how your sorts will occur and on which field. */
export enum ConnectionSortKeys {
  /** Sort by creation date */
  CreatedAt = 'CREATED_AT',
  /** Sort by promoted status. */
  Promoted = 'PROMOTED',
  /** Sort by sticky status. */
  Sticky = 'STICKY',
  /** Sort by entity title. */
  Title = 'TITLE',
  /** Sort by updated date */
  UpdatedAt = 'UPDATED_AT',
  /** Sort by term weight. */
  Weight = 'WEIGHT'
}

/** A Date range has a start and an end. */
export type DateRange = {
  __typename?: 'DateRange';
  /** The end of the date range. */
  end?: Maybe<DateTime>;
  /** The start of the date range. */
  start?: Maybe<DateTime>;
};

/** A DateTime object. */
export type DateTime = {
  __typename?: 'DateTime';
  /** A string that will have a value of format ±hh:mm */
  offset: Scalars['UtcOffset']['output'];
  /** RFC 3339 compliant time string. */
  time: Scalars['Time']['output'];
  /** Type represents date and time as number of milliseconds from start of the UNIX epoch. */
  timestamp: Scalars['Timestamp']['output'];
  /** A field whose value exists in the standard IANA Time Zone Database. */
  timezone: Scalars['TimeZone']['output'];
};

/** DPL Configuration. */
export type DplConfiguration = {
  __typename?: 'DplConfiguration';
  unilogin?: Maybe<UniloginConfiguration>;
};

/**
 * An edge in a connection.
 * Provides the cursor to fetch data based on the position of the associated
 * node. Specific edge implementations may provide more information about the
 * relationship they represent.
 */
export type Edge = {
  cursor: Scalars['Cursor']['output'];
  node: EdgeNode;
};

/** This entity is accessible over an Edge connection. */
export type EdgeNode = {
  id: Scalars['ID']['output'];
};

/** A file object to represent an managed file. */
export type File = {
  __typename?: 'File';
  /** The description of the file. */
  description?: Maybe<Scalars['String']['output']>;
  /** The mime type of the file. */
  mime?: Maybe<Scalars['String']['output']>;
  /** The name of the file. */
  name?: Maybe<Scalars['String']['output']>;
  /** Filens størrelse i bytes. */
  size: Scalars['Int']['output'];
  /** The URL of the file. */
  url: Scalars['String']['output'];
};

/** A image object to represent an managed file. */
export type Image = {
  __typename?: 'Image';
  /** The alt text of the image. */
  alt?: Maybe<Scalars['String']['output']>;
  /** The height of the image. */
  height: Scalars['Int']['output'];
  /** The mime type of the image. */
  mime?: Maybe<Scalars['String']['output']>;
  /** The size of the image in bytes. */
  size: Scalars['Int']['output'];
  /** The title text of the image. */
  title?: Maybe<Scalars['String']['output']>;
  /** The URL of the image. */
  url: Scalars['String']['output'];
  /** The width of the image. */
  width: Scalars['Int']['output'];
};

/** Generic input for key-value pairs. */
export type KeyValueInput = {
  key: Scalars['String']['input'];
  value?: InputMaybe<Scalars['String']['input']>;
};

/** A language definition provided by the CMS. */
export type Language = {
  __typename?: 'Language';
  /** The language direction. */
  direction?: Maybe<Scalars['String']['output']>;
  /** Sprogkoden. */
  id?: Maybe<Scalars['ID']['output']>;
  /** Sprogets navn. */
  name?: Maybe<Scalars['String']['output']>;
};

/** A link. */
export type Link = {
  __typename?: 'Link';
  /** Whether the link is internal to this website. */
  internal: Scalars['Boolean']['output'];
  /** The title of the link. */
  title?: Maybe<Scalars['String']['output']>;
  /** The URL of the link. */
  url?: Maybe<Scalars['String']['output']>;
};

/** Entity type media. */
export type MediaDocument = MediaInterface & {
  __typename?: 'MediaDocument';
  /** The time the media item was last edited. */
  changed: DateTime;
  /** The time the media item was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** Sprog */
  langcode: Language;
  /** Fil */
  mediaFile: File;
  /** Navn */
  name: Scalars['String']['output'];
  /** Alternativ URL */
  path: Scalars['String']['output'];
  /** Publiceret */
  status: Scalars['Boolean']['output'];
};

/** Entity type media. */
export type MediaImage = MediaInterface & {
  __typename?: 'MediaImage';
  /** Bruges til fotokreditering og info om copyright. Vises som regel ved siden af billedet. */
  byline?: Maybe<Scalars['String']['output']>;
  /** The time the media item was last edited. */
  changed: DateTime;
  /** The time the media item was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** Sprog */
  langcode: Language;
  /**
   * Du kan indstille et fokuspunkt ved at klikke på forhåndsvisningen af
   * billedet og flytte det hvide mål.<br /><br />Ved at indstille et fokuspunkt
   * fortæller du systemet, hvilken del af billedet der skal være i fokus, når
   * det beskæres.<br /><br />Brug funktionen "forhåndsvisning" til at se,
   * hvordan dit billede vil blive beskåret på tværs af billedstil.
   */
  mediaImage: Image;
  /** Navn */
  name: Scalars['String']['output'];
  /** Alternativ URL */
  path: Scalars['String']['output'];
  /** Publiceret */
  status: Scalars['Boolean']['output'];
};

/** Entity type media. */
export type MediaInterface = {
  /** The time the media item was last edited. */
  changed: DateTime;
  /** The time the media item was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** Sprog */
  langcode: Language;
  /** Navn */
  name: Scalars['String']['output'];
  /** Alternativ URL */
  path: Scalars['String']['output'];
  /** Publiceret */
  status: Scalars['Boolean']['output'];
};

/** Entity type media. */
export type MediaUnion = MediaDocument | MediaImage | MediaVideo;

/** Entity type media. */
export type MediaVideo = MediaInterface & {
  __typename?: 'MediaVideo';
  /** The time the media item was last edited. */
  changed: DateTime;
  /** The time the media item was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** Sprog */
  langcode: Language;
  /** URL til video */
  mediaOembedVideo: Scalars['String']['output'];
  /** Navn */
  name: Scalars['String']['output'];
  /** Alternativ URL */
  path: Scalars['String']['output'];
  /** Publiceret */
  status: Scalars['Boolean']['output'];
};

/** Entity type menu. */
export type Menu = MenuInterface & {
  __typename?: 'Menu';
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The menu items. */
  items: Array<MenuItem>;
  /** The menu name. */
  name: Scalars['String']['output'];
};

/** List of menus available to load. */
export enum MenuAvailable {
  /** Administration */
  Admin = 'ADMIN',
  /** Udvikling */
  Devel = 'DEVEL',
  /** Main navigation */
  Main = 'MAIN',
  /** Tools */
  Tools = 'TOOLS'
}

/** Entity type menu. */
export type MenuInterface = {
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The menu items. */
  items: Array<MenuItem>;
  /** The menu name. */
  name: Scalars['String']['output'];
};

/** A menu item defined in the CMS. */
export type MenuItem = {
  __typename?: 'MenuItem';
  /** Attributes of this menu item. */
  attributes: MenuItemAttributes;
  /** Child menu items of this menu item. */
  children: Array<MenuItem>;
  /** The description of the menu item. */
  description?: Maybe<Scalars['String']['output']>;
  /** Whether this menu item is intended to be expanded. */
  expanded: Scalars['Boolean']['output'];
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** Whether this menu item links to an internal route. */
  internal: Scalars['Boolean']['output'];
  /** The language of the menu item. */
  langcode: Language;
  /** The route this menu item uses. Route loading can be disabled per menu type. */
  route?: Maybe<RouteUnion>;
  /** The title of the menu item. */
  title: Scalars['String']['output'];
  /** The URL of the menu item. */
  url?: Maybe<Scalars['String']['output']>;
};

/** Menu item options set within the CMS. */
export type MenuItemAttributes = {
  __typename?: 'MenuItemAttributes';
  class?: Maybe<Scalars['String']['output']>;
};

/** Entity type menu. */
export type MenuUnion = Menu;

/** The schema's entry-point for mutations. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Placeholder for mutation extension. */
  _: Scalars['Boolean']['output'];
};

/** Brug artikler til nyhedspræget indhold med en begrænset levetid. */
export type NodeArticle = EdgeNode & NodeInterface & {
  __typename?: 'NodeArticle';
  /** Bibliotek */
  branch?: Maybe<NodeUnion>;
  /**
   * Oplys en canonical URL hvis indholdet i artiklen er kopieret fra en anden
   * hjemmeside (fx kopieret fra et andet biblioteks hjemmeside). Dette hjælper
   * med at signalere til søgemaskiner at kilden til indholdet er den
   * specificerede side, og sikrer at den originale kilde krediteres.
   */
  canonicalUrl?: Maybe<Link>;
  /** Kategorier */
  categories?: Maybe<TermUnion>;
  /** Tidspunktet hvor indholdselementet sidst blev redigeret. */
  changed: DateTime;
  /** The date and time that the content was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** Sprog */
  langcode: Language;
  /** Overskriv forfatter */
  overrideAuthor?: Maybe<Scalars['String']['output']>;
  /** Paragraphs */
  paragraphs?: Maybe<Array<ParagraphUnion>>;
  /** Alternativ URL */
  path: Scalars['String']['output'];
  /** Forfremmet til forside */
  promote: Scalars['Boolean']['output'];
  /** Publication date */
  publicationDate: DateTime;
  /**
   * Som standard er forfatteren sat til den Drupal-bruger, der ejer indholdet.<br
   * /><br />Hvis du ønsker at tilsidesætte dette med din egen tekst, kan du
   */
  showOverrideAuthor?: Maybe<Scalars['Boolean']['output']>;
  /** Publiceret */
  status: Scalars['Boolean']['output'];
  /** Klæbrig */
  sticky: Scalars['Boolean']['output'];
  /** Manchet */
  subtitle?: Maybe<Scalars['String']['output']>;
  /** Tags */
  tags?: Maybe<Array<TermUnion>>;
  /**
   * Teaserfelterne bruges til cards som blikfang for indholdet. Hvis der ikke er
   * valgt et teaserbillede, vil teksten vises i stedet.
   */
  teaserImage?: Maybe<MediaUnion>;
  /** Teasertekst */
  teaserText?: Maybe<Scalars['String']['output']>;
  /** Titel */
  title: Scalars['String']['output'];
};

/** A paginated set of results for NodeArticle. */
export type NodeArticleConnection = Connection & {
  __typename?: 'NodeArticleConnection';
  edges: Array<NodeArticleEdge>;
  nodes: Array<NodeArticle>;
  pageInfo: ConnectionPageInfo;
};

/** Edge for NodeArticle. */
export type NodeArticleEdge = Edge & {
  __typename?: 'NodeArticleEdge';
  cursor: Scalars['Cursor']['output'];
  node: NodeArticle;
};

/** Entity type node. */
export type NodeInterface = {
  /** Tidspunktet hvor indholdselementet sidst blev redigeret. */
  changed: DateTime;
  /** The date and time that the content was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** Sprog */
  langcode: Language;
  /** Alternativ URL */
  path: Scalars['String']['output'];
  /** Forfremmet til forside */
  promote: Scalars['Boolean']['output'];
  /** Publiceret */
  status: Scalars['Boolean']['output'];
  /** Klæbrig */
  sticky: Scalars['Boolean']['output'];
  /** Titel */
  title: Scalars['String']['output'];
};

/** Entity type node. */
export type NodeUnion = NodeArticle;

/** Entity type paragraph. */
export type ParagraphAccordion = ParagraphInterface & {
  __typename?: 'ParagraphAccordion';
  /** Accordion beskrivelse */
  accordionDescription?: Maybe<Text>;
  /** Accordion titel */
  accordionTitle: Text;
  /** The time that the Paragraph was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The paragraphs entity language code. */
  langcode: Language;
  /** Publiceret */
  status: Scalars['Boolean']['output'];
};

/** Banner's purpose is to link internally or externally and can be used with or without a background image. */
export type ParagraphBanner = ParagraphInterface & {
  __typename?: 'ParagraphBanner';
  /** Banner description */
  bannerDescription?: Maybe<Scalars['String']['output']>;
  /** Banner Image */
  bannerImage?: Maybe<MediaUnion>;
  /** Banner Link */
  bannerLink: Link;
  /** The time that the Paragraph was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The paragraphs entity language code. */
  langcode: Language;
  /** Publiceret */
  status: Scalars['Boolean']['output'];
  /** Underlined title */
  underlinedTitle?: Maybe<Text>;
};

/** Vis automatisk alt indhold, som refererer til dit valgte brødkrumme element. */
export type ParagraphBreadcrumbChildren = ParagraphInterface & {
  __typename?: 'ParagraphBreadcrumbChildren';
  /** The time that the Paragraph was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The paragraphs entity language code. */
  langcode: Language;
  /** Publiceret */
  status: Scalars['Boolean']['output'];
};

/** Entity type paragraph. */
export type ParagraphCardGridAutomatic = ParagraphInterface & {
  __typename?: 'ParagraphCardGridAutomatic';
  /** The time that the Paragraph was created. */
  created: DateTime;
  /** If nothing is selected, all will be chosen. */
  filterBranches?: Maybe<Array<NodeUnion>>;
  /** Filter efter kategorier */
  filterCategories?: Maybe<Array<TermUnion>>;
  /** Condition type */
  filterCondType: Scalars['String']['output'];
  /** If nothing is selected, all will be chosen. */
  filterContentTypes?: Maybe<Array<Scalars['String']['output']>>;
  /** Filter efter tags */
  filterTags?: Maybe<Array<TermUnion>>;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The paragraphs entity language code. */
  langcode: Language;
  /** More link */
  moreLink?: Maybe<Link>;
  /** Publiceret */
  status: Scalars['Boolean']['output'];
  /** Titel */
  title?: Maybe<Scalars['String']['output']>;
};

/** Entity type paragraph. */
export type ParagraphCardGridManual = ParagraphInterface & {
  __typename?: 'ParagraphCardGridManual';
  /** The time that the Paragraph was created. */
  created: DateTime;
  /** Indhold */
  gridContent?: Maybe<Array<NodeArticle>>;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The paragraphs entity language code. */
  langcode: Language;
  /** More link */
  moreLink?: Maybe<Link>;
  /** Publiceret */
  status: Scalars['Boolean']['output'];
  /** Overskrift */
  title?: Maybe<Scalars['String']['output']>;
};

/** Entity type paragraph. */
export type ParagraphContentSlider = ParagraphInterface & {
  __typename?: 'ParagraphContentSlider';
  /** Indhold */
  contentReferences?: Maybe<Array<NodeArticle>>;
  /** The time that the Paragraph was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The paragraphs entity language code. */
  langcode: Language;
  /** Publiceret */
  status: Scalars['Boolean']['output'];
  /** deprecated */
  title?: Maybe<Scalars['String']['output']>;
  /** Title */
  underlinedTitle?: Maybe<Text>;
};

/** Entity type paragraph. */
export type ParagraphContentSliderAutomatic = ParagraphInterface & {
  __typename?: 'ParagraphContentSliderAutomatic';
  /** The time that the Paragraph was created. */
  created: DateTime;
  /** If nothing is selected, all will be chosen. */
  filterBranches?: Maybe<Array<NodeUnion>>;
  /** Filter by categories */
  filterCategories?: Maybe<Array<TermUnion>>;
  /** Condition type */
  filterCondType: Scalars['String']['output'];
  /** If nothing is selected, all will be chosen. */
  filterContentTypes?: Maybe<Array<Scalars['String']['output']>>;
  /** Filter by tags */
  filterTags?: Maybe<Array<TermUnion>>;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The paragraphs entity language code. */
  langcode: Language;
  /** Publiceret */
  status: Scalars['Boolean']['output'];
  /** deprecated */
  title?: Maybe<Scalars['String']['output']>;
  /** Title */
  underlinedTitle?: Maybe<Text>;
};

/** Link med ikoner. Designet til jpg, jpeg, png, pdf, mp3, mov, mp4, og mpeg filer */
export type ParagraphFiles = ParagraphInterface & {
  __typename?: 'ParagraphFiles';
  /** The time that the Paragraph was created. */
  created: DateTime;
  /** Filer */
  files?: Maybe<Array<MediaUnion>>;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The paragraphs entity language code. */
  langcode: Language;
  /** Publiceret */
  status: Scalars['Boolean']['output'];
};

/** Denne paragraph viser en liste af arrangementer filtreret på kategori, tags og filialer. */
export type ParagraphFilteredEventList = ParagraphInterface & {
  __typename?: 'ParagraphFilteredEventList';
  /** The time that the Paragraph was created. */
  created: DateTime;
  /** Tilføj enhver forgrening, du vil inkludere */
  filterBranches?: Maybe<Array<NodeUnion>>;
  /** Tilføj en kategori, du vil inkludere */
  filterCategories?: Maybe<Array<TermUnion>>;
  /** Condition type */
  filterCondType: Scalars['String']['output'];
  /** Tilføj et tag, du vil inkludere */
  filterTags?: Maybe<Array<TermUnion>>;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The paragraphs entity language code. */
  langcode: Language;
  /**
   * Select the amount of events you want to display. <br /><br />If the amount
   * displayed is less than what you put here, it is likely because there are not
   * enough results based on your selected filters.
   */
  maxItemAmount: Scalars['String']['output'];
  /** Publiceret */
  status: Scalars['Boolean']['output'];
  /** Titel */
  title?: Maybe<Scalars['String']['output']>;
};

/** Entity type paragraph. */
export type ParagraphInterface = {
  /** The time that the Paragraph was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The paragraphs entity language code. */
  langcode: Language;
  /** Publiceret */
  status: Scalars['Boolean']['output'];
};

/** Links med ikoner. Designet til interne/eksterne links og links til søgeresultater ␣. */
export type ParagraphLinks = ParagraphInterface & {
  __typename?: 'ParagraphLinks';
  /** The time that the Paragraph was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The paragraphs entity language code. */
  langcode: Language;
  /** Link */
  link: Array<Link>;
  /** Publiceret */
  status: Scalars['Boolean']['output'];
};

/** Dette afsnit vil vise en liste over arrangementer, der er manuelt valgt. */
export type ParagraphManualEventList = ParagraphInterface & {
  __typename?: 'ParagraphManualEventList';
  /** The time that the Paragraph was created. */
  created: DateTime;
  /** Arrangementer */
  events?: Maybe<Array<UnsupportedType>>;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The paragraphs entity language code. */
  langcode: Language;
  /** Publiceret */
  status: Scalars['Boolean']['output'];
  /** Titel */
  title?: Maybe<Scalars['String']['output']>;
};

/** Entity type paragraph. */
export type ParagraphMedias = ParagraphInterface & {
  __typename?: 'ParagraphMedias';
  /** The time that the Paragraph was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The paragraphs entity language code. */
  langcode: Language;
  /** Billeder */
  medias: Array<MediaUnion>;
  /** Publiceret */
  status: Scalars['Boolean']['output'];
};

/** Denne paragraph bruges til at anbefale et enkelt materiale. */
export type ParagraphRecommendation = ParagraphInterface & {
  __typename?: 'ParagraphRecommendation';
  /** The time that the Paragraph was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /**
   * Dette bestemmer om, et billede skal positioneres til venstre eller højre. <br
   * />Hvis den ikke er slået til (standardadfærd), placeres billedet til
   * venstre, hvis den er slået til, placeres billedet til højre.␣
   */
  imagePositionRight?: Maybe<Scalars['Boolean']['output']>;
  /** The paragraphs entity language code. */
  langcode: Language;
  /**
   * Titlen på det anbefalede materiale. Hvis du tilføjer en titel, vil
   * beskrivelsesteksten af materialet ikke blive autoudfyldt.
   */
  recommendationTitle?: Maybe<Text>;
  /** Publiceret */
  status: Scalars['Boolean']['output'];
};

/** En basal, formateret brødtekst */
export type ParagraphTextBody = ParagraphInterface & {
  __typename?: 'ParagraphTextBody';
  /** Brødtekst */
  body?: Maybe<Text>;
  /** The time that the Paragraph was created. */
  created: DateTime;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The paragraphs entity language code. */
  langcode: Language;
  /** Publiceret */
  status: Scalars['Boolean']['output'];
};

/** Entity type paragraph. */
export type ParagraphUnion = ParagraphAccordion | ParagraphBanner | ParagraphBreadcrumbChildren | ParagraphCardGridAutomatic | ParagraphCardGridManual | ParagraphContentSlider | ParagraphContentSliderAutomatic | ParagraphFiles | ParagraphFilteredEventList | ParagraphLinks | ParagraphManualEventList | ParagraphMedias | ParagraphRecommendation | ParagraphTextBody | ParagraphVideo;

/** Indtast URL'en til den video, du vil indlejre. */
export type ParagraphVideo = ParagraphInterface & {
  __typename?: 'ParagraphVideo';
  /** The time that the Paragraph was created. */
  created: DateTime;
  /** Indlejr video */
  embedVideo?: Maybe<MediaUnion>;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** The paragraphs entity language code. */
  langcode: Language;
  /** Publiceret */
  status: Scalars['Boolean']['output'];
};

/** The schema's entry-point for queries. */
export type Query = {
  __typename?: 'Query';
  /** DPL Configuration */
  dplConfiguration?: Maybe<DplConfiguration>;
  /** Schema information. */
  info: SchemaInformation;
  /** Load a Menu by name. */
  menu?: Maybe<Menu>;
  /** Load a NodeArticle entity by id */
  nodeArticle?: Maybe<NodeArticle>;
  /** List of all NodeArticle on the platform. */
  nodeArticles: NodeArticleConnection;
  /** Load a ParagraphFiles entity by id */
  paragraphFiles?: Maybe<ParagraphFiles>;
  /** Load a ParagraphLinks entity by id */
  paragraphLinks?: Maybe<ParagraphLinks>;
  /** Load a ParagraphMedias entity by id */
  paragraphMedias?: Maybe<ParagraphMedias>;
  /** Load a ParagraphRecommendation entity by id */
  paragraphRecommendation?: Maybe<ParagraphRecommendation>;
  /** Load a ParagraphVideo entity by id */
  paragraphVideo?: Maybe<ParagraphVideo>;
  /** Load a Route by path. */
  route?: Maybe<RouteUnion>;
  /** NextJs SSG Node Information. */
  ssgNodeInformation: SsgNodeInformation;
};


/** The schema's entry-point for queries. */
export type QueryMenuArgs = {
  langcode?: InputMaybe<Scalars['String']['input']>;
  name: MenuAvailable;
};


/** The schema's entry-point for queries. */
export type QueryNodeArticleArgs = {
  id: Scalars['ID']['input'];
  langcode?: InputMaybe<Scalars['String']['input']>;
  revision?: InputMaybe<Scalars['ID']['input']>;
};


/** The schema's entry-point for queries. */
export type QueryNodeArticlesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  langcode?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  reverse?: InputMaybe<Scalars['Boolean']['input']>;
  sortKey?: InputMaybe<ConnectionSortKeys>;
};


/** The schema's entry-point for queries. */
export type QueryParagraphFilesArgs = {
  id: Scalars['ID']['input'];
  langcode?: InputMaybe<Scalars['String']['input']>;
  revision?: InputMaybe<Scalars['ID']['input']>;
};


/** The schema's entry-point for queries. */
export type QueryParagraphLinksArgs = {
  id: Scalars['ID']['input'];
  langcode?: InputMaybe<Scalars['String']['input']>;
  revision?: InputMaybe<Scalars['ID']['input']>;
};


/** The schema's entry-point for queries. */
export type QueryParagraphMediasArgs = {
  id: Scalars['ID']['input'];
  langcode?: InputMaybe<Scalars['String']['input']>;
  revision?: InputMaybe<Scalars['ID']['input']>;
};


/** The schema's entry-point for queries. */
export type QueryParagraphRecommendationArgs = {
  id: Scalars['ID']['input'];
  langcode?: InputMaybe<Scalars['String']['input']>;
  revision?: InputMaybe<Scalars['ID']['input']>;
};


/** The schema's entry-point for queries. */
export type QueryParagraphVideoArgs = {
  id: Scalars['ID']['input'];
  langcode?: InputMaybe<Scalars['String']['input']>;
  revision?: InputMaybe<Scalars['ID']['input']>;
};


/** The schema's entry-point for queries. */
export type QueryRouteArgs = {
  langcode?: InputMaybe<Scalars['String']['input']>;
  path: Scalars['String']['input'];
};


/** The schema's entry-point for queries. */
export type QuerySsgNodeInformationArgs = {
  type: Scalars['String']['input'];
};

/** Routes represent incoming requests that resolve to content. */
export type Route = {
  /** Whether this route is internal or external. */
  internal: Scalars['Boolean']['output'];
  /** URL of this route. */
  url: Scalars['String']['output'];
};

/** A list of possible entities that can be returned by URL. */
export type RouteEntityUnion = NodeArticle;

/** Route outside of this website. */
export type RouteExternal = Route & {
  __typename?: 'RouteExternal';
  /** Whether this route is internal or external. */
  internal: Scalars['Boolean']['output'];
  /** URL of this route. */
  url: Scalars['String']['output'];
};

/** Route within this website. */
export type RouteInternal = Route & {
  __typename?: 'RouteInternal';
  /** Breadcrumb links for this route. */
  breadcrumbs?: Maybe<Array<Link>>;
  /** Content assigned to this route. */
  entity?: Maybe<RouteEntityUnion>;
  /** Whether this route is internal or external. */
  internal: Scalars['Boolean']['output'];
  /** URL of this route. */
  url: Scalars['String']['output'];
};

/** Redirect to another URL with status. */
export type RouteRedirect = Route & {
  __typename?: 'RouteRedirect';
  /** Whether this route is internal or external. */
  internal: Scalars['Boolean']['output'];
  /** Utility prop. Always true for redirects. */
  redirect: Scalars['Boolean']['output'];
  /** Suggested status for redirect. Eg 301. */
  status: Scalars['Int']['output'];
  /** URL of this route. */
  url: Scalars['String']['output'];
};

/** Route types that can exist in the system. */
export type RouteUnion = RouteExternal | RouteInternal | RouteRedirect;

/** Schema information provided by the system. */
export type SchemaInformation = {
  __typename?: 'SchemaInformation';
  /** The schema description. */
  description?: Maybe<Scalars['String']['output']>;
  /** The internal path to the front page. */
  home?: Maybe<Scalars['String']['output']>;
  /** List of languages available. */
  languages: Array<Language>;
  /** The schema version. */
  version?: Maybe<Scalars['String']['output']>;
};

/** Sort direction. */
export enum SortDirection {
  /** Stigende */
  Asc = 'ASC',
  /** Faldende */
  Desc = 'DESC'
}

/** Schema information provided by the system. */
export type SsgNodeInformation = {
  __typename?: 'SsgNodeInformation';
  /** The connected cache tags. */
  cacheTags?: Maybe<Scalars['String']['output']>;
  /** The node UUID. */
  nid?: Maybe<Scalars['String']['output']>;
};

/** The schema's entry-point for subscriptions. */
export type Subscription = {
  __typename?: 'Subscription';
  /** Placeholder for subscription extension. */
  _: Scalars['Boolean']['output'];
};

/** Entity type taxonomy_term. */
export type TermBreadcrumbStructure = TermInterface & {
  __typename?: 'TermBreadcrumbStructure';
  /** Datoen hvor termen senest blev redigeret. */
  changed: DateTime;
  /** Titlen, der vises over listen af refereret indhold. Vil ikke blive vist, hvis der ikke vises nogen børn. */
  childrenTitle?: Maybe<Scalars['String']['output']>;
  /** Indhold der linkes til */
  content: NodeUnion;
  /** Beskrivelse */
  description: Text;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** Term sprogkode. */
  langcode: Language;
  /** Navn */
  name: Scalars['String']['output'];
  /** Denne terms overordnede termer. */
  parent?: Maybe<TermUnion>;
  /** Alternativ URL */
  path: Scalars['String']['output'];
  /** Vis en automatisk liste med indhold, som refererer til dette brødkrumme element, på denne side. */
  showChildren?: Maybe<Scalars['Boolean']['output']>;
  /** If this is checked, the children teasers will be expanded with possible subtitle descriptions. */
  showChildrenSubtitles?: Maybe<Scalars['Boolean']['output']>;
  /** Publiceret */
  status: Scalars['Boolean']['output'];
  /** Vægten af denne term i forhold til andre termer. */
  weight: Scalars['Int']['output'];
};

/** Entity type taxonomy_term. */
export type TermCategories = TermInterface & {
  __typename?: 'TermCategories';
  /** Datoen hvor termen senest blev redigeret. */
  changed: DateTime;
  /** Beskrivelse */
  description: Text;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** Term sprogkode. */
  langcode: Language;
  /** Navn */
  name: Scalars['String']['output'];
  /** Denne terms overordnede termer. */
  parent?: Maybe<TermUnion>;
  /** Alternativ URL */
  path: Scalars['String']['output'];
  /** Publiceret */
  status: Scalars['Boolean']['output'];
  /** Vægten af denne term i forhold til andre termer. */
  weight: Scalars['Int']['output'];
};

/** Entity type taxonomy_term. */
export type TermInterface = {
  /** Datoen hvor termen senest blev redigeret. */
  changed: DateTime;
  /** Beskrivelse */
  description: Text;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** Term sprogkode. */
  langcode: Language;
  /** Navn */
  name: Scalars['String']['output'];
  /** Denne terms overordnede termer. */
  parent?: Maybe<TermUnion>;
  /** Alternativ URL */
  path: Scalars['String']['output'];
  /** Publiceret */
  status: Scalars['Boolean']['output'];
  /** Vægten af denne term i forhold til andre termer. */
  weight: Scalars['Int']['output'];
};

/** This is for adding types of opening hours, e.g. "open" or "Telephone time" */
export type TermOpeningHoursCategories = TermInterface & {
  __typename?: 'TermOpeningHoursCategories';
  /** Datoen hvor termen senest blev redigeret. */
  changed: DateTime;
  /** Beskrivelse */
  description: Text;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** Term sprogkode. */
  langcode: Language;
  /** Navn */
  name: Scalars['String']['output'];
  /** Denne terms overordnede termer. */
  parent?: Maybe<TermUnion>;
  /** Alternativ URL */
  path: Scalars['String']['output'];
  /** Publiceret */
  status: Scalars['Boolean']['output'];
  /** Vægten af denne term i forhold til andre termer. */
  weight: Scalars['Int']['output'];
};

/** Entity type taxonomy_term. */
export type TermTags = TermInterface & {
  __typename?: 'TermTags';
  /** Datoen hvor termen senest blev redigeret. */
  changed: DateTime;
  /** Beskrivelse */
  description: Text;
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** Term sprogkode. */
  langcode: Language;
  /** Navn */
  name: Scalars['String']['output'];
  /** Denne terms overordnede termer. */
  parent?: Maybe<TermUnion>;
  /** Alternativ URL */
  path: Scalars['String']['output'];
  /** Publiceret */
  status: Scalars['Boolean']['output'];
  /** Vægten af denne term i forhold til andre termer. */
  weight: Scalars['Int']['output'];
};

/** Entity type taxonomy_term. */
export type TermUnion = TermBreadcrumbStructure | TermCategories | TermOpeningHoursCategories | TermTags | TermWebformEmailCategories;

/** List of email categories used for sending webform submissions. Each category is associated with an email address. */
export type TermWebformEmailCategories = TermInterface & {
  __typename?: 'TermWebformEmailCategories';
  /** Datoen hvor termen senest blev redigeret. */
  changed: DateTime;
  /** Beskrivelse */
  description: Text;
  /** Add which email to send form submissions of this category to. */
  email: Scalars['Email']['output'];
  /** The Universally Unique IDentifier (UUID). */
  id: Scalars['ID']['output'];
  /** Term sprogkode. */
  langcode: Language;
  /** Navn */
  name: Scalars['String']['output'];
  /** Denne terms overordnede termer. */
  parent?: Maybe<TermUnion>;
  /** Alternativ URL */
  path: Scalars['String']['output'];
  /** Publiceret */
  status: Scalars['Boolean']['output'];
  /** Vægten af denne term i forhold til andre termer. */
  weight: Scalars['Int']['output'];
};

/** A processed text format defined by the CMS. */
export type Text = {
  __typename?: 'Text';
  /** The text format used to process the text value. */
  format?: Maybe<Scalars['String']['output']>;
  /** The processed text value. */
  processed?: Maybe<Scalars['Html']['output']>;
  /** The raw text value. */
  value?: Maybe<Scalars['String']['output']>;
};

/** A processed text format with summary defined by the CMS. */
export type TextSummary = {
  __typename?: 'TextSummary';
  /** The text format used to process the text value. */
  format?: Maybe<Scalars['String']['output']>;
  /** The processed text value. */
  processed?: Maybe<Scalars['Html']['output']>;
  /** The processed text summary. */
  summary?: Maybe<Scalars['Html']['output']>;
  /** The raw text value. */
  value?: Maybe<Scalars['String']['output']>;
};

/** Available translations for content. */
export type Translation = {
  __typename?: 'Translation';
  /** The language of the translation. */
  langcode: Language;
  /** The path to the translated content. */
  path?: Maybe<Scalars['String']['output']>;
  /** The title of the translation. */
  title?: Maybe<Scalars['String']['output']>;
};

/** List of DPL-Go Unilogin configuration. */
export type UniloginConfiguration = {
  __typename?: 'UniloginConfiguration';
  unilogin_api_client_id?: Maybe<Scalars['String']['output']>;
  unilogin_api_client_secret?: Maybe<Scalars['String']['output']>;
  unilogin_api_url?: Maybe<Scalars['String']['output']>;
  unilogin_api_wellknown_url?: Maybe<Scalars['String']['output']>;
};

/**
 * Unsupported entity or field type in the schema.
 * This entity may not have been enabled in the schema yet and is being referenced via entity reference.
 */
export type UnsupportedType = {
  __typename?: 'UnsupportedType';
  /** Unsupported type, always TRUE. */
  unsupported?: Maybe<Scalars['Boolean']['output']>;
};

export type GetArticleQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetArticleQuery = { __typename?: 'Query', nodeArticle?: { __typename?: 'NodeArticle', title: string, subtitle?: string | null, paragraphs?: Array<{ __typename: 'ParagraphAccordion' } | { __typename: 'ParagraphBanner' } | { __typename: 'ParagraphBreadcrumbChildren' } | { __typename: 'ParagraphCardGridAutomatic' } | { __typename: 'ParagraphCardGridManual' } | { __typename: 'ParagraphContentSlider' } | { __typename: 'ParagraphContentSliderAutomatic' } | { __typename: 'ParagraphFiles' } | { __typename: 'ParagraphFilteredEventList' } | { __typename: 'ParagraphLinks' } | { __typename: 'ParagraphManualEventList' } | { __typename: 'ParagraphMedias' } | { __typename: 'ParagraphRecommendation' } | { __typename: 'ParagraphTextBody', body?: { __typename?: 'Text', value?: string | null } | null } | { __typename: 'ParagraphVideo' }> | null } | null };

export type GetArticleByRouteQueryVariables = Exact<{
  path: Scalars['String']['input'];
}>;


export type GetArticleByRouteQuery = { __typename?: 'Query', route?: { __typename?: 'RouteExternal' } | { __typename?: 'RouteInternal', entity?: { __typename?: 'NodeArticle', title: string, subtitle?: string | null, paragraphs?: Array<{ __typename: 'ParagraphAccordion' } | { __typename: 'ParagraphBanner' } | { __typename: 'ParagraphBreadcrumbChildren' } | { __typename: 'ParagraphCardGridAutomatic' } | { __typename: 'ParagraphCardGridManual' } | { __typename: 'ParagraphContentSlider' } | { __typename: 'ParagraphContentSliderAutomatic' } | { __typename: 'ParagraphFiles' } | { __typename: 'ParagraphFilteredEventList' } | { __typename: 'ParagraphLinks' } | { __typename: 'ParagraphManualEventList' } | { __typename: 'ParagraphMedias' } | { __typename: 'ParagraphRecommendation' } | { __typename: 'ParagraphTextBody', body?: { __typename?: 'Text', value?: string | null } | null } | { __typename: 'ParagraphVideo' }> | null } | null } | { __typename?: 'RouteRedirect' } | null };

export type ExtractArticlesQueryVariables = Exact<{
  pageSize: Scalars['Int']['input'];
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
}>;


export type ExtractArticlesQuery = { __typename?: 'Query', nodeArticles: { __typename?: 'NodeArticleConnection', nodes: Array<{ __typename?: 'NodeArticle', id: string, path: string }>, edges: Array<{ __typename?: 'NodeArticleEdge', cursor: unknown }>, pageInfo: { __typename?: 'ConnectionPageInfo', hasNextPage: boolean } } };

export type GetDplCmsConfigurationQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDplCmsConfigurationQuery = { __typename?: 'Query', dplConfiguration?: { __typename?: 'DplConfiguration', unilogin?: { __typename?: 'UniloginConfiguration', unilogin_api_url?: string | null, unilogin_api_wellknown_url?: string | null, unilogin_api_client_id?: string | null, unilogin_api_client_secret?: string | null } | null } | null };



export const GetArticleDocument = `
    query getArticle($id: ID!) {
  nodeArticle(id: $id) {
    title
    subtitle
    paragraphs {
      __typename
      ... on ParagraphTextBody {
        body {
          value
        }
      }
    }
  }
}
    `;

export const useGetArticleQuery = <
      TData = GetArticleQuery,
      TError = unknown
    >(
      variables: GetArticleQueryVariables,
      options?: Omit<UseQueryOptions<GetArticleQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetArticleQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetArticleQuery, TError, TData>(
      {
    queryKey: ['getArticle', variables],
    queryFn: fetcher<GetArticleQuery, GetArticleQueryVariables>(GetArticleDocument, variables),
    ...options
  }
    )};

useGetArticleQuery.getKey = (variables: GetArticleQueryVariables) => ['getArticle', variables];

export const useSuspenseGetArticleQuery = <
      TData = GetArticleQuery,
      TError = unknown
    >(
      variables: GetArticleQueryVariables,
      options?: Omit<UseSuspenseQueryOptions<GetArticleQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseQueryOptions<GetArticleQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseQuery<GetArticleQuery, TError, TData>(
      {
    queryKey: ['getArticleSuspense', variables],
    queryFn: fetcher<GetArticleQuery, GetArticleQueryVariables>(GetArticleDocument, variables),
    ...options
  }
    )};

useSuspenseGetArticleQuery.getKey = (variables: GetArticleQueryVariables) => ['getArticleSuspense', variables];


useGetArticleQuery.fetcher = (variables: GetArticleQueryVariables, options?: RequestInit['headers']) => fetcher<GetArticleQuery, GetArticleQueryVariables>(GetArticleDocument, variables, options);

export const GetArticleByRouteDocument = `
    query getArticleByRoute($path: String!) {
  route(path: $path) {
    ... on RouteInternal {
      entity {
        ... on NodeArticle {
          title
          subtitle
          paragraphs {
            __typename
            ... on ParagraphTextBody {
              body {
                value
              }
            }
          }
        }
      }
    }
  }
}
    `;

export const useGetArticleByRouteQuery = <
      TData = GetArticleByRouteQuery,
      TError = unknown
    >(
      variables: GetArticleByRouteQueryVariables,
      options?: Omit<UseQueryOptions<GetArticleByRouteQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetArticleByRouteQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetArticleByRouteQuery, TError, TData>(
      {
    queryKey: ['getArticleByRoute', variables],
    queryFn: fetcher<GetArticleByRouteQuery, GetArticleByRouteQueryVariables>(GetArticleByRouteDocument, variables),
    ...options
  }
    )};

useGetArticleByRouteQuery.getKey = (variables: GetArticleByRouteQueryVariables) => ['getArticleByRoute', variables];

export const useSuspenseGetArticleByRouteQuery = <
      TData = GetArticleByRouteQuery,
      TError = unknown
    >(
      variables: GetArticleByRouteQueryVariables,
      options?: Omit<UseSuspenseQueryOptions<GetArticleByRouteQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseQueryOptions<GetArticleByRouteQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseQuery<GetArticleByRouteQuery, TError, TData>(
      {
    queryKey: ['getArticleByRouteSuspense', variables],
    queryFn: fetcher<GetArticleByRouteQuery, GetArticleByRouteQueryVariables>(GetArticleByRouteDocument, variables),
    ...options
  }
    )};

useSuspenseGetArticleByRouteQuery.getKey = (variables: GetArticleByRouteQueryVariables) => ['getArticleByRouteSuspense', variables];


useGetArticleByRouteQuery.fetcher = (variables: GetArticleByRouteQueryVariables, options?: RequestInit['headers']) => fetcher<GetArticleByRouteQuery, GetArticleByRouteQueryVariables>(GetArticleByRouteDocument, variables, options);

export const ExtractArticlesDocument = `
    query extractArticles($pageSize: Int!, $cursor: Cursor) {
  nodeArticles(first: $pageSize, after: $cursor) {
    nodes {
      id
      path
    }
    edges {
      cursor
    }
    pageInfo {
      hasNextPage
    }
  }
}
    `;

export const useExtractArticlesQuery = <
      TData = ExtractArticlesQuery,
      TError = unknown
    >(
      variables: ExtractArticlesQueryVariables,
      options?: Omit<UseQueryOptions<ExtractArticlesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ExtractArticlesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ExtractArticlesQuery, TError, TData>(
      {
    queryKey: ['extractArticles', variables],
    queryFn: fetcher<ExtractArticlesQuery, ExtractArticlesQueryVariables>(ExtractArticlesDocument, variables),
    ...options
  }
    )};

useExtractArticlesQuery.getKey = (variables: ExtractArticlesQueryVariables) => ['extractArticles', variables];

export const useSuspenseExtractArticlesQuery = <
      TData = ExtractArticlesQuery,
      TError = unknown
    >(
      variables: ExtractArticlesQueryVariables,
      options?: Omit<UseSuspenseQueryOptions<ExtractArticlesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseQueryOptions<ExtractArticlesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseQuery<ExtractArticlesQuery, TError, TData>(
      {
    queryKey: ['extractArticlesSuspense', variables],
    queryFn: fetcher<ExtractArticlesQuery, ExtractArticlesQueryVariables>(ExtractArticlesDocument, variables),
    ...options
  }
    )};

useSuspenseExtractArticlesQuery.getKey = (variables: ExtractArticlesQueryVariables) => ['extractArticlesSuspense', variables];


useExtractArticlesQuery.fetcher = (variables: ExtractArticlesQueryVariables, options?: RequestInit['headers']) => fetcher<ExtractArticlesQuery, ExtractArticlesQueryVariables>(ExtractArticlesDocument, variables, options);

export const GetDplCmsConfigurationDocument = `
    query getDplCmsConfiguration {
  dplConfiguration {
    unilogin {
      unilogin_api_url
      unilogin_api_wellknown_url
      unilogin_api_client_id
      unilogin_api_client_secret
    }
  }
}
    `;

export const useGetDplCmsConfigurationQuery = <
      TData = GetDplCmsConfigurationQuery,
      TError = unknown
    >(
      variables?: GetDplCmsConfigurationQueryVariables,
      options?: Omit<UseQueryOptions<GetDplCmsConfigurationQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetDplCmsConfigurationQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetDplCmsConfigurationQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['getDplCmsConfiguration'] : ['getDplCmsConfiguration', variables],
    queryFn: fetcher<GetDplCmsConfigurationQuery, GetDplCmsConfigurationQueryVariables>(GetDplCmsConfigurationDocument, variables),
    ...options
  }
    )};

useGetDplCmsConfigurationQuery.getKey = (variables?: GetDplCmsConfigurationQueryVariables) => variables === undefined ? ['getDplCmsConfiguration'] : ['getDplCmsConfiguration', variables];

export const useSuspenseGetDplCmsConfigurationQuery = <
      TData = GetDplCmsConfigurationQuery,
      TError = unknown
    >(
      variables?: GetDplCmsConfigurationQueryVariables,
      options?: Omit<UseSuspenseQueryOptions<GetDplCmsConfigurationQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseQueryOptions<GetDplCmsConfigurationQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseQuery<GetDplCmsConfigurationQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['getDplCmsConfigurationSuspense'] : ['getDplCmsConfigurationSuspense', variables],
    queryFn: fetcher<GetDplCmsConfigurationQuery, GetDplCmsConfigurationQueryVariables>(GetDplCmsConfigurationDocument, variables),
    ...options
  }
    )};

useSuspenseGetDplCmsConfigurationQuery.getKey = (variables?: GetDplCmsConfigurationQueryVariables) => variables === undefined ? ['getDplCmsConfigurationSuspense'] : ['getDplCmsConfigurationSuspense', variables];


useGetDplCmsConfigurationQuery.fetcher = (variables?: GetDplCmsConfigurationQueryVariables, options?: RequestInit['headers']) => fetcher<GetDplCmsConfigurationQuery, GetDplCmsConfigurationQueryVariables>(GetDplCmsConfigurationDocument, variables, options);
