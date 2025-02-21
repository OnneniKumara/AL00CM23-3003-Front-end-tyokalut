import {Component, inject, ViewChild} from '@angular/core';
import {CalcComponent} from '../../tasks/calc/calc.component';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatSlider, MatSliderThumb} from '@angular/material/slider';
import {MatFormField, MatInput} from '@angular/material/input';
import {PopUpService} from '../../../services/pop-up.service';


@Component({
  selector: 'app-testing',
  imports: [
    CalcComponent,
    FormsModule,
    MatButton,
    MatSlider,
    MatSliderThumb,
    MatInput,
    MatFormField,
  ],
  templateUrl: './testing.component.html',
  styleUrl: './testing.component.css'
})
export class TestingComponent {
  @ViewChild(CalcComponent) calcComponent!: CalcComponent;

  // PopUpService
  protected popUpService = inject(PopUpService);

  title = 'Omia testejä ja muuta epäkuranttia koodia.';

  nappi_teksti = 'oletusteksti'

  etuNimi = 'testaaja1'

  sliderinArvo = 0

  perusNappi: string = 'perusnappi!'

  dialogiViesti: string = "";

  // private dialog = inject(MatDialog);

  narusPeppi() {
    if (this.perusNappi != 'naruspeppi!') {
      this.perusNappi = 'naruspeppi!'
    } else {
      this.perusNappi = 'perusnappi!'
    }
  }

  napinPainallus() {
    if (this.etuNimi != 'testaaja1') {
      this.etuNimi = 'testaaja1'
    }
  }

  onButtonClicked() {
    if (this.nappi_teksti != 'vaihdettu teksti') {
      this.nappi_teksti = 'vaihdettu teksti'
    } else
      this.nappi_teksti = 'oletusteksti'
  }

  /*
  openDialog(message: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {message};
    this.dialog.open(PopUpDialogComponent, dialogConfig);
  }
  */

}
