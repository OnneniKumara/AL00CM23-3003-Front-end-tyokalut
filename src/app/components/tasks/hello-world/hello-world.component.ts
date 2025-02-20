import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-hello-world',
  imports: [
    FormsModule,
    NgOptimizedImage,
  ],
  templateUrl: './hello-world.component.html',
  styleUrl: './hello-world.component.css'
})
export class HelloWorldComponent {
  title = 'Hello World komponentti';
}
