import { Component, OnInit } from '@angular/core';
import { StudentService } from '../core/services/student.service';

declare var $: any;

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
  standalone: true, // Esto indica que el componente es standalone
  imports: [] // Aquí puedes importar otros módulos si es necesario
})
export class StudentComponent implements OnInit {

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


