import {Routes} from '@angular/router';
import {PageNotFoundComponent} from './components/site/page-not-found/page-not-found.component';
import {HelloWorldComponent} from './components/tasks/hello-world/hello-world.component';
import {CalcComponent} from './components/tasks/calc/calc.component';
import {TestingComponent} from './components/temp/testing/testing.component';
import {FeedbackComponent} from './components/tasks/feedback/feedback.component';
import {ReactiveFormComponent} from './components/tasks/reactive-form/reactive-form.component';
import {FrontpageComponent} from './components/site/frontpage/frontpage.component';
import {
  TemplateFormValidationComponent
} from './components/tasks/template-form-validation/template-form-validation.component';
import {LoanCalculatorComponent} from './components/tasks/course-exam/loan-calculator/loan-calculator.component';
import {FinnkinoNewsComponent} from './components/tasks/finnkino-news/finnkino-news.component';
import {LoginComponent} from './components/tasks/login/login.component';
import {AdminpanelComponent} from './components/tasks/adminpanel/adminpanel.component';
import {authGuard} from './guards/auth.guard';

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
  {
    path: 'template-driven-form',
    component: TemplateFormValidationComponent,
    data: {title: 'Lomakkeen validointi - malli/templatepohjainen'}
  },
  {
    path: 'loan-calculator',
    component: LoanCalculatorComponent,
    data: {title: 'Kurssin tentti - lainalaskuri'}
  },
  {
    path: 'api-call-and-json-representation',
    component: FinnkinoNewsComponent,
    data: {title: 'API-kutsu - Finnkinon uutiset'}
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {title: 'Kirjaudu hallintapaneeliin'}
  },
  {
    path: 'acp',
    component: AdminpanelComponent,
    data: {title: 'Ylläpidon hallintapaneeli'},
    canActivate: [authGuard]
  },
  // esimerkki redirektauksesta.
  {
    path: '',
    redirectTo: '/frontpage',
    data: {title: 'Etusivu'},
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
