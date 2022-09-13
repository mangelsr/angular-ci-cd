export class Person {
  constructor(
    public name: string,
    public lastName: string,
    public age: number,
    public weigth: number,
    public heigth: number,
  ) { }

  BMICalc(): string {
    const bmi = Math.round(this.weigth / (this.heigth ** 2));
    if (bmi < 0) return 'not found';
    else if (bmi >= 0  && bmi <= 18) return 'low';
    else if (bmi >= 19 && bmi <= 24) return 'normal';
    else if (bmi >= 25 && bmi <= 26) return 'overweigth';
    else if (bmi >= 27 && bmi <= 29) return 'overweigth 1';
    else if (bmi >= 30 && bmi <= 39) return 'overweigth 2';
    else return 'over weigth 3';
  }
}
