export interface FetchedData {
  results: Article[];
}

export interface Article {
  id: number;
  title: string;
  summary: string;
  image_url: string;
  published_at: Date;
}
