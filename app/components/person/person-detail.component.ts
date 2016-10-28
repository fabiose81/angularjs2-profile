import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { PersonService } from '../../services/person.service';
import { Person } from '../../models/person.model';
import { Address } from '../../models/address.model';
import { LogModel } from '../../models/log.model';

@Component({
    moduleId: module.id,
    selector: 'person-detail',
    templateUrl: 'person-detail.component.html',
    providers: [ PersonService ]
})

export class PersonDetailComponent { 

      constructor(private _personService : PersonService,
                  private _route : ActivatedRoute) {}

      person = new Person();
      address = new Address();
      
      logModel = new LogModel();

      alert : string;
      action : string;
      msg : string;
  

      ngOnInit(){
          this.findById(); 
      } 

      setObjects(){
          this.address =  new Address();    
      }

      findById(){
            this._route.params.map(params => params['id'])
                .subscribe((id) => {
                    this._personService.findById(id)
                    .subscribe(
                        person  => this.person = person,
                                    err =>  {
                                            this.logModel.id = 0
                                            this.logModel.body = (err == 'Response with status: 0  for URL: null') ? 'Serviço REST fora do ar.' : err._body;
                                            this.alert = 'alert-danger'
                                            });  
            })        
        }


       load(address: Address){
         this.address = address;   
       }
     
       addAddress(){

           if(this.address.id == undefined)
              this.person.address.push(this.address);

          let button = <HTMLScriptElement>document.getElementById('button_dissmiss');
          button.click();
       }

       update(){
                this._personService.update(this.person)
            .subscribe(
                  person  => {
                              this.msg = 'Pessoa alterada com sucesso.';
                              this.action = 'update';                       
                              this.person = person 
                              this.alert = 'alert-success'                 
                        },
                       err => {
                             this.logModel.id = 1
                             this.logModel.body = err._body
                             this.alert = 'alert-danger'
                            }         
            );   
       }

       removeAddress(address:Address){
            var index = this.person.address.indexOf(address);
            var auxAddress :Array<Address>=[];
                for(var i=0; i<this.person.address.length; i++){
                        if(index != i){
                        auxAddress.push(this.person.address[i]);
                        }
                }
                this.person.address = auxAddress;
       }
}