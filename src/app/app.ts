import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AdminService } from './services/admin';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private adminService = inject(AdminService);
  private router = inject(Router);

  isLoggedIn = this.adminService.isLoggedIn;

  logout(): void {
    this.adminService.logout();
    this.router.navigate(['/admin']);
  }
}
