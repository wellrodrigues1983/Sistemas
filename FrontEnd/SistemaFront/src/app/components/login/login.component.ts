import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Usuario } from '../../model/usuario';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private router: Router, public loginService: LoginService, /* public usuario: Usuario */) { }

  loginForm!: FormGroup;
  public usuario: Usuario = new Usuario();


  ngOnInit(): void {
    this.destroyerToken()
    this.createForm(new Usuario());

  }

  createForm(usuario: Usuario) {
    this.loginForm = new FormGroup({
      login: new FormControl(usuario.login),
      senha: new FormControl(usuario.senha)
    })

    this.usuario = JSON.parse(JSON.stringify(this.loginForm.value));
  }

  onSubmit() {
    this.loginService.login(this.loginForm.value)
  }

  destroyerToken(){
    localStorage.removeItem('token')
  }

}
