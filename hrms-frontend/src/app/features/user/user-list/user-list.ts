import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
  standalone:true
})
export class UserList {
  loading = signal<boolean>(false);
  error = signal<string>('');
  sucessMsg = signal<string>('');
  @Input() users: any[] = [];
  @Output() deleteUser = new EventEmitter<string>()
  @Output() updateUser = new EventEmitter<string>()
  onDelete(id:string){
    this.deleteUser.emit(id);
  }

  onUpdate(users: any){
    console.log(users)
    this.updateUser.emit(users);
  }
}
