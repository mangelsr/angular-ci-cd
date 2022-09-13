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
    const response = calculator.multiply(3, 3);
    console.log(response === 9);
    const reponse2 = calculator.divide(3, 0);
    console.log(reponse2 === null);
  }
}
