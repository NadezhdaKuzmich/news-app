import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  articles: any | undefined;
  filteredArticles: any | undefined;
  filterText: string = '';

  constructor(private articleService: ArticleService, private router: Router) {}

  ngOnInit(): void {
    this.articleService.getArticles().subscribe((data) => {
      this.articles = data.results;
      this.filteredArticles = this.articles;
    });
  }

  filterArticles() {
    if (this.filterText) {
      const keywords = this.filterText
        .toLowerCase()
        .split(' ')
        .filter((k) => k.length > 0);

      this.filteredArticles = this.articles
        ?.map((article: any) => {
          const titleMatches = this.countMatches(article.title, keywords);
          const descriptionMatches = this.countMatches(
            article.summary,
            keywords
          );

          return {
            ...article,
            titleMatches,
            descriptionMatches,
            totalMatches: titleMatches + descriptionMatches,
          };
        })
        .filter((article: any) => article.totalMatches > 0)
        .sort(
          (a: any, b: any) =>
            b.titleMatches - a.titleMatches || b.totalMatches - a.totalMatches
        );
    } else {
      this.filteredArticles = this.articles;
    }
  }

  countMatches(text: string, keywords: string[]): number {
    return keywords.reduce(
      (count, keyword) =>
        count + (text.toLowerCase().includes(keyword) ? 1 : 0),
      0
    );
  }

  navigateToArticle(id: string): void {
    this.router.navigate(['/article', id]);
  }
}
