import {Component, Input} from '@angular/core';
import {UsersService} from "../../../users/users.services";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {Equipos} from "../../../../interfaces/equipos";
import {DialogComponent} from "../../dialog/dialog.component";

@Component({
  selector: 'app-edit-equipo',
  templateUrl: './edit-equipo.component.html',
  styleUrls: ['./edit-equipo.component.css']
})
export class EditEquipoComponent {
  @Input() showTable = false;
  @Input() showForm = false;

  @Input() rowInformation: Equipos = {
    nombre: '',
    estadio: '',
    sitioWeb: '',
    nacionalidad: '',
    fundacion: new Date(),
    entrenador: '',
    capacidad: 0,
    valor: 0,
    id: 0,
  }

  constructor(
    public userService: UsersService,
    public dialog: MatDialog,
    private router: Router,
  ) {

  }

  openDialog(message: string): void {
    this.dialog.open(DialogComponent, {
      data: {
        text: message,
      },
    });
  }

  editEquipo() {
    this.userService.updateEquipo(this.rowInformation.id, this.rowInformation).subscribe((data) => {
        if (data) {
          this.openDialog('Se ha completado con éxito su solicitud')

          setTimeout(() => {
            this.showTable = true;
            this.showForm = false;
          }, 1500)
        }
      },
      async error => {
        if (error.status) {
          this.openDialog('Ha ocurrido un error, por favor vuelva a intentarlo más tarde')
        }
      })
  }

  cancelForm() {
  }

  ngOnChanges() {
    console.log(this.showTable, 'values')
  }
}
