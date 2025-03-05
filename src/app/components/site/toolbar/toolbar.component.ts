import {Component, effect, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive} from '@angular/router';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {CalcComponent} from '../../tasks/calc/calc.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {Title} from '@angular/platform-browser';
import {filter} from 'rxjs';
import {LoanCalculatorComponent} from '../../tasks/course-exam/loan-calculator/loan-calculator.component';
import {SessionManagementService} from '../../../services/session-management.service';
import {NgIf} from '@angular/common';

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
    NgIf,
  ],
  providers: [Title],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent implements OnInit {

  title: string = '';

  username = signal<string>('');
  firstName = signal<string>('');
  role = signal<string[]>([]);
  isAuthenticated = signal<boolean>(false);

  sessionManagement = inject(SessionManagementService);

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {

    // päivitä käyttäjän autentikointitila aina kun se muuttuu
    effect(() => {
      this.isAuthenticated.set(this.sessionManagement.isAuthenticated());
    });

    // Päivitys käyttäjän tiedot aina kun autentikointitila muuttuu
    effect(() => {
      if (this.isAuthenticated()) {
        const userSession = this.sessionManagement.getSession();
        if (userSession) {
          this.username.set(userSession.username || '');
          this.firstName.set(userSession.firstName || '');
          this.role.set(this.sessionManagement.getRole());
          console.log('User session updated:', userSession);
        }
      } else {
        this.username.set('');
        this.firstName.set('');
        this.role.set([]);
      }
    });
  }

  ngOnInit() {

    // tarkastetaan autentikointitila
    this.sessionManagement.checkAuthStatus();

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

    /*
    const userSession = this.sessionManagement.getSession();
    if (userSession) {

      if (userSession.username) this.username.set(userSession.username);
      if (userSession.firstName) this.firstName.set(userSession.firstName);
      this.role.set(this.sessionManagement.getRole());
      console.log('Session data:', userSession.username);
    }
    else console.log('No session data found');
    */

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

  openLoanCalcDialog() {
    const dialogRef = this.dialog.open(LoanCalculatorComponent, {
      hasBackdrop: false,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Lainalaskuri dialogi suljettiin');
    });
  }

  logout() {
    this.sessionManagement.endSession();
    // mennään etusivulle
    this.router.navigate(['']);
  }

}
