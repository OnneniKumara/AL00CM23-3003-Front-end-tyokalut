import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-hello-world',
  standalone: true,
  imports: [
    FormsModule,
  ],
  templateUrl: './hello-world.component.html',
  styleUrl: './hello-world.component.css'
})
export class HelloWorldComponent {
  title = 'AL00CM23-3003-Front-end-tyokalut - Hello World komponentti';
}
