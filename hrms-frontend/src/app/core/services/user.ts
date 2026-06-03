import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class User {
  //private baseUrl ='https://hrms-app-frontend.onrender.com/api/clients'
  private baseUrl = 'http://localhost:5000/api/users';
          constructor(private httpClint:HttpClient){}
  getUsers():Observable<any>{
      return this.httpClint.get(this.baseUrl)
  }

  createUser(data:any):Observable<any>{
    return this.httpClint.post(this.baseUrl,data)
  }
}
