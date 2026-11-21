import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarService } from '../../services/car';
import { Car } from '../../models/car';
import { PriceFormatPipe } from '../../pipes/price-format-pipe';

@Component({
  selector: 'app-product-detail',
  imports: [PriceFormatPipe],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private carService = inject(CarService);

  car = signal<Car | undefined>(undefined);
  errorMessage = signal('');

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.errorMessage.set('Identifiant du véhicule introuvable.');
      return;
    }

    this.carService.getCarById(id).subscribe({
      next: (data) => {
        this.car.set(data);
        this.errorMessage.set('');
      },
      error: (err) => {
        console.error('Erreur lors du chargement du véhicule :', err);
        this.errorMessage.set('Impossible de charger ce véhicule. Il est peut-être introuvable.');
      },
    });
  }
}
