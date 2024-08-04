import { Routes } from '@angular/router';

export const routes: Routes = [
    
        {
            path: '',
            loadComponent: () => import('././create-student.component').then(m => m.CreateStudentComponent),
          
            
          }
    
  ];
  
  