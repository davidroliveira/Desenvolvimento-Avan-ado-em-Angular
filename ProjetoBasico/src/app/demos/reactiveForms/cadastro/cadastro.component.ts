import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MASKS, NgBrazilValidators } from 'ng-brazil';
import { CustomValidators } from 'ng2-validation';

import { Usuario } from './models/usuario';
import { TextMaskModule } from 'angular2-text-mask';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styles: []
})
export class CadastroComponent implements OnInit {

  cadastroForm: FormGroup;
  usuario: Usuario;
  formResult: string = '';
  MASKS = MASKS;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    let controlSenha = new FormControl('', [Validators.required, CustomValidators.rangeLength([6,15])]);
    let controlSenhaConfirmacao = new FormControl('', [Validators.required, CustomValidators.rangeLength([6,15]), CustomValidators.equalTo(controlSenha)]);

    this.cadastroForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      cpf: ['', [Validators.required, NgBrazilValidators.cpf]],
      email: ['', [Validators.required, Validators.email]],
      senha: controlSenha, //senha: ['', [Validators.required, CustomValidators.rangeLength([6,15])]],
      senhaConfirmacao: controlSenhaConfirmacao //senhaConfirmacao: ['']
    });  

  }

  adicionarUsuario(){

    if (this.cadastroForm.dirty && this.cadastroForm.valid) {
      this.usuario = Object.assign({}, this.usuario, this.cadastroForm.value);    
      this.formResult = JSON.stringify(this.cadastroForm.value);
    }
    else
      this.formResult = "Não submeteu!!!";

  }

}
