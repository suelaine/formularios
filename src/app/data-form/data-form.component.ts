import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Http } from '@angular/http';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario: FormGroup;

  constructor(
    private http: Http
  ) { }

  ngOnInit() {

    //criando formulario no momento da inicialização do componente
    this.formulario = new FormGroup({
      nome: new FormControl(null,Validators.required ),
      email: new FormControl(null,[Validators.required,Validators.email])
    });
  }

  

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

  verificaValidTouched(campo){
    return !this.formulario.get(campo).valid
    && this.formulario.get(campo).touched;
    
  }

  aplicaCssErro(campo) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    };
  }

  resetar(){
    this.formulario.reset();
  }

}
