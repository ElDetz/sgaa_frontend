import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base-service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  getUsers(): Observable<any> {
    return this.getAll();
  }

  createUser(data: any): Observable<any> {
    return this.create(data);
  }

  getByUser(id: number | string): Observable<any> {
    return this.getById(id);
  }

  updateUser(id: number, data: any): Observable<any> {
    return this.update(id, data);
  }

  deleteUser(id: number): Observable<any> {
    return this.delete(id);
  }
}
