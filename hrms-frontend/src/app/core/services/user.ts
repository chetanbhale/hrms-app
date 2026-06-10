import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../features/client/client.model';

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
  getUsersByID(id:string):Observable<any>{
      return this.httpClint.get<ApiResponse<User>>(`${this.baseUrl}/${id}`)
  }
  createUser(data:any):Observable<any>{
    return this.httpClint.post(this.baseUrl,data)
  }

    updateUser(
    id: string,
    data: any
  ): Observable<any> {

    return this.httpClint.patch(
      `${this.baseUrl}/${id}`,
      data
    );
  }

  deletUser (id:string):Observable<any>{
      return this.httpClint.delete(`${this.baseUrl}/${id}`)
  }
}
