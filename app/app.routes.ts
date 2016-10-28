import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { PersonDetailComponent }  from './components/person/person-detail.component';
import { PersonComponent }  from './components/person/person.component';

const routes : Routes = [
    {path: '', component: PersonComponent},
    {path: 'detail/:id', component: PersonDetailComponent}
];


export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);