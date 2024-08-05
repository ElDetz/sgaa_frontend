import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  userForm: FormGroup;
  userId!: number;
  private defaultTenantId = 'B542BF25-134C-47A2-A0DF-84ED14D03C4A';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getByUser(this.userId).subscribe(user => {
      this.userForm.patchValue({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: ''  // No cargamos la contraseña por seguridad
      });
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const formData = {
        ...this.userForm.value,
        tenantId: this.defaultTenantId
      };

      this.userService.updateUser(this.userId, formData).subscribe(
        response => {
          console.log('User updated successfully', response);
          this.router.navigate(['/user/get-user']);
        },
        error => {
          console.error('Error updating user', error);
        }
      );
    }
  }
}