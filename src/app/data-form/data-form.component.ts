import { DropdownService } from './../shared/services/dropdown.service';
import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Http } from '@angular/http';
import { BaseFormComponent } from '../shared/base-form/base-form.component';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { EstadoBr } from '../shared/models/estado-br.model';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario: FormGroup;
  //estados: EstadoBr[];
  estados: Observable<EstadoBr[]>;
  cargos: any[];
  tecnologias: any[];
  newsLetterOp: any[];
  termos: any[];

  constructor(
    private formBuilder:FormBuilder,
    private http: Http,
    private cepService: ConsultaCepService,
    private dropdownService: DropdownService
  ) {//super();
   }

  ngOnInit() {

    //this.dropdownService.getEstadosBr()
    //.subscribe(dados => {this.estados = dados; console.log(dados)});
    this.estados = this.dropdownService.getEstadosBr();
    this.cargos = this.dropdownService.getCargos();
    this.tecnologias = this.dropdownService.getTecnologias();
    this.newsLetterOp = this.dropdownService.getNewsletter();

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

    }),
    cargo: new FormControl(null),
      tecnologias: new FormControl(null),
      newsLetterOp:new FormControl(null),
      termos:new FormControl(null,Validators.pattern('true') )

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

    if (this.formulario.valid){
      this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
      //.map(res => res)
      .subscribe(dados => {
        console.log(dados);
        this.formulario.reset();
      },
      (error: any) => alert('erro')
      );
    }
    else{
      console.log('formulario Invalido');
      this.verificaValidacoesForm(this.formulario);
    }
}



verificaValidacoesForm(formGroup: FormGroup){
    Object.keys(formGroup.controls).forEach(campo => {
    console.log(campo);
    const controle = formGroup.get(campo);
    controle.markAsDirty();
    if(controle instanceof FormGroup ){
      this.verificaValidacoesForm(controle);
    }

    });
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
    console.log(cep);
    

    

    if (cep != null && cep !== '') {
      this.cepService.consultaCEP(cep)
      .subscribe(dados => this.populaDadosForm(dados));
    }
  }

  setarCargo(){
    const cargo = {nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl'};
    this.formulario.get('cargo').setValue(cargo);
  }

  setarTecnologias(){

  const tecnologia = {nome: 'javascript', desc: 'JavaScript' };
  this.formulario.get('tecnologias').setValue(['java','javascript','php']);}

  setarNewsLetter(){

    const tecnologia = {nome: 'javascript', desc: 'JavaScript' };
    this.formulario.get('tecnologias').setValue(['java','javascript','php']);}

}
