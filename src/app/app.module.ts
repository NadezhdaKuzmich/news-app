import { NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ArticleComponent } from './components/article/article.component';
import { HighlightPipe } from './pipes/highlight.pipe';
import { SanitizeHtmlPipe } from './pipes/sanitize-html.pipe';
import { DateSuffixPipe } from './pipes/date-suffix.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArticleComponent,
    HighlightPipe,
    SanitizeHtmlPipe,
    DateSuffixPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'custom-search-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/search-icon.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'custom-date-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/date-icon.svg'
      )
    );
  }
}