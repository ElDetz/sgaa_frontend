import { Routes } from '@angular/router';

export const routes: Routes = [
    
        {
            path: '',
            loadComponent: () => import('././delete-student.component').then(m => m.DeleteStudentComponent),
          
            
          }
    
  ];
  
  