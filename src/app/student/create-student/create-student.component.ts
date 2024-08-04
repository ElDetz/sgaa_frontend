import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { StudentService } from '../../core/services/student.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-student',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.scss']
})
export class CreateStudentComponent {
  studentForm: FormGroup;
  private defaultTenantId = 'B542BF25-134C-47A2-A0DF-84ED14D03C4A';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private studentService: StudentService,
    private router: Router
  ) {
    this.studentForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      code: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      const userFormData = {
        email: this.studentForm.get('email')?.value,
        firstName: this.studentForm.get('firstName')?.value,
        lastName: this.studentForm.get('lastName')?.value,
        password: this.studentForm.get('password')?.value,
        tenantId: this.defaultTenantId
      };

      this.userService.createUser(userFormData).subscribe(
        userResponse => {
          console.log('User created successfully', userResponse);

          // Asegúrate de que userResponse.id contenga el userId del usuario creado
          const studentFormData = {
            userId: userResponse.data, // Aquí debe estar el campo correcto donde se encuentra el userId
            code: this.studentForm.get('code')?.value
          };

          this.studentService.createStudent(studentFormData).subscribe(
            studentResponse => {
              console.log('Student created successfully', studentResponse);
              this.router.navigate(['/list-student']);
            },
            studentError => {
              console.error('Error creating student', studentError);
            }
          );
        },
        userError => {
          console.error('Error creating user', userError);
        }
      );
    }
  }
}
