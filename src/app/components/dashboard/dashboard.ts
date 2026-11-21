import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private adminService = inject(AdminService);
  private router = inject(Router);

  currentPassword = signal('');
  newPassword = signal('');
  confirmPassword = signal('');
  message = signal('');
  messageType = signal('');

  changePassword(): void {
    if (!this.currentPassword() || !this.newPassword() || !this.confirmPassword()) {
      this.message.set('Veuillez remplir tous les champs.');
      this.messageType.set('error');
      return;
    }

    if (!this.adminService.verifyPassword(this.currentPassword())) {
      this.message.set('Ancien mot de passe incorrect.');
      this.messageType.set('error');
      return;
    }

    if (this.newPassword().length < 4) {
      this.message.set('Le nouveau mot de passe doit contenir au moins 4 caractères.');
      this.messageType.set('error');
      return;
    }

    if (this.newPassword() !== this.confirmPassword()) {
      this.message.set('Les nouveaux mots de passe ne correspondent pas.');
      this.messageType.set('error');
      return;
    }

    this.adminService.changePassword(this.newPassword());

    this.message.set('Mot de passe modifié avec succès !');
    this.messageType.set('success');

    this.currentPassword.set('');
    this.newPassword.set('');
    this.confirmPassword.set('');
  }

  logout(): void {
    this.adminService.logout();
    this.router.navigate(['/admin']);
  }
}
