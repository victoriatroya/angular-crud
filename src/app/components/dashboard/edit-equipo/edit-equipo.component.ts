import {Component, EventEmitter, Input, Output} from '@angular/core';
import { UsersService } from '../../../users/users.services';
import { MatDialog } from '@angular/material/dialog';
import { Equipos } from '../../../../interfaces/equipos';
import { DialogComponent } from '../../dialog/dialog.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-equipo',
  templateUrl: './edit-equipo.component.html',
  styleUrls: ['./edit-equipo.component.css'],
})
export class EditEquipoComponent {
  @Input() showTable = false;
  @Input() showForm = false;
  @Output() getSearchStatusChange = new EventEmitter<boolean>();

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
  };

  team: FormGroup = this.fb.group({
    nombre: null,
    estadio: null,
    sitioWeb: null,
    nacionalidad: null,
    fundacion: null,
    entrenador: null,
    capacidad: null,
    valor: null,
    id: null,
  });

  constructor(
    public userService: UsersService,
    public dialog: MatDialog,
    private fb: FormBuilder,
  ) {
  }

  initForm(): void {}

  ngOnInit(): void {}

  openDialog(message: string): void {
    this.dialog.open(DialogComponent, {
      data: {
        text: message,
      },
    });
  }

  editEquipo() {
    this.userService
      .updateEquipo(this.rowInformation.id, this.rowInformation)
      .subscribe(
        (data) => {
          if (data) {
            this.openDialog('Se ha completado con éxito su solicitud');

            setTimeout(() => {
              window.location.href = '/dashboard'
            }, 1500);
          }
        },
        async (error) => {
          if (error.status) {
            this.openDialog(
              'Ha ocurrido un error, por favor vuelva a intentarlo más tarde'
            );
          }
        }
      );
  }

  ngOnChanges() {
    this.team?.setValue({
      nombre: this.rowInformation.nombre,
      estadio: this.rowInformation.estadio,
      sitioWeb: this.rowInformation.sitioWeb,
      nacionalidad: this.rowInformation.nacionalidad,
      fundacion: this.rowInformation.fundacion,
      entrenador: this.rowInformation.entrenador,
      capacidad: this.rowInformation.capacidad,
      valor: this.rowInformation.valor,
      id: this.rowInformation.id,
    });
  }

  cancelForm() {
    window.location.href = '/dashboard'
  }
}
