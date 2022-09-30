import { FormControl, FormGroup } from "@angular/forms";
import { MyValidators } from "./validators";


describe('MyValidators', () => {

  describe('validPassword', () => {
    let control: FormControl;

    beforeEach(() => {
      control = new FormControl();
    });

    it('should return null when password contain numbers', () => {
      control.setValue('admin123');

      const result = MyValidators.validPassword(control);

      expect(result).toBeNull();
    });


    it("should return error when password doesn't contain any number", () => {
      control.setValue('qwertyuiop');

      const result = MyValidators.validPassword(control);

      expect(result).toEqual({
        invalid_password: true
      });
    });
  });

  describe('matchPassword', () => {
    let group: FormGroup;

    beforeEach(() => {
      group = new FormGroup({
        password: new FormControl(),
        confirmPassword: new FormControl(),
      });
    });

    it('should null, both passwords are equal', () => {
      group.get('password')?.setValue('1234567');
      group.get('confirmPassword')?.setValue('1234567');

      const response = MyValidators.matchPasswords(group);

      expect(response).toBeNull();
    });

    it("should return error, both passwords aren't equal", () => {
      group.get('password')?.setValue('1234567');
      group.get('confirmPassword')?.setValue('123456');

      const response = MyValidators.matchPasswords(group);

      expect(response).toEqual({
        match_password: true
      });
    });

    it("should throw error, if fields aren't found on form group", () => {
      const group = new FormGroup({});

      expect(() => {
        MyValidators.matchPasswords(group);
      }).toThrowError('matchPasswords: fields not found')
    });
  });

});
