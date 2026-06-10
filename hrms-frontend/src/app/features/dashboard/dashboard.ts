import { Component, OnInit, signal } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth-service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DashboardService } from '../../core/services/dashboard';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit{

  stats = signal<any>(null);

  constructor(private authService:AuthService,private router:Router,private dashboardService:DashboardService){}

  ngOnInit(): void {
     this.getStats()
  }
  onSubmit() {
    this.authService.logOut();
    this.router.navigate(['/login'])
  }

  getStats(){
    this.dashboardService.getStats().subscribe((res) => {
    this.stats.set(res.data);
    console.log(this.stats())
  });
  }
}
