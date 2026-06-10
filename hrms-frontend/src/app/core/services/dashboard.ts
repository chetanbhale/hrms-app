import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {

  constructor(private httpclient:HttpClient){}

  private baseUrl = 'http://localhost:5000/api/dashboard';


  getStats(): Observable<any>{
    return this.httpclient.get(`${this.baseUrl}/stats`);
  }
}
