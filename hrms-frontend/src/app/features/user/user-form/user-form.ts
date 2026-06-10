import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../core/services/user';
import { ActivatedRoute, Route, Router } from '@angular/router';
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
  constructor(private userform:FormBuilder, private userSerivce: User, private router:Router, private route: ActivatedRoute,){
      this.creatUserForm = this.userform.group({
        name:[''],
        email:[''],
        password:[''],
        role:['MEMBER']
      })
  }

   ngOnInit(){
    this.userId = this.route.snapshot.paramMap.get('id') || '';
        if (this.userId) {
      this.isEdit.set(true);
      this.userSerivce.getUsersByID(this.userId).subscribe((res: any) => {
        this.creatUserForm.patchValue(res.data);
      });
    }
   }
  onSubmit(){
    if(this.isEdit()){
        this.userSerivce.updateUser(this.userId, this.creatUserForm.value)
        .subscribe(() => {
          alert('Updated successfully');
          this.router.navigate(['/users']);  
        });
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
