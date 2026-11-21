import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/cars';

  // Signal contenant la liste des voitures
  cars = signal<Car[]>([]);

  // READ : récupérer toutes les voitures
  getCars(): void {
    this.http.get<Car[]>(this.apiUrl).subscribe({
      next: (data) => this.cars.set(data),
      error: (err) => console.error('Erreur:', err)
    });
  }

  // READ : récupérer une voiture par son ID
  getCarById(id: string) {
    return this.http.get<Car>(`${this.apiUrl}/${id}`);
  }

  // CREATE : ajouter une voiture
  addCar(car: Omit<Car, 'id'>) {
    return this.http.post<Car>(this.apiUrl, car);
  }

  // UPDATE : modifier une voiture
  updateCar(car: Car) {
    return this.http.put<Car>(`${this.apiUrl}/${car.id}`, car);
  }

  // DELETE : supprimer une voiture
  deleteCar(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}