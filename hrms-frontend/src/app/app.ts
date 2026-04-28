import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('hrms-frontend');
  constructor(private router: Router) {}

goToClients() {
  this.router.navigate(['/clients']);
}

addClient() {
  this.router.navigate(['/clients/create']);
}

logout() {
  sessionStorage.clear();  
  this.router.navigate(['/login']);
}
}
