import {inject, Injectable} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {PopUpDialogComponent} from '../components/helpers/pop-up-dialog/pop-up-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {

  private dialog = inject(MatDialog);

  constructor() {
  }

  // tehdään pop-up-dialogi
  openDialog(message: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {message};
    this.dialog.open(PopUpDialogComponent, dialogConfig);
  }

}
