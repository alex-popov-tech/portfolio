export type HeroMedia = 
  | {
      type: 'image';
      src: ImageMetadata;
    }
  | {
      type: 'video';
      src: string;
      poster?: ImageMetadata;
    };
