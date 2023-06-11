import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CadastroClientes } from '../model/CadastroCliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExternalService {

  cliente?: CadastroClientes

  constructor(private http: HttpClient) { }

  getCep(cep: string): Observable<CadastroClientes> {
    return this.http.get<CadastroClientes>(`https://viacep.com.br/ws/${cep}/json/`);
  }


}
