import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../services/person.service';
import { Person } from '../../models/person.model';
import { Address } from '../../models/address.model';
import { LogModel } from '../../models/log.model';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'person',
    templateUrl: 'person.component.html',
    providers: [ PersonService ]
})

export class PersonComponent { 

    constructor(private _personService : PersonService){}

    persons: Person[];
    
    person = new Person();
    personEdit = new Person();

    address = new Address();

    logModel = new LogModel();

    alert : string;
    action : string;
    msg : string;
  
    ngOnInit(){ 
        this.getAll();
    }

    setObjects(_value: string){
        if(_value != undefined ){
            this.person = new Person();
            var address:Array<Address>=[];
            this.person.address = address;
        }

        this.logModel = new LogModel();
        this.alert = undefined;
        this.action = undefined;
        this.msg = undefined;
    }

    getAll(){
        this._personService.getAll()
            .subscribe(
                       persons  => this.persons = persons,
                       err =>  {
                             this.logModel.id = 0
                             this.logModel.body = (err == 'Response with status: 0  for URL: null') ? 'Serviço REST fora do ar.' : err._body;
                             this.alert = 'alert-danger'
                            });    
    }

    save(event: any){
       event.preventDefault();
       this.setObjects(undefined);
        var id = this.person.id;
        this._personService.save(this.person)
      .subscribe(
                       person  => {
                           this.person = <Person> JSON.parse(JSON.stringify(person));   
                           if(id == undefined){
                              this.persons.push(this.person)
                              this.msg = 'Pessoa cadastrada com sucesso.'; 
                              this.action = 'save';  
                           }else{   
                               for(var i=0; i<this.persons.length; i++)
                                  if(this.person.id == this.persons[i].id)
                                      this.persons[i]= this.person;

                              this.msg = 'Pessoa alterada com sucesso.';
                              this.action = 'update';  
                           }
                           this.person = person 
                           this.alert = 'alert-success'                 
                        },
                       err => {
                             this.logModel.id = 1
                             this.logModel.body = err._body
                             this.alert = 'alert-danger'
                            });
                             
    }

    load(person: Person){
        this.personEdit =  JSON.parse(JSON.stringify(person)); 
    }

    update(){
     event.preventDefault();
        this._personService.update(this.personEdit)
     .subscribe(person => {   
         console.log(person);   
    });   
    }

    delete(_person: Person){
        this._personService.remove(_person)
      .subscribe(
                       person  => {
                           this.removePerson(_person);
                           this.person = _person;
                           this.alert = 'alert-success';
                           this.action = 'delete';
                           this.msg = 'Pessoa removida com sucesso.';
                        },
                       err => {
                             this.logModel.id = 1
                             this.logModel.body = err._body
                             this.alert = 'alert-danger'
                            });
    }

    removePerson(_person:Person){
       var index = this.persons.indexOf(_person);
       var auxPerson :Array<Person>=[];
       for(var i=0; i<this.persons.length; i++){
          if(index != i)
             auxPerson.push(this.persons[i]);
          
       }
      this.persons = auxPerson;
    }

}