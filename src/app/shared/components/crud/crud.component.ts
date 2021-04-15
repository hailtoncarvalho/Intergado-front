import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { CrudService } from "src/app/core/services/crud.service";
import { Animal } from "src/app/models/animal";



@Component({
  selector: "app-crud",
  templateUrl: "./crud.component.html",
  styleUrls: ["./crud.component.css"]
})
export class CrudComponent implements OnInit {

  animais: Animal[];
  animais$: Observable<Animal[]>;
  form: FormGroup;
  newBtn: Boolean;
  animalSelecionado: Animal;
  

  constructor(private service: CrudService, private fb: FormBuilder) {}

  ngOnInit() {

    this.form = this.fb.group({
      manejo:[null,[Validators.required, Validators.maxLength(50)]],
      tag:[null,[Validators.required, Validators.maxLength(50)]]
    });
    this.animais$ = this.service.listar();
  }

  changeState(){
    !this.newBtn ? true : false;
  }

  onSubmit(){
    if(this.form.valid){
      this.service.inserirAnimal(this.form.value).subscribe(
        success => console.log("sucesso"),
        error => console.log("erro"),
        () => console.log("Request completa")
      );
      this.form.reset();
      window.location.reload();;
    }
  }

  onDelete(animal){
    this.animalSelecionado = animal;
    this.service.deletarAnimal(this.animalSelecionado.id).subscribe(
      success => window.location.reload(),
      error => console.log("erro ao remover")
    );
  }
}
