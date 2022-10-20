import { Component, OnInit } from '@angular/core';

import { Calculator } from "./calculator";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ng-testing-services';

  ngOnInit() {
    const calculator = new Calculator();
    calculator.multiply(3, 3);
    calculator.divide(3, 0);
  }
}
