import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from "./dashboard.component";
import { AddEquipoComponent } from "./add-equipo/add-equipo.component";
import { EditEquipoComponent } from "./edit-equipo/edit-equipo.component";

const routes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'agregar-equipo', component: AddEquipoComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
