import {Routes} from '@angular/router';
import {PageNotFoundComponent} from './components/site/page-not-found/page-not-found.component';
import {HelloWorldComponent} from './components/tasks/hello-world/hello-world.component';
import {CalcComponent} from './components/tasks/calc/calc.component';
import {TestingComponent} from './components/temp/testing/testing.component';
import {FeedbackComponent} from './components/tasks/feedback/feedback.component';
import {ReactiveFormComponent} from './components/tasks/reactive-form/reactive-form.component';
import {FrontpageComponent} from './components/site/frontpage/frontpage.component';

export const routes: Routes = [

  {
    path: 'hello',
    component: HelloWorldComponent,
    data: {title: 'Heippa universumi!'}
  },
  {
    path: 'calculator',
    component: CalcComponent,
    data: {title: 'Laskin'}
  },
  {
    path: 'testing-area',
    component: TestingComponent,
    data: {title: 'Testausta'}
  },
  {
    path: 'feedback',
    component: FeedbackComponent,
    data: {title: 'Palautesivu'}
  },
  {
    path: 'reactive-form',
    component: ReactiveFormComponent,
    data: {title: 'Reaktiivinen lomake'}
  },
  {
    path: 'frontpage',
    component: FrontpageComponent,
    data: {title: 'Etusivu'}
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
    data: {title: '404-error koitatko häxöröidä jotain?'}
  }
];
