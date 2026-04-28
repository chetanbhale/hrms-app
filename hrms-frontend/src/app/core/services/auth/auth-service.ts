import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:5000/api/auth';

  constructor(private httpClient:HttpClient){};
  login(data:{email:string;password:string}):Observable<any>{
    return this.httpClient.post(`${this.baseUrl}/login`,data)
  }
  
  setToken(token:string){
    sessionStorage.setItem('token',token)
  }

  getToken(){
    return sessionStorage.getItem('token')
  }

  logOut(){
    sessionStorage.removeItem('token')
  }
}
