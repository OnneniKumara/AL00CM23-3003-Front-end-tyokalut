import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HelloWorldComponent } from './hello-world/hello-world.component';
import { CalcComponent } from './calc/calc.component';
import {TestingComponent} from './testing/testing.component';

export const routes: Routes = [

    // reititys esimerkkejä, näkyy todellisuudessa tyylliin http(s)://aaa.osoite.bbb(:0000)/hello,
    // eli vaikka nyt http://localhost:4200/hello
    { path: 'hello', component: HelloWorldComponent },
    { path: 'calculator', component: CalcComponent },
    { path: 'testing-area', component: TestingComponent },

     // esimerkki redirektauksesta, juuresta redirektaus  'hello' komponenttiin.
    { path: '', redirectTo: 'hello', pathMatch: 'full' },

    // esimerkki siitä jos yritetään hakea osoitetta/sivua/komponenttia jota ei ole
    // oltava viimeisenä jos oikein muistan
    { path: '**', component: PageNotFoundComponent }
];
