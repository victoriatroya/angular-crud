import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {UsersService} from "../../users/users.services";
import {User} from "../../../interfaces/equipos";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  informationUser: User = {
    username: '',
    password: '',
  };
  constructor(private router: Router, public userService: UsersService) {
  }

  logOut() {
    this.userService.logout(this.informationUser).subscribe((data) => {
   });
    this.router.navigate(['login']);
  }
  ngOnInit(): void {

    const data:any = localStorage.getItem('user');

    this.informationUser = JSON.parse(data);
  }
}
