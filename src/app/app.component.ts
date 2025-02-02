import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ToolbarComponent} from './toolbar/toolbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToolbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular_projekti';
  jeppulisjee = 'onpa siistiä!';

  // aktiivisen reitin otsikko
  activeTitle:string = ''

  // funktio jolla aktiivisen reitin otsikko asetetaan
  setActiveRouteTitle()
  {

  }
}
