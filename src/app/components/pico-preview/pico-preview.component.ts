import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pico-preview',
  templateUrl: './pico-preview.component.html',
  styleUrls: ['./pico-preview.component.scss'],
  imports: [ReactiveFormsModule, FormsModule]
})
export class PicoPreviewComponent {

  constructor() { }

}
