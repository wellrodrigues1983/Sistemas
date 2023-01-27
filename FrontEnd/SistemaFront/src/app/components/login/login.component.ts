import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../model/usuario';
import { LoginService } from '../../services/login.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, public loginService: LoginService) { }



  loginForm!: FormGroup;


  ngOnInit(): void {
    this.createForm(new Usuario());

  }

  createForm(usuario: Usuario) {
    this.loginForm = new FormGroup({
      login: new FormControl(usuario.login),
      senha: new FormControl(usuario.senha)
    })
  }

  onSubmit() {
    this.loginService.login(this.loginForm.value)

  }

}
