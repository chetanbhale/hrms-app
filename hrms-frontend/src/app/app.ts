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
  user = signal(
  JSON.parse(
    sessionStorage.getItem('user') || '{}'
  )
);
  constructor(private router: Router) {}

goToClients() {
  this.router.navigate(['/clients']);
}

goToUsers() {
  this.router.navigate(['/users']);
}

addClient() {
  this.router.navigate(['/clients/create']);
}

addUsers() {
  this.router.navigate(['/users/create']);
}

logout() {
  sessionStorage.clear();  
  this.router.navigate(['/login']);
}
}
