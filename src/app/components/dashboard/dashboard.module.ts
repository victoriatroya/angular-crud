import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { EquiposComponent } from './equipos/equipos.component';
import { AddEquipoComponent } from './add-equipo/add-equipo.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { DialogComponent } from "../dialog/dialog.component";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { EditEquipoComponent } from './edit-equipo/edit-equipo.component';

@NgModule({
  declarations: [
    DashboardComponent,
    EquiposComponent,
    AddEquipoComponent,
    DialogComponent,
    EditEquipoComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [
    DialogComponent
  ]
})
export class DashboardModule  {
}
