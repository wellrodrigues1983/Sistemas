import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Usuario } from '../../model/usuario';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private router: Router, public loginService: LoginService, /* public usuario: Usuario */) { }

  loginForm!: UntypedFormGroup;
  public usuario: Usuario = new Usuario();


  ngOnInit(): void {
    this.destroyerToken()
    this.createForm(new Usuario());

  }

  createForm(usuario: Usuario) {
    this.loginForm = new UntypedFormGroup({
      login: new UntypedFormControl(usuario.login),
      senha: new UntypedFormControl(usuario.senha)
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
