import {Component, inject} from '@angular/core';
import {FormsModule,} from '@angular/forms';
import {PersonalData} from '../../../models/PersonalData/personal-data';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {MatCheckbox} from '@angular/material/checkbox';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {PopUpService} from '../../../services/pop-up.service';


@Component({
  selector: 'app-template-form-validation',
  imports: [
    FormsModule,
    MatFormField,
    NgIf,
    MatInput,
    MatCheckbox,
    MatError,
    MatButton,
    MatLabel
  ],
  templateUrl: './template-form-validation.component.html',
  styleUrl: './template-form-validation.component.css'
})
export class TemplateFormValidationComponent {

  personalData: PersonalData = new PersonalData();
  isTickChecked: boolean = false;
  private router = inject(Router);
  // PopUpService
  private popUpService = inject(PopUpService);

  //tämä metodi ei käytännössä tee mitään, ei pyydetty tehtävänannossa
  onSubmit() {

    // laitetaan nyt vaikka konsoliin lokia ja lomakkeen tiedot jsonina
    console.log('Form submitted\n', this.personalData);

    // ja vaikka servicen kautta dialogiin ilmoitus
    const dialogRef = this.popUpService.openDialog(
      'Rekisteröityminen onnistui!\n' +
      'sinut ohjataan etusivulle\n\n' +
      'lomakkeen tiedot:\n\n' +
      JSON.stringify(this.personalData, null, '\t'));

    // ja sitten vaikka mennään etusivulle
    dialogRef.afterClosed().subscribe(() => {
      this.cancel();
    })

  }

  // mennään 'etusivulle'
  cancel() {
    this.router.navigate(['']);
  }

}
