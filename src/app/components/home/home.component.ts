import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Router } from '@angular/router';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Article } from '../../types/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  articles$: Observable<Article[]> | undefined;
  filteredArticles$: Observable<Article[]> | undefined;
  searchControl: FormControl = new FormControl('');

  constructor(private articleService: ArticleService, private router: Router) {}

  ngOnInit(): void {
    this.articles$ = this.articleService.getArticles();

    this.filteredArticles$ = combineLatest([
      this.articles$,
      this.searchControl.valueChanges.pipe(startWith('')),
    ]).pipe(
      map(([articles, searchTerm]) => this.filterArticles(articles, searchTerm))
    );
  }

  private filterArticles(articles: Article[], searchTerm: string): Article[] {
    if (!searchTerm) {
      return articles;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();
    const keywordArray = lowerSearchTerm.split(' ').filter((word) => word);

    return articles
      .map((article) => ({
        ...article,
        priority: this.calculatePriority(article, keywordArray),
      }))
      .filter((article) => article.priority > 0)
      .sort((a, b) => b.priority - a.priority);
  }

  private calculatePriority(article: Article, keywords: string[]): number {
    let priority = 0;

    const titleLower = article.title.toLowerCase();
    const summaryLower = article.summary.toLowerCase();

    for (let keyword of keywords) {
      if (titleLower.includes(keyword)) {
        priority += 2;
      } else if (summaryLower.includes(keyword)) {
        priority += 1;
      }
    }

    return priority;
  }

  navigateToArticle(id: number): void {
    this.router.navigate(['/article', id]);
  }
}
