import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateSuffix',
})
export class DateSuffixPipe implements PipeTransform {
  transform(date: string): string | null {
    if (date) {
      const datePipe = new DatePipe('en-US');
      const day = datePipe.transform(date, 'd');
      let suffix = 'th';

      if (day === '1' || day === '21' || day === '31') {
        suffix = 'st';
      }
      if (day === '2' || day === '22') {
        suffix = 'nd';
      }
      if (day === '3' || day === '23') {
        suffix = 'rd';
      }

      const formattedDate = datePipe.transform(date, `MMMM d'${suffix}', y`);
      return formattedDate;
    }
    return null;
  }
}