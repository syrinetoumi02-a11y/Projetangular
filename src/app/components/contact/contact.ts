import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactMessageService } from '../../services/contact-message';
import { ContactMessage } from '../../models/contact-message';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  private contactService = inject(ContactMessageService);

  name = signal('');
  email = signal('');
  subject = signal('');
  message = signal('');

  successMessage = signal('');
  errorMessage = signal('');

  sendMessage(): void {
    // 1. Vérifier que tous les champs sont remplis
    if (
      !this.name().trim() ||
      !this.email().trim() ||
      !this.subject().trim() ||
      !this.message().trim()
    ) {
      this.errorMessage.set('Veuillez remplir tous les champs.');
      this.successMessage.set('');
      return;
    }

    // 2. Vérifier le format de l'adresse e-mail
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(this.email().trim())) {
      this.errorMessage.set('Veuillez saisir une adresse e-mail valide.');
      this.successMessage.set('');
      return;
    }

    // 3. Créer le nouveau message
    const newMessage: ContactMessage = {
      name: this.name().trim(),
      email: this.email().trim(),
      subject: this.subject().trim(),
      message: this.message().trim(),
      createdAt: new Date().toISOString(),
    };

    // 4. Envoyer le message à JSON Server
    this.contactService.addMessage(newMessage).subscribe({
      next: () => {
        this.successMessage.set('Votre message a été enregistré avec succès !');
        this.errorMessage.set('');

        // 5. Vider les champs après l'envoi
        this.name.set('');
        this.email.set('');
        this.subject.set('');
        this.message.set('');
      },

      error: (err) => {
        console.error('Erreur lors de l’envoi :', err);

        this.errorMessage.set('Impossible d’envoyer le message. Veuillez réessayer.');

        this.successMessage.set('');
      },
    });
  }
}
