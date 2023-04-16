import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {Equipos} from "../../interfaces/equipos";

@Injectable({
  providedIn: "root",
})
export class UsersService {

  BASE_URL= "https://wo-fifa.azurewebsites.net"
  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/login`, data);
  }

  logout(data: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/logout`, data);
  }

  getData(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/equipos/listar/0/100`);
  }

  deleteEquipo(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/equipos/eliminar/${id}`);
  }

  updateEquipo(id: number | undefined, data: Equipos): Observable<any> {
    return this.http.put(`${this.BASE_URL}/equipos/actualizar/${id}`, data);
  }

  createEquipo(data: Equipos): Observable<any> {
    return this.http.post(`${this.BASE_URL}/equipos/crear`, data);
  }

  searchId(id: Number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/equipos/consultar/${id}`);
  }

  searchDatepicker(initialDate: any, lastDate: any): Observable<any> {
    return this.http.get(`${this.BASE_URL}/equipos/consultar/${initialDate}/${lastDate}`);
  }
}
