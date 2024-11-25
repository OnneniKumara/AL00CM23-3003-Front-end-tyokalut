import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {MatButton, MatButtonModule, MatFabButton} from '@angular/material/button';
import {MatSlider, MatSliderModule, MatSliderThumb} from '@angular/material/slider';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CalcComponent} from '../calc/calc.component';

@Component({
  selector: 'app-hello-world',
  standalone: true,
  imports: [
    NgOptimizedImage,
    MatButton,
    MatSlider,
    MatSliderThumb,
    MatFabButton,
    FormsModule,
    CalcComponent
  ],
  templateUrl: './hello-world.component.html',
  styleUrl: './hello-world.component.css'
})
export class HelloWorldComponent {
  title = 'AL00CM23-3003-Front-end-tyokalut - Hello World komponentti';
}
