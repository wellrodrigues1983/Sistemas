import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpfCnpjPipe'
})
export class CpfCnpjPipe implements PipeTransform {
  transform(value: string): string {

    if (!value) {
      return '';
    }

    value = value.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (value.length === 11) { // CPF
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (value.length === 14) { // CNPJ
      value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }

    return value; // Retorne o valor formatado
  }
}
