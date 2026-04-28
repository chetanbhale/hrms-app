import { Component, signal } from '@angular/core';
import { Client } from '../../../core/services/client';
import { CommonModule } from '@angular/common';
import { ClientList } from '../client-list/client-list';
import { ClientForm } from '../client-form/client-form';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-container',
  imports: [CommonModule,ClientList],
  templateUrl: './client-container.html',
  styleUrl: './client-container.scss',
})
export class ClientContainer {
  clients = signal<any[]>([]);
  loading = signal(false);
  error = signal('');

  constructor(
    private clientService: Client,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    this.loading.set(true);

    this.clientService.getClient().subscribe({
      next: (res) => {
        this.clients.set(res.data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load clients');
        this.loading.set(false);
      }
    });
  }

  onCreateClient(data: any) {
    this.clientService.createClient(data).subscribe(() => {
      this.loadClients();
    });
  }

  onDeleteClient(id: string) {
    this.clientService.deletClient(id).subscribe(() => {
      this.loadClients();
    });
  }

  onEditClient(client: any) {
    console.log('NAV CALLED', client);
    this.router.navigate(['/clients/edit', client._id]);
  }
}
