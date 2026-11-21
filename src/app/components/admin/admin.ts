import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin';
import { Router, RouterLink } from '@angular/router';
@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-admin',
  styleUrl: './admin.css',
  templateUrl: './admin.html',
})
export class Admin {
  private adminService = inject(AdminService);
  private router = inject(Router);

  username = signal('');
  password = signal('');
  errorMessage = signal('');

  login(): void {
    const success = this.adminService.login(this.username(), this.password());

    if (success) {
      this.errorMessage.set('Connexion réussie !');
      this.router.navigate(['/admin/dashboard']);
    } else {
      this.errorMessage.set('Nom d’utilisateur ou mot de passe incorrect.');
    }
  }
}
