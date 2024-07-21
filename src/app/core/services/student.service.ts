import { Injectable } from '@angular/core';
import { HttpClient, HttpParams ,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base-service';

@Injectable({
  providedIn: 'root'
})
export class StudentService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  getStudents(): Observable<any> {
    return this.getAll();
  }
}
