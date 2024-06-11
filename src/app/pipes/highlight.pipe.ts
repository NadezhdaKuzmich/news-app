import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
})
export class HighlightPipe implements PipeTransform {
  // transform(value: string, keyword: string): any {
  //   if (!keyword) return value;
  //   const re = new RegExp(keyword, 'gi');
  //   return value.replace(re, '<span class="highlight">$&</span>');
  // }
  transform(value: string, keyword: string): string {
    if (!keyword) return value;
    const escapedKeyword = keyword.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    const keywords = escapedKeyword
      .split(' ')
      .filter((k) => k.length > 0)
      .join('|');
    const regex = new RegExp(`(${keywords})`, 'gi');

    // Replace matched keywords with highlighted version
    return value.replace(
      regex,
      (match) => `<span class="highlight">${match}</span>`
    );
  }
}
