import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Admin } from '../models/admin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  getAdmin(){
    return this.http.get(`${environment.baseApi}/register`)
  }
  login(model:Admin){
    return this.http.post(`${environment.baseApi}/login` , model)
  }
}
