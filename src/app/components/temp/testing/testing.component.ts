import {Component, ViewChild} from '@angular/core';
import {CalcComponent} from '../../tasks/calc/calc.component';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatSlider, MatSliderThumb} from '@angular/material/slider';


@Component({
  selector: 'app-testing',
  imports: [
    CalcComponent,
    FormsModule,
    MatButton,
    MatSlider,
    MatSliderThumb,
  ],
  templateUrl: './testing.component.html',
  styleUrl: './testing.component.css'
})
export class TestingComponent {
  @ViewChild(CalcComponent) calcComponent!: CalcComponent;


  title = 'Omia testejä ja muuta epäkuranttia koodia.';

  nappi_teksti = 'oletusteksti'

  etuNimi = 'testaaja1'

  perusNappi: string = 'perusnappi!'

  narusPeppi() {
    if (this.perusNappi != 'naruspeppi!') {
      this.perusNappi = 'naruspeppi!'
    } else {
      this.perusNappi = 'perusnappi!'
    }
  }

  napinPainallus() {
    if (this.etuNimi != 'testaaja2') {
      this.etuNimi = 'testaaja2'
    } else {
      this.etuNimi = 'testaaja1'
    }
  }

  onButtonClicked() {
    if (this.nappi_teksti != 'vaihdettu teksti') {
      this.nappi_teksti = 'vaihdettu teksti'
    } else
      this.nappi_teksti = 'oletusteksti'
  }

}
