import { Component } from '@angular/core';
import { Router } from "@angular/router";
import {UsersService} from "../../../users/users.services";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from "../../dialog/dialog.component";

export const MY_FORMATS: any = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
// @ts-ignore
@Component({
  selector: 'app-add-equipo',
  templateUrl: './add-equipo.component.html',
  styleUrls: ['./add-equipo.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ],
})

export class AddEquipoComponent {
  formData: FormGroup;
  text = 'Su solicitud se ha completado con exito'

  constructor(
    public userService: UsersService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
  ) {
      this.formData = this.fb.group({
        nombre: ['', Validators.required],
        estadio: ['', Validators.required],
        sitioWeb: ['', Validators.required],
        nacionalidad: ['', Validators.required],
        fundacion: ['', Validators.required],
        entrenador: ['', Validators.required],
        capacidad: ['', Validators.required],
        valor: ['', Validators.required],
      })
    }

  openDialog(message: string): void {
    this.dialog.open(DialogComponent, {
      data: {
        text: message,
      },
    });
  }
  addEquipo() {
    console.log(this.formData.value, 'values')
    this.userService.createEquipo(this.formData.value).subscribe((data) => {
      console.log(data)
      if (data) {
        this.openDialog('Se ha completado con éxito su solicitud')

        setTimeout(() => {
          this.router.navigate(['dashboard'])
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
    this.router.navigate(['dashboard'])
  }
}
