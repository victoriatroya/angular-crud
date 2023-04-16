import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../users/users.services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  form: FormGroup;

  constructor(private fb: FormBuilder, public userService: UsersService, private router: Router) {
    this.form = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  logIn(){
    const user = { username: this.form.value.user, password: this.form.value.password };

    localStorage.setItem('user', JSON.stringify(user));

    this.userService.login(user).subscribe((data) => {
    });

    setTimeout(() => {
      this.router.navigate(['dashboard'])
    }, 1600)
  }
  ngOnInit(): void {
  }

}
