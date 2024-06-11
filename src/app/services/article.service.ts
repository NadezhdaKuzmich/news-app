import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private API_URL =
    'https://api.spaceflightnewsapi.net/v4/articles/?format=json&limit=100';

  constructor(private http: HttpClient) {}

  getArticles(): Observable<any> {
    return this.http.get(this.API_URL);
  }
}
