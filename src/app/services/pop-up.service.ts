import {inject, Injectable} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {PopUpDialogComponent} from '../components/helpers/pop-up-dialog/pop-up-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {

  private dialog = inject(MatDialog);

  constructor() {
  }

  // tehdään pop-up-dialogi
  openDialog(message: string): MatDialogRef<PopUpDialogComponent> {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {message};
    return this.dialog.open(PopUpDialogComponent, dialogConfig);
  }

}
