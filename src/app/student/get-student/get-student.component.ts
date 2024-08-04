import { Component } from '@angular/core';
import { StudentService } from '../../core/services/student.service';

declare var $: any;

@Component({
  selector: 'app-get-student',
  standalone: true,
  imports: [],
  templateUrl: './get-student.component.html',
  styleUrl: './get-student.component.scss'
})
export class GetStudentComponent {
  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.studentService.getStudents().subscribe(data => {
      $(document).ready(function() {
        $('#studentTable').DataTable({
          data: data.data.items.map((item: any) => ({
            id: item.id,
            email: item.user.email,
            firstName: item.user.firstName,
            lastName: item.user.lastName
          })),
          "pageLength": 5,
          columns: [
            { title: "ID", data: "id" },
            { title: "Email", data: "email" },
            { title: "FirstName", data: "firstName" },
            { title: "LastName", data: "lastName" },
          ],
          responsive: true,
          dom: 'Bfrtip',
          orientation: 'landscape',
          buttons: [{
            extend: 'collection',
            text: 'Reportes',
            orientation: 'landscape',
            buttons: [{
                text: 'Copiar',
                extend: 'copy',

            }, {
                extend: 'pdf'
            }, {
                extend: 'csv'
            }, {
                extend: 'excel'
            }, {
                text: 'Imprimir',
                extend: 'print'
            }]
        }, {
            extend: 'colvis',
            text: 'Visor de columnas',
            collectionLayaut: 'fixed three-column'
        }]
        });
       
      });
    });
  }
}
