import { Routes } from '@angular/router';

export const routes: Routes = [
    
        {
            path: '',
            loadComponent: () => import('././update-student.component').then(m => m.UpdateStudentComponent),
          
            
          }
    
  ];
  
  