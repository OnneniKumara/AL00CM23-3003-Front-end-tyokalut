import {Routes} from '@angular/router';
import {PageNotFoundComponent} from './components/site/page-not-found/page-not-found.component';
import {HelloWorldComponent} from './components/tasks/hello-world/hello-world.component';
import {CalcComponent} from './components/tasks/calc/calc.component';
import {TestingComponent} from './components/temp/testing/testing.component';
import {FeedbackComponent} from './components/tasks/feedback/feedback.component';
import {ReactiveFormComponent} from './components/tasks/reactive-form/reactive-form.component';
import {FrontpageComponent} from './components/site/frontpage/frontpage.component';

export const routes: Routes = [

  // reititys esimerkkejä, näkyy todellisuudessa tyylliin http(s)://aaa.osoite.bbb(:0000)/hello,
  // eli vaikka nyt http://localhost:4200/hello
  {
    path: 'hello',
    component: HelloWorldComponent,
    title: 'Terve terve universumi!'
  },
  {
    path: 'calculator',
    component: CalcComponent,
    title: 'Laskin'
  },
  {
    path: 'testing-area',
    component: TestingComponent,
    title: 'Testausta je pelleilyä'
  },

  {
    path: 'feedback',
    component: FeedbackComponent,
    title: 'Palautesivu'
  },
  {
    path: 'reactive-form',
    component: ReactiveFormComponent,
    title: 'Reaktiivinen lomake'
  },
  {
    path: 'frontpage',
    component: FrontpageComponent,
    title: 'Etusivu'
  },


  // esimerkki redirektauksesta.
  {
    path: '',
    redirectTo: '/frontpage',
    pathMatch: 'full'
  },

  // esimerkki siitä jos yritetään hakea osoitetta/sivua/komponenttia jota ei ole
  // oltava viimeisenä jos oikein muistan
  {
    path: '**',
    component: PageNotFoundComponent,
    title: '404-error koitatko häxöröidä jotain?'
  }
];
