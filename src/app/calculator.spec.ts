import { Calculator } from './calculator';

describe('Tests for Calculator', () => {

  describe('multiply', () => {
    it('should return 9',() => {
      // Arrange - Act - Assert
      // Arrange
      const calculator = new Calculator();
      // Act
      const reponse = calculator.multiply(3, 3);
      // Assert
      expect(reponse).toEqual(9);
    });
  });

  describe('divide', () => {
    it('should return 2',() => {
      const calculator = new Calculator();
      expect(calculator.divide(4, 2)).toEqual(2);
      expect(calculator.divide(5, 2)).toEqual(2.5);
    });

    it('should return null',() => {
      const calculator = new Calculator();
      expect(calculator.divide(4, 0)).toEqual(null);
    });
  });

  it('test matchers',() => {
    const name = 'Miguel';
    let name2;
    expect(name).toBeDefined();
    expect(name2).toBeUndefined();

    expect((1 + 3) === 4).toBeTruthy();
    expect((1 + 1) === 3).toBeFalsy();

    expect(5).toBeLessThan(10);
    expect(15).toBeGreaterThan(10);

    expect('123456').toMatch(/123/);
    expect(['apples', 'oranges', 'pears']).toContain('oranges');
  });

});
