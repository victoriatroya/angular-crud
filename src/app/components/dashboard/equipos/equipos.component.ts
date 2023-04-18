import {ChangeDetectorRef, Component, OnChanges, OnInit} from '@angular/core';
import { UsersService } from '../../../users/users.services';
import { Equipos } from '../../../../interfaces/equipos';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css'],
})
export class EquiposComponent implements OnInit {
  dataTable: Equipos[] = [];
  showTable: boolean = true;
  showForm: boolean = true;
  id: null | number = null;

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
    id: 0,
  };
  constructor(
    public userService: UsersService,
  ) {}
  ngOnInit(): void {
    this.loadInitData();
  }

  loadInitData(): void {
    this.getDataList();
    this.showForm = false;
  }

  getDataList() {
    this.userService.getData().subscribe((data) => {
      this.dataTable = data.content;
    });
  }

  deleteItem(id: number) {
    this.userService.deleteEquipo(id).subscribe(() => {
      this.loadInitData();
    });
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-GB');
  }

  datesFormat(date: Date): string {
    return moment(date).format('DD-MM-YYYY');
  }

  getInformationRow(item: Equipos) {
    this.showTable = false;
    this.showForm = true;
    this.rowInformation = {
      ...item,
      fundacion: new Date(item.fundacion)
    };
  }

  searchId(e: any): any {
    this.id = e.target.value;

    if (this.id === 0) {
      this.loadInitData();
    }

    this.userService.searchId(Number(this.id)).subscribe((data) => {
      if (data) {
        this.dataTable = [data];
      } else {
        this.dataTable;
      }
    });
  }

  searchInitialDate(e: any) {
    this.initialDate = e.target.value;
  }
  searchDatePicker() {
    this.userService.searchDatepicker(this.datesFormat(this.initialDate), this.datesFormat(this.lastDate)).subscribe((data) => {
      if (data) {
        this.dataTable = data
      }
    });
  }
}
