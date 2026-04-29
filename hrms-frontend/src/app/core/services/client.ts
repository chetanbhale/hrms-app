import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../features/client/client.model';

@Injectable({
  providedIn: 'root',
})
export class Client {
   private baseUrl ='https://hrms-app-1-3uil.onrender.com/api/clients'
    // private baseUrl = 'http://localhost:5000/api/clients';
   constructor (private httpclient:HttpClient){}
    getClient():Observable<any>{
      return this.httpclient.get(this.baseUrl);
    }
    createClient (data:any):Observable<any>{
      return this.httpclient.post(this.baseUrl,data)
    }
    deletClient (id:string):Observable<any>{
      return this.httpclient.delete(`${this.baseUrl}/${id}`)
    }
    updateClient(id: string, data: any) {
    return this.httpclient.put(`${this.baseUrl}/${id}`, data);
  }
    getClientById(id: string) {
    return this.httpclient.get<ApiResponse<Client>>(`${this.baseUrl}/${id}`);
  }
}
