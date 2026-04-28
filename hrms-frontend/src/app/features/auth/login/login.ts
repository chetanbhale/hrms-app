import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth-service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login { 
  
  email = '';
  password = '';

  constructor(private authService: AuthService, private router:Router) {}

  onSubmit() {
    this.authService.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        console.log('Login success', res);
        this.authService.setToken(res.data.token);
         sessionStorage.setItem('user', JSON.stringify(res.data.user));
         this.redirectUser(res.data.user.role);},
      error: (err) => {
        console.error('Login error', err);
      }
    });
  }

redirectUser(role: string) {
  if (role === 'SUPER_ADMIN') {
    this.router.navigate(['/dashboard']);
  } else {
    this.router.navigate(['/dashboard']);
  }
}

}
