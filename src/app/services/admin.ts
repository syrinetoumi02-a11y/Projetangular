import { Injectable, signal } from '@angular/core';
import { Admin } from '../models/admin';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private loadAdmin(): Admin {
    const savedAdmin = localStorage.getItem('siray-admin');

    if (savedAdmin) {
      try {
        return JSON.parse(savedAdmin) as Admin;
      } catch {
        localStorage.removeItem('siray-admin');
      }
    }

    return {
      username: 'admin',
      password: '1234',
    };
  }

  private admin = signal<Admin>(this.loadAdmin());

  isLoggedIn = signal<boolean>(false);

  login(username: string, password: string): boolean {
    const account = this.admin();

    if (username === account.username && password === account.password) {
      this.isLoggedIn.set(true);
      return true;
    }

    return false;
  }

  logout(): void {
    this.isLoggedIn.set(false);
  }

  verifyPassword(currentPassword: string): boolean {
    return currentPassword === this.admin().password;
  }

  changePassword(newPassword: string): void {
    this.admin.update((account) => ({
      ...account,
      password: newPassword,
    }));

    localStorage.setItem('siray-admin', JSON.stringify(this.admin()));
  }
}
