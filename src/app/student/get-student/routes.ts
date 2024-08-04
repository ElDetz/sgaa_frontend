import { Routes } from '@angular/router';

export const routes: Routes = [
    
        {
            path: '',
            loadComponent: () => import('././get-student.component').then(m => m.GetStudentComponent),
          
            
          }
    
  ];
  
  