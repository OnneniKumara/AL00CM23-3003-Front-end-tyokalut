import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-pop-up-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose
  ],
  templateUrl: './pop-up-dialog.component.html',
  styleUrl: './pop-up-dialog.component.css'

})

// komponentti joka näyttää popup-ikkunan
// jossa viesti, ilmoitus tai virhe jne.
export class PopUpDialogComponent {

  // otetaan viestit vastaan muilta komponenteilta
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {
  }

}
