import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Const } from '../constants/const';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) { }


  public login(usuario: any) {

    return this.http.post(Const.baseLogin, JSON.stringify(usuario)).subscribe(data => {
      var token = JSON.parse(JSON.stringify(data)).Authorization.split(' ')[1];

      localStorage.setItem("token", token);
      //console.info("Token: " + token);

      this.router.navigate(['home']);
    },
      error => {
        console.error("Não autorizado! " + error)
        alert('Acesso Negado!')
      }
    );
  }
}
