import { Injectable } from "@angular/core";
import { Http, Headers } from  "@angular/http";
import 'rxjs/add/operator/map';

import { Person } from '../models/person.model';

@Injectable()
export class PersonService{
 
    constructor(private _http: Http){}

   getAll(){
       return this._http.get('http://localhost:8080/person').map(res => res.json());
    }

    findById(id: string){
       return this._http.get('http://localhost:8080/person/'+id).map(res => res.json());
    }

    save(person: Person){
          var headers = new Headers();
          headers.append('Content-Type', 'application/json');
          return this._http.post('http://localhost:8080/person',person, {headers : headers})
          .map(res => res.json());
     }

    update(person: Person){
          var headers = new Headers();
          headers.append('Content-Type', 'application/json');
          return this._http.put('http://localhost:8080/person',person, {headers : headers})
          .map(res => res.json());
     }

     remove(person: Person){
         var headers = new Headers();
          headers.append('Content-Type', 'application/json');
          return this._http.post('http://localhost:8080/person/remove',person, {headers : headers})
          .map(res => res.json());
     }
}