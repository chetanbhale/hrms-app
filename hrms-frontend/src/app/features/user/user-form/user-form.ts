import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../core/services/user';
import { Route, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss',
  standalone:true
})
export class UserForm {
  creatUserForm:FormGroup;
  isEdit = signal(false);
  userId:string ='';
  constructor(private userform:FormBuilder, private userSerivce: User, private router:Router){
      this.creatUserForm = this.userform.group({
        name:[''],
        email:[''],
        password:[''],
        role:['MEMBER']
      })
  }

   ngOnInit(){
    // this.userId =  this.router.snapshot.paramMap.get('id') || '';

   }
  onSubmit(){
    if(this.isEdit()){
    }
    else{
        this.userSerivce.createUser(this.creatUserForm.value).subscribe(()=>{
          console.log("USR",this.creatUserForm.value)
          alert('Created successfully');
          this.router.navigate(['/users']);
        })

    }
  } 
}
