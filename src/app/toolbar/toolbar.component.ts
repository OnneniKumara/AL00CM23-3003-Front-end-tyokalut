import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';

@Component({
  selector: 'app-toolbar',
  imports: [RouterLink, RouterLinkActive, MatToolbar, MatIcon, MatButton, MatMenuTrigger, MatMenu, MatMenuItem],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {


}
