import {Routes} from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {HelloWorldComponent} from './hello-world/hello-world.component';
import {CalcComponent} from './components/calc/calc.component';
import {TestingComponent} from './testing/testing.component';

export const routes: Routes = [

    // reititys esimerkkejä, näkyy todellisuudessa tyylliin http(s)://aaa.osoite.bbb(:0000)/hello,
    // eli vaikka nyt http://localhost:4200/hello
    {
      path: 'hello', component: HelloWorldComponent,
      title: 'terve terve universumi!'
    },
    {
      path: 'calculator', component: CalcComponent,
      title: 'Calculator'

    },
    { path: 'testing-area', component: TestingComponent,
      title: 'Testausta je pelleilyä'
    },

     // esimerkki redirektauksesta, juuresta redirektaus  'hello' komponenttiin.
    { path: '', redirectTo: 'hello', pathMatch: 'full' },

    // esimerkki siitä jos yritetään hakea osoitetta/sivua/komponenttia jota ei ole
    // oltava viimeisenä jos oikein muistan
    {
      path: '**', component: PageNotFoundComponent,
      title: '404-error koitatko häxöröidä jotain?'
    }
];
