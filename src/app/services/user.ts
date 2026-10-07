import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);

  private apiUrl = 'https://dummyjson.com/users';

  getUsers(): Observable<{ users: User[] }> {
    return this.http.get<{ users: User[] }>(this.apiUrl);
  }
}