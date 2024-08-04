import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';

declare var $: any;

@Component({
  selector: 'app-get-user',
  templateUrl: './get-user.component.html',
  styleUrls: ['./get-user.component.scss'],
  standalone: true,
  imports: [],
})
export class GetUserComponent implements OnInit {

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe(data => {
      $(document).ready(function() {
        $('#userTable').DataTable({
          data: data.data.items,
          "pageLength": 5,
          columns: [
            { title: "ID", data: "id" },
            { title: "Name", data: "firstName" },
            { title: "LastName", data: "lastName" },
            { title: "Email", data: "email" }
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
