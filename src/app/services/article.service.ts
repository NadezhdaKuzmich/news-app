import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article, FetchedData } from '../types/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private API_URL = 'https://api.spaceflightnewsapi.net/v4/articles/';

  constructor(private http: HttpClient) {}

  getArticles(): Observable<FetchedData> {
    return this.http.get<FetchedData>(this.API_URL);
  }

  getArticleById(id: string | null): Observable<Article> {
    return this.http.get<Article>(`${this.API_URL}${id}`);
  }
}
