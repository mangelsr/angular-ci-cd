import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';
import { User, CreateUserDTO } from './../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private http = inject(HttpClient);


  private apiUrl = `${environment.API_URL}/api/v1/users`;

  create(dto: CreateUserDTO) {
    return this.http.post<User>(this.apiUrl, dto);
  }

  getAll() {
    return this.http.get<User[]>(this.apiUrl);
  }

  isAvailableByEmail(email: string) {
    return this.http.post<{isAvailable: boolean}>(`${this.apiUrl}/is-available`, {email});
  }
}
