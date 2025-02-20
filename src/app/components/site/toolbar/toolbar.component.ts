import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive} from '@angular/router';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {CalcComponent} from '../../tasks/calc/calc.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {Title} from '@angular/platform-browser';
import {filter} from 'rxjs';

@Component({
  selector: 'app-toolbar',
  imports: [
    RouterLink,
    RouterLinkActive,
    MatToolbar,
    MatIcon,
    MatButton,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    MatDialogModule,
  ],
  providers: [Title],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent implements OnInit {

  title: string = '';

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {
  }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const rt = this.getChild(this.activatedRoute);
      rt.data.subscribe(data => {
        console.log(data);
        this.title = data['title'];
        this.titleService.setTitle(data['title']);
      });
    });
  }

  getChild(activatedRoute: ActivatedRoute): ActivatedRoute {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }
  }

  // avaa laskin dialogin
  openCalcDialog() {
    const dialogRef = this.dialog.open(CalcComponent, {
      hasBackdrop: false, // Taustaelementti (backdrop) poistetaan, jolloin tausta pysyy klikattavana
      disableClose: true, // estä käyttäjää sulkemasta dialogia ulkopuolisella klikkauksella
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Laskin dialogi suljettiin');
    });
  }

}
