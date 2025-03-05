import {Component, effect, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive} from '@angular/router';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {CalcComponent} from '../../tasks/calc/calc.component';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {Title} from '@angular/platform-browser';
import {filter} from 'rxjs';
import {LoanCalculatorComponent} from '../../tasks/course-exam/loan-calculator/loan-calculator.component';
import {SessionManagementService} from '../../../services/session-management.service';
import {NgIf} from '@angular/common';
import {PopUpService} from '../../../services/pop-up.service';

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

  // PopUpService
  protected popUpService = inject(PopUpService);
  // dialogi viitteet
  private calcDialogRef: MatDialogRef<CalcComponent> | null = null;
  private loanCalcDialogRef: MatDialogRef<LoanCalculatorComponent> | null = null;

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
    // tarkastetaab ettei laskin dialogeja ole jo auki
    if (!this.calcDialogRef) {
      this.calcDialogRef = this.dialog.open(CalcComponent, {
        hasBackdrop: false, // Taustaelementti (backdrop) poistetaan, jolloin tausta pysyy klikattavana
        disableClose: true, // estä käyttäjää sulkemasta dialogia ulkopuolisella klikkauksella
      });

      // tilataan dialogin sulkemistapahtuma
      this.calcDialogRef.afterClosed().subscribe(result => {
        console.log('Laskin dialogi suljettiin');

        // tyhjennetään viite dialogiin
        this.calcDialogRef = null;
      });
    }
    // Muutoin ilmoitetaan käyttäjälle, että vain yksi laskin voi olla auki kerrallaan
    else {
      this.popUpService.openDialog('Laskin on jo avattu, vain yksi laskin voi olla auki kerrallaan');
      console.log('Laskin dialogi on jo auki');
    }
  }

  // avaa lainalaskuri dialogin
  openLoanCalcDialog() {
    // tarkastetaab ettei laskin dialogeja ole jo auki
    if (!this.loanCalcDialogRef) {
      this.loanCalcDialogRef = this.dialog.open(LoanCalculatorComponent, {
        hasBackdrop: false, // Taustaelementti (backdrop) poistetaan, jolloin tausta pysyy klikattavana
        disableClose: true, // estä käyttäjää sulkemasta dialogia ulkopuolisella klikkauksella
      });

      // tilataan dialogin sulkemistapahtuma
      this.loanCalcDialogRef.afterClosed().subscribe(result => {
        console.log('Lainalaskin dialogi suljettiin');

        // tyhjennetään viite dialogiin
        this.loanCalcDialogRef = null;
      });
    }
    // Muutoin ilmoitetaan käyttäjälle, että vain yksi voi olla auki kerrallaan
    else {
      this.popUpService.openDialog('Lainalaskin on jo avattu, vain yksi voi olla auki kerrallaan');
      console.log('Lainalaskuri on jo auki');
    }
  }

  logout() {
    this.sessionManagement.endSession();
    // mennään etusivulle
    this.router.navigate(['']);
  }

}
