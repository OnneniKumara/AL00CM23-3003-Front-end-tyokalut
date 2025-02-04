import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {CalcComponent} from '../components/calc/calc.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';


@Component({
  selector: 'app-toolbar',
  imports: [RouterLink,
    RouterLinkActive,
    MatToolbar,
    MatIcon,
    MatButton,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    MatDialogModule],

  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {
  constructor(private dialog: MatDialog) {
  }


  // avaa laskin dialogin
  openCalcDialog() {
    const dialogRef = this.dialog.open(CalcComponent, {
      hasBackdrop: false, // Taustaelementti (backdrop) poistetaan, jolloin tausta pysyy klikattavana
      disableClose: true, // estä käyttäjää sulkemasta dialogia ulkopuolisella klikkauksella
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Laskin dialogi suljettiin');
      console.log(result);
    });
  }
}
