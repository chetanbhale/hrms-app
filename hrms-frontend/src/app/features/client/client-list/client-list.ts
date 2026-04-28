import { Component, Input, OnInit, signal, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-list',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './client-list.html',
  styleUrl: './client-list.scss',
})
export class ClientList{

  loading = signal<boolean>(false);
  error = signal<string>('');
  sucessMsg = signal<string>('');
  @Input() clients: any[] = [];
  @Output() deleteClient = new EventEmitter<string>()
  @Output() updateClient = new EventEmitter<string>()
  onDelete(id:string){
    this.deleteClient.emit(id);
  }

  onUpdate(client: any){
    console.log(client)
    this.updateClient.emit(client);
  }
}
