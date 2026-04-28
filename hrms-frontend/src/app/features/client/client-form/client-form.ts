import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Client } from '../../../core/services/client';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './client-form.html',
  styleUrl: './client-form.scss',
})
export class ClientForm {

  createClientForm: FormGroup;
  isEdit = signal(false);
  clientId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientService: Client,
    private fb: FormBuilder
  ) {
    this.createClientForm = this.fb.group({
      companyName: [''],
      companyEmail: [''],
      subscriptionPlan: ['FREE']
    });
  }

  ngOnInit() {
    this.clientId = this.route.snapshot.paramMap.get('id') || '';

    if (this.clientId) {
      this.isEdit.set(true);

      this.clientService.getClientById(this.clientId).subscribe((res: any) => {
        this.createClientForm.patchValue(res.data);
      });
    }
  }

  onSubmit() {
    if (this.isEdit()) {
      this.clientService.updateClient(this.clientId, this.createClientForm.value)
        .subscribe(() => {
          alert('Updated successfully');
          this.router.navigate(['/clients']);  
        });
    } else {
      this.clientService.createClient(this.createClientForm.value)
        .subscribe(() => {
          alert('Created successfully');
          this.router.navigate(['/clients']);
        });
    }
  }
}