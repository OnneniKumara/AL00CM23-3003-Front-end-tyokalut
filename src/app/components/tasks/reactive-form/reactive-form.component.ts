import {CommonModule} from '@angular/common';
import {Component, inject, OnInit, signal} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators,} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {Router} from '@angular/router';
import {pwdValidator} from './pwd-validator';
import {PopUpService} from '../../../services/pop-up.service';

@Component({
  selector: 'reactive-form',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    CommonModule,
  ],
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.css',
})
export class ReactiveFormComponent implements OnInit {

  // PopUpService
  private popUpService = inject(PopUpService);

  registerForm!: FormGroup;
  toggleVisibility = signal(true);
// niiden validointi ovat alla olevassa taulukossa
  fields = [
    {
      label: 'Käyttäjänimi',
      placeholder: 'syötä käyttäjänimi',
      type: 'text',
      formControl: 'username',
      name: 'username',
      errors: [
        {
          type: 'required',
          message: 'käyttäjänimi vaaditaan',
        },
        {
          type: 'pattern',
          message:
            'Käyttäjänimen tulee olla 3-20 merkkiä pitkä ja sisältää vain kirjaimia ja numeroita',
        },
      ],
    },
    {
      label: 'Etunimi',
      placeholder: 'syötä etunimi',
      type: 'text',
      formControl: 'firstName',
      name: 'firstName',
      errors: [
        {
          type: 'required',
          message: 'Etunimi vaaditaan',
        },
        {
          type: 'pattern',
          message:
            'Etunimi saa sisältää vain kirjaimia ja pitää olla vähintään 2 merkkiä pitkä',
        },
      ],
    },
    {
      label: 'Sukunimi',
      placeholder: 'Syötä sukunimi',
      type: 'text',
      formControl: 'lastName',
      name: 'lastName',
      errors: [
        {
          type: 'required',
          message: 'Sukunimi vaaditaan',
        },
        {
          type: 'pattern',
          message:
            'Sukunimi saa sisältää vain kirjaimia ja pitää olla vähintään 2 merkkiä pitkä',
        },
      ],
    },
    {
      label: 'Sähköposti',
      placeholder: 'Syötä sähköposti',
      type: 'email',
      formControl: 'email',
      name: 'email',
      errors: [
        {
          type: 'required',
          message: 'Sähköposti vaaditaan',
        },
        {
          type: 'email',
          message: 'Epäkelpo sähköpostiosoite',
        },
      ],
    },
    {
      label: 'Salasana',
      placeholder: 'syötä salasana',
      type: 'password',
      formControl: 'password',
      name: 'password',
      errors: [
        {
          type: 'required',
          message: 'Salasana vaaditaan',
        },
        {
          type: 'pattern',
          message:
            'Salasanan täytyy sisältää vähintään 8 merkkiä, joista vähintään yksi kirjain ja yksi numero',
        },
      ],
    },
    {
      label: 'Salasanan vahvistus',
      placeholder: 'vahvista salasana',
      type: 'password',
      formControl: 'confirmPassword',
      name: 'confirmPassword',
      errors: [
        {
          type: 'passwordMismatch',
          message: 'Salasanat eivät täsmää',
        },
      ],
    },
  ];

  // private dialog = inject(MatDialog);
  private router = inject(Router);

  get username() {
    return this.registerForm.get('username');
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  get terms() {
    return this.registerForm.get('terms');
  }

  ngOnInit(): void {
    this.createForm();
  }

  clickEvent(event: MouseEvent) {
    event.stopPropagation();
    this.toggleVisibility.set(!this.toggleVisibility());
  }

  //tämä metodi ei käytännössä tee mitään, ei pyydetty tehtävänannossa
  onSubmit() {

    // laitetaan nyt vaikka konsoliin lokia ja lomakkeen tiedot jsonina
    console.log('Form submitted\n', this.registerForm.value);

    // ja vaikka servicen kautta dialogiin ilmoitus
    const dialogRef = this.popUpService.openDialog(
      'Rekisteröityminen onnistui!\n' +
      'sinut ohjataan etusivulle\n\n' +
      'lomakkeen tiedot:\n\n' +
      JSON.stringify(this.registerForm.value, null, '\t'));

    // ja sitten vaikka mennään etusivulle
    dialogRef.afterClosed().subscribe(() => {
      this.cancel();
    })
  }

  // mennään 'etusivulle'
  cancel() {
    this.router.navigate(['']);
  }


// kentät, joita käytetään lomakkeessa ja

  /**
   * @private
   * Initializes the registration form with validation rules.
   *
   * The form contains the following fields:
   * - `username`: Required, must be 4-21 characters long, starting with a letter.
   * - `email`: Required, must be a valid email address.
   * - `firstName`: Required, must be at least 2 characters long, containing only letters.
   * - `lastName`: Required, must be at least 2 characters long, containing only letters.
   * - `password`: Required, must be at least 8 characters long, containing at least one letter and one number.
   * - `confirmPassword`: Required, must match the password.
   * - `terms`: Required, must be true (indicating acceptance of terms and conditions).
   */
  private createForm() {
    this.registerForm = new FormGroup(
      {
        username: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[A-Za-zäöüÄÖÜßåÅ0-9]{3,21}$/),
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.email
        ]),
        firstName: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[A-Za-zäöüÄÖÜßåÅ]{2,}$/),
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[A-Za-zäöüÄÖÜßåÅ]{2,}$/),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Za-zäöüÄÖÜßåÅ])(?=.*\d)[A-Za-zäöüÄÖÜßåÅ\d]{8,}$/),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
        terms: new FormControl(false, [Validators.requiredTrue]),
      },
      {validators: pwdValidator}
    );
  }
}
