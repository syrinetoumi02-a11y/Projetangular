import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFormat',
  standalone: true
})
export class PriceFormatPipe implements PipeTransform {

  transform(price: number): string {
    return new Intl.NumberFormat('fr-FR').format(price) + ' €';
  }

}