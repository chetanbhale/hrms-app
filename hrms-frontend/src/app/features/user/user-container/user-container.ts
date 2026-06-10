import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../../client/client.model';
import { User } from '../../../core/services/user';
import { CommonModule } from '@angular/common';
import { UserList } from '../user-list/user-list';

@Component({
  selector: 'app-user-container',
  imports: [CommonModule,UserList],
  templateUrl: './user-container.html',
  styleUrl: './user-container.scss',
  standalone:true
})
export class UserContainer { 
  users = signal<any[]>([]);
  loading = signal(false);
  error = signal('');

  constructor(
    private userService: User,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading.set(true);

    this.userService.getUsers().subscribe({
      next: (res) => {
        console.log(res)
        this.users.set(res.data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load users');
        this.loading.set(false);
      }
    });
  }

  onCreateUsers(data: any) {
    this.userService.createUser(data).subscribe(() => {
      this.loadUsers();
    });
  }

  onDeleteUser(id: string) {
    this.userService.deletUser(id).subscribe(() => {
      this.loadUsers();
    });
  }

  onEditUser(users: any) {
    console.log('NAV CALLED', users);
    this.router.navigate(['/users/edit', users._id]);
  }
}
