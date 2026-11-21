import { Component, inject, signal, OnInit } from '@angular/core';
import { ContactMessageService } from '../../services/contact-message';
import { ContactMessage } from '../../models/contact-message';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-messages',
  imports: [DatePipe],
  templateUrl: './admin-messages.html',
  styleUrl: './admin-messages.css',
})
export class AdminMessages implements OnInit {
  private contactService = inject(ContactMessageService);

  messages = signal<ContactMessage[]>([]);
  errorMessage = signal('');

  ngOnInit(): void {
    this.contactService.getMessages().subscribe({
      next: (data) => {
        this.messages.set(data);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage.set('Impossible de récupérer les messages.');
      },
    });
  }
}
