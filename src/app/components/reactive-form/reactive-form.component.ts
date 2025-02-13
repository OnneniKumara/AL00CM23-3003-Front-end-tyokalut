import {Component} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {MatError, MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatCheckbox} from '@angular/material/checkbox';

@Component({
  selector: 'app-reactive-form',
  imports: [
    ReactiveFormsModule,
    NgForOf,
    MatFormField,
    MatInput,
    NgIf,
    MatIconButton,
    MatIcon,
    MatCheckbox,
    MatError,
    MatButton
  ],
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.css'
})
export class ReactiveFormComponent {

}
