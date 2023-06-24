import { Component, OnInit } from '@angular/core';
import { CadastroClientes } from 'src/app/model/CadastroCliente';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CpfCnpjPipe } from 'src/app/pipes/cpfCnpj.pipe';
import { ExternalService } from 'src/app/services/external.service';




@Component({
  selector: 'app-cadastro-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})


export class ClientesComponent implements OnInit {

  public cadastroForm!: FormGroup;
  pipeCnpjCpf: CpfCnpjPipe = new CpfCnpjPipe;


  constructor(private formBuilder: FormBuilder, private externalService: ExternalService) {}

  ngOnInit(): void {
    this.cadastroForm = this.formBuilder.group({
      cpfCnpj: ['', Validators.required],
      nome: ['', Validators.required],
      responsavel: ['', Validators.required],
      cep: ['', Validators.required],
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      bairro: ['', Validators.required],
      complemento: ['', Validators.required],
      localidade: ['', Validators.required],
      uf: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', Validators.required],
    });

    this.pipeCnpj()

  }

  pipeCnpj(){
    this.cadastroForm.get('cpfCnpj')?.valueChanges.subscribe(value => {
      const cnpjValue = this.pipeCnpjCpf.transform(value);
      this.cadastroForm.get('cpfCnpj')?.setValue(cnpjValue), {emitEvent: false}
    });
  }

  buscaCep(){
    const cep = this.cadastroForm.get('cep')?.value
    if (cep) {
      this.externalService.getCep(cep).subscribe((endereco: CadastroClientes) => {
        this.cadastroForm.patchValue(endereco);
      });
    }
  }

}

