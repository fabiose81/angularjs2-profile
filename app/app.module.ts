import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule , ReactiveFormsModule}    from '@angular/forms';
import { routing, appRoutingProviders } from './app.routes';
import { HttpModule, JsonpModule }  from '@angular/http';

import { AppComponent }  from './app.component';
import { NavBarComponent }  from './components/navbar/navbar.component';
import { PersonComponent } from './components/person/person.component';
import { PersonDetailComponent } from './components/person/person-detail.component';
import { EmptyValidator } from './directives/validators/empty.validator';

@NgModule({
  imports: [ BrowserModule, HttpModule, JsonpModule, FormsModule, ReactiveFormsModule, routing ],
  declarations: [ AppComponent, NavBarComponent, PersonComponent, PersonDetailComponent, EmptyValidator ],
  bootstrap: [ AppComponent ],
  providers: [ appRoutingProviders ], 
  entryComponents: [ PersonComponent, PersonDetailComponent ]
})

export class AppModule { }
