import { Person }  from './person.model';

fdescribe('Tests for Person', () => {
  let person: Person;

  beforeEach(()=>{
    person = new Person('Miguel', 'Sanchez', 25, 90, 1.8);
  });

  it('Atributes test', () => {
    expect(person.name).toEqual('Miguel');
    expect(person.lastName).toEqual('Sanchez');
    expect(person.age).toEqual(25);
    expect(person.weigth).toEqual(90);
    expect(person.heigth).toEqual(1.8);
  });

  describe('test for BMICalc', () => {
    it('Should return low', () => {
      person.weigth = 40;
      person.heigth = 1.65;
      const response = person.BMICalc();
      expect(response).toEqual('low');
    });

    it('Should return normal', () => {
      person.weigth = 58;
      person.heigth = 1.65;
      const response = person.BMICalc();
      expect(response).toEqual('normal');
    });
  });
});
