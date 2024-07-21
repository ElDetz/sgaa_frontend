import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ApiResponse {
  success: boolean;
  errors: string[] | null;
  detailedErrors: string[];
  data: {
    count: number;
    items: Student[];
    page: number;
    pageSize: number;
  };
}

interface Student {
  id: string;
  userId: string;
  user: {
    id: string;
    tenantId: string;
    email: string;
    firstName: string;
    lastName: string;
    role: number;
    status: number;
  };
  code: string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:7000/api/v1/Student';

  constructor(private http: HttpClient) {
    console.log('HttpClient injected:', !!http);
    console.log('API URL:', this.apiUrl);
  }

  getStudents(page: number = 1, pageSize: number = 10): Observable<ApiResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    console.log('Fetching students with params:', params.toString());
    return this.http.get<ApiResponse>(this.apiUrl, { params });
  }

  getStudentById(studentId: string): Observable<ApiResponse> {
    const url = `${this.apiUrl}/${studentId}`;
    console.log('Fetching student by ID:', studentId);
    return this.http.get<ApiResponse>(url);
  }

  createStudent(student: Student): Observable<ApiResponse> {
    console.log('Creating student:', student);
    return this.http.post<ApiResponse>(this.apiUrl, student);
  }

  updateStudent(studentId: string, student: Student): Observable<ApiResponse> {
    const url = `${this.apiUrl}/${studentId}`;
    console.log('Updating student with ID:', studentId, 'Data:', student);
    return this.http.put<ApiResponse>(url, student);
  }

  deleteStudent(studentId: string): Observable<ApiResponse> {
    const url = `${this.apiUrl}/${studentId}`;
    console.log('Deleting student with ID:', studentId);
    return this.http.delete<ApiResponse>(url);
  }
}
