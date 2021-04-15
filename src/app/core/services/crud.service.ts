import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Animal } from "src/app/models/animal";
import { take, tap } from "rxjs/operators"

@Injectable({
  providedIn: "root"
})
export class CrudService {

 private readonly API = "http://localhost:5050/api/animal/";
 //private urlBase: `http://localhost:5050/api/`;

  constructor(private http: HttpClient) {}

  listar(){
    return this.http.get<Animal[]>( this.API );
  }

  inserirAnimal( animal ){
    return this.http.post(this.API, animal).pipe(take(1));
  }

  deletarAnimal(id){
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }
}
