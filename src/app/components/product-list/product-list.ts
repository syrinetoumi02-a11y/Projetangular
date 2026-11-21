import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CarService } from '../../services/car';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-product-list',
  imports: [ProductCard],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit {

  private carService = inject(CarService);

  cars = this.carService.cars;

  // Critères de recherche
  searchName = signal('');
  searchBrand = signal('');

  // Recherche multicritère
  filteredCars = computed(() => {
    return this.cars().filter(car =>
      car.name.toLowerCase().includes(this.searchName().toLowerCase()) &&
      car.brand.toLowerCase().includes(this.searchBrand().toLowerCase())
    );
  });

  ngOnInit(): void {
    this.carService.getCars();
  }
}