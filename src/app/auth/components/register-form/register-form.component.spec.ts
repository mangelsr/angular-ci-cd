import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFormComponent } from './register-form.component';
import { UsersService } from '../../../services/user.service';
import { query, getText } from '../../../../testing/finders';

fdescribe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;
  let userServiceSpy: jasmine.SpyObj<UsersService>

  beforeEach(async () => {
    const userSpy = jasmine.createSpyObj('UsersService', ['create']);
    await TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ RegisterFormComponent ],
      providers: [
        { provide: UsersService, useValue: userSpy },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFormComponent);
    userServiceSpy = TestBed.inject(UsersService) as jasmine.SpyObj<UsersService>;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should the email field be invalid on empty value and invalid email', () => {
    component.emailField?.setValue('this is not a valid email');
    expect(component.emailField?.invalid).withContext('invalid email value').toBeTrue();

    component.emailField?.setValue('');
    expect(component.emailField?.invalid).withContext('with empty value').toBeTrue();
  });

  it('should password field be invalid', () => {
    component.passwordField?.setValue('');
    expect(component.passwordField?.invalid).withContext('with empty value').toBeTrue();

    component.passwordField?.setValue('12345');
    expect(component.passwordField?.invalid).withContext('with "12345" value').toBeTrue();

    component.passwordField?.setValue('qwertyuio');
    expect(component.passwordField?.invalid).withContext('with no numbers value').toBeTrue();

    component.passwordField?.setValue('admin123');
    expect(component.passwordField?.valid).withContext('with correct value').toBeTrue();
  });

  it('should th form be invalid', () => {
    component.form.patchValue({
      name: 'Miguel',
      email: 'mangelsr25@gmail.com',
      password: 'admin123',
      confirmPassword: 'admin123',
      checkTerms: false,
    });
    expect(component.form.invalid).toBeTrue();
  });

  it('should the email field be invalid on empty value and invalid email from the UI', () => {
    const input: HTMLInputElement = query(fixture, 'input#email').nativeElement;

    input.value = 'this is not a valid email';
    input.dispatchEvent(new Event('input'));
    input.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    const errorText = getText(fixture, 'emailField-invalid');
    expect(errorText).withContext('invalid email value').toBe("*It's not a email");
  });

});
