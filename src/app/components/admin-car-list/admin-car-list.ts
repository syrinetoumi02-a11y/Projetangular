import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CarService } from '../../services/car';
import { RouterLink, Router } from '@angular/router';
import { PriceFormatPipe } from '../../pipes/price-format-pipe';

@Component({
  selector: 'app-admin-car-list',
  imports: [RouterLink, PriceFormatPipe],
  templateUrl: './admin-car-list.html',
  styleUrl: './admin-car-list.css'
})
export class AdminCarList implements OnInit {

  private carService = inject(CarService);
  private router = inject(Router);

  cars = this.carService.cars;

  searchName = signal('');
  searchBrand = signal('');

  filteredCars = computed(() => {
    return this.cars().filter(car =>
      car.name.toLowerCase().includes(this.searchName().toLowerCase()) &&
      car.brand.toLowerCase().includes(this.searchBrand().toLowerCase())
    );
  });

  ngOnInit(): void {
    this.carService.getCars();
  }

  editCar(id: string): void {
    this.router.navigate(['/admin/cars/edit', id]);
  }

  deleteCar(id: string): void {
    const confirmation = confirm(
      'Attention ! Voulez-vous vraiment supprimer cette voiture ?'
    );

    if (confirmation) {
      this.carService.deleteCar(id).subscribe({
        next: () => {
          alert('Voiture supprimée avec succès !');
          this.carService.getCars();
        },
        error: (err) => {
          console.error('Erreur:', err);
          alert('Erreur lors de la suppression.');
        }
      });
    }
  }
}