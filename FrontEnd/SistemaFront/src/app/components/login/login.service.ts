import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Const } from '../../constants/const';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

@Injectable()
export class LoginService {

  @Output() mostrarMenuEmitter = new EventEmitter<boolean>(); // Para mostar o menu

  constructor(private http: HttpClient, private router: Router) { }


  public login(usuario: any) {

    return this.http.post(Const.baseLogin, JSON.stringify(usuario)).subscribe({

      next: (data) => {
        var token = JSON.parse(JSON.stringify(data)).Authorization.split(' ')[1];
        localStorage.setItem("token", token);
        this.mostrarMenuEmitter.emit(true);
        this.router.navigate(['home']);

      },
      error: (error: Error) => {
        console.error("Não autorizado! " + error)
        this.mostrarMenuEmitter.emit(false);
        alert('Acesso Negado!')
      }
    });
  }



}
