import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../../core/services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.scss'],
  standalone: true,
  imports: []
})
export class CreateStudentComponent {
  studentForm: FormGroup;

  constructor(private fb: FormBuilder, private studentService: StudentService, private router: Router) {
    this.studentForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      this.studentService.createStudent(this.studentForm.value).subscribe(
        response => {
          console.log('Student created successfully', response);
          // Navegar a otra página o mostrar un mensaje de éxito
          this.router.navigate(['/students']); // Asegúrate de tener esta ruta configurada
        },
        error => {
          console.error('Error creating student', error);
          // Manejar el error, mostrar un mensaje de error, etc.
        }
      );
    }
  }
}
