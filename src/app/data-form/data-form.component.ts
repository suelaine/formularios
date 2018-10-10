import { DropdownService } from './../shared/services/dropdown.service';
import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Http } from '@angular/http';
import { BaseFormComponent } from '../shared/base-form/base-form.component';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';


@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario: FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private http: Http,
    private cepService: ConsultaCepService,
    private dropdownService: DropdownService
  ) {//super();
   }

  ngOnInit() {

    //criando formulario no momento da inicialização do componente
    this.formulario = new FormGroup({
      nome: new FormControl(null,Validators.required ),
      email: new FormControl(null,[Validators.required,Validators.email]),

      endereco: new FormGroup({
        
      cep: new FormControl(null,Validators.required ),
      numero:  new FormControl(null,Validators.required ),
      complemento: new FormControl(null),
      rua:  new FormControl(null,Validators.required ),
      bairro:  new FormControl(null,Validators.required ),
      cidade:  new FormControl(null,Validators.required ),
      estado: new FormControl(null,Validators.required )

    })
  })
    

  /*this.formulario = this.formBuilder.group({
    nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(35)]],
    email: [null, [Validators.required, Validators.email]] ,    

    endereco: this.formBuilder.group({
      cep: [null, Validators.required],
      numero: [null, Validators.required],
      complemento: [null],
      rua: [null, Validators.required],
      bairro: [null, Validators.required],
      cidade: [null, Validators.required],
      estado: [null, Validators.required]
    }),

    /*cargo: [null],
    tecnologias: [null],
    newsletter: ['s'],
    termos: [null, Validators.pattern('true')],
    frameworks: this.buildFrameworks()-->
  });*/
}




  submit() {    console.log(this.formulario);}

  onSubmit(){
    console.log(this.formulario.value);

    this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
    //.map(res => res)
    .subscribe(dados => {
      console.log(dados);
      this.formulario.reset();
    },
    (error: any) => alert('erro')
    );
  }

  verificaValidTouched(campo:string){
    return !this.formulario.get(campo).valid
    && this.formulario.get(campo).touched;
    
  }

  verificaEmailInvalido(){
    if(this.formulario.get('email').errors){
      return this.formulario.get('email').errors['email']
    }
  }

  aplicaCssErro(campo: string) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    };
  }

  resetar(){
    this.formulario.reset();
  }

  populaDadosForm(dados) {
    /*formulario.setValue({
      nome: formulario.value.nome,
      email: formulario.value.email,
      endereco: {
        rua: dados.logradouro,
        cep: dados.cep,
        numero: '',
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });*/

    this.formulario.patchValue({
      endereco: {
        rua: dados.logradouro,
        // cep: dados.cep,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });

    // console.log(form);
  }

  resetaDadosForm(formulario) {
    formulario.form.patchValue({
      endereco: {
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }



  consultaCEP() {

    let cep = this.formulario.get('endereco.cep').value;
    // Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');

    if (cep != null && cep !== '') {
      this.cepService.consultaCEP(cep)
      .subscribe(dados => this.populaDadosForm(dados));
    }
  }

}
