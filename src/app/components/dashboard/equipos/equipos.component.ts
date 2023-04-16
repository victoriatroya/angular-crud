import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { UsersService } from "../../../users/users.services";
import { Equipos } from "../../../../interfaces/equipos";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import * as moment from "moment";

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent implements OnInit {
  dataTable: Equipos[] = [];
  showTable: boolean = true;
  showForm: boolean = true;
  id: any;

  initialDate: Date = new Date();
  lastDate: Date = new Date();
  rowInformation: Equipos = {
    nombre: '',
    estadio: '',
    sitioWeb: '',
    nacionalidad: '',
    fundacion: new Date(),
    entrenador: '',
    capacidad: 0,
    valor: 0,
    id: 0
  }
  constructor(
    public userService: UsersService,
    private router: Router,
    private fb: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef
  ) {
  }
  ngOnInit(): void {
    this.getDataList()
    this.showForm = false
    console.log(this.datesFormat(this.initialDate))

  }

  getDataList() {
    this.userService.getData().subscribe((data) => {
      this.dataTable = data.content;
    });
  }

  deleteItem(id: number) {
    this.userService.deleteEquipo(id).subscribe(() => {
      this.ngOnInit();
    });
  };

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-GB');
  };

  datesFormat(date: Date): string{
    return moment(date).format('DD-MM-YYYY')
  }

  getInformationRow(item: Equipos) {
    this.showTable = false;
    this.showForm = true;
    this.rowInformation = item;
  }

  searchId(e: any): any {
    this.id = Number(e.target.value)

    if (this.id === 0) {
      this.ngOnInit();
    }

    this.userService.searchId(this.id).subscribe((data) => {
      if (data) {
        this.dataTable = [data]
      } else {
        this.dataTable
      }
    });
  }

  searchInitialDate(e:any) {
    this.initialDate = e.target.value;

    console.log(this.initialDate, 'iniral dsate')
  }
  searchDatePicker(e: any) {
    console.log('entro')
    this.lastDate = e.target.value
    console.log(this.lastDate, 'lastdate')

    this.userService.searchDatepicker(this.datesFormat(this.initialDate), this.datesFormat(this.lastDate)).subscribe((data) => {
      if (data) {
        console.log(data, 'data')
        this.dataTable = [data]
      }
    });
  }


}
