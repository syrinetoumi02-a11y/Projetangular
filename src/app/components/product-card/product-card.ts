import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Car } from '../../models/car';
import { PriceFormatPipe } from '../../pipes/price-format-pipe';
@Component({
  selector: 'app-product-card',
  imports: [RouterLink, PriceFormatPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCard {
  car = input.required<Car>();
}