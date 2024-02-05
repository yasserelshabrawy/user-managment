import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getRoles() {
    return this.http.get(`${environment.baseApi}/roles`);
  }

  addUser(model: User) {
    return this.http.post(`${environment.baseApi}/users`, model);
  }

  getUser() {
    return this.http.get(`${environment.baseApi}/users`);
  }

  deleteUser(id: string) {
    return this.http.delete(`${environment.baseApi}/users/${id}`);
  }

  updateUser(model: User, id:any) {
    return this.http.put(`${environment.baseApi}/users/${id}`, model);
  }
}
