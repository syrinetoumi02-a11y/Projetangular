
import { Component, inject, signal, OnInit } from '@angular/core';
import {
  form,
  FormField,
  required,
  min,
  submit
} from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { CarService } from '../../services/car';
import { Car } from '../../models/car';

interface CarFormModel {
  name: string;
  brand: string;
  image: string;
  price: number;
  available: boolean;
  releaseDate: string;
  description: string;
  specifications: {
    engine: string;
    horsepower: number;
    transmission: string;
    fuel: string;
  };
}

@Component({
  selector: 'app-car-form',
  imports: [FormField],
  templateUrl: './car-form.html',
  styleUrl: './car-form.css'
})
export class CarForm implements OnInit {

  private carService = inject(CarService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  carId = signal<string | null>(null);

  // Modèle du formulaire
  carModel = signal<CarFormModel>({
    name: '',
    brand: '',
    image: '',
    price: 0,
    available: true,
    releaseDate: '',
    description: '',
    specifications: {
      engine: '',
      horsepower: 0,
      transmission: '',
      fuel: ''
    }
  });

  // Signal Form avec validations
  carForm = form(this.carModel, (path) => {

    required(path.name);
    required(path.brand);
    required(path.image);
    min(path.price, 1);
    required(path.releaseDate);
    required(path.description);

    required(path.specifications.engine);
    min(path.specifications.horsepower, 1);
    required(path.specifications.transmission);
    required(path.specifications.fuel);

  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.carId.set(id);

      this.carService.getCarById(id).subscribe({
        next: (car) => {

          this.carModel.set({
            name: car.name,
            brand: car.brand,
            image: car.image,
            price: car.price,
            available: car.available,
            releaseDate: new Date(car.releaseDate)
              .toISOString()
              .substring(0, 10),
            description: car.description,
            specifications: {
              engine: car.specifications.engine,
              horsepower: car.specifications.horsepower,
              transmission: car.specifications.transmission,
              fuel: car.specifications.fuel
            }
          });

        },
        error: (err) => console.error('Erreur:', err)
      });
    }
  }

  async saveCar(): Promise<void> {

    try {
      await submit(this.carForm, async (field) => {

        const values = field().value();

        const carData: Omit<Car, 'id'> = {
          name: values.name,
          brand: values.brand,
          image: values.image,
          price: values.price,
          available: values.available,
          releaseDate: new Date(values.releaseDate),
          description: values.description,
          specifications: {
            engine: values.specifications.engine,
            horsepower: values.specifications.horsepower,
            transmission: values.specifications.transmission,
            fuel: values.specifications.fuel
          },
          comments: []
        };

        if (this.carId()) {

          const updatedCar: Car = {
            id: this.carId()!,
            ...carData
          };

          await firstValueFrom(
            this.carService.updateCar(updatedCar)
          );

          alert('Voiture modifiée avec succès !');

        } else {

          await firstValueFrom(
            this.carService.addCar(carData)
          );

          alert('Voiture ajoutée avec succès !');

        }

        this.router.navigate(['/admin/cars']);

      });

    } catch (err) {
      console.error('Erreur:', err);
      alert('Une erreur est survenue lors de l’enregistrement.');
    }
  }
}
