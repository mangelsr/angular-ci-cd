import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { RegisterFormComponent } from './register-form.component';
import { UsersService } from '../../../services/user.service';
import { asyncError, getText, observableMock, setInputValue, asyncData, setCheckValue, clickElement } from '../../../../testing/';
import { generateOneUser } from '../../../models/user.mock';

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;
  let userServiceSpy: jasmine.SpyObj<UsersService>

  beforeEach(async () => {
    const userSpy = jasmine.createSpyObj('UsersService', ['create', 'isAvailableByEmail']);
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
    userServiceSpy.isAvailableByEmail.and.returnValue(observableMock({isAvailable: true}));
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
    setInputValue(fixture, 'input#email', 'this is not a valid email');

    fixture.detectChanges();

    const errorText = getText(fixture, 'emailField-invalid');
    expect(errorText).withContext('invalid email value').toBe("*It's not a email");
  });

  it('it should send the form successfully', () => {
    component.form.patchValue({
      name: 'Miguel',
      email: 'mangelsr25@gmail.com',
      password: 'admin123',
      confirmPassword: 'admin123',
      checkTerms: true,
    });
    const userMock = generateOneUser();
    userServiceSpy.create.and.returnValue(observableMock(userMock));

    component.register(new Event('submit'));

    expect(component.form.valid).toBeTrue();
    expect(userServiceSpy.create).toHaveBeenCalled();
  });

  it('it should send the form submit logic', fakeAsync(() => {
    // Arrange
    const userMock = generateOneUser();
    userServiceSpy.create.and.returnValue(asyncData(userMock));

    // Act
    component.form.patchValue({
      name: 'Miguel',
      email: 'mangelsr25@gmail.com',
      password: 'admin123',
      confirmPassword: 'admin123',
      checkTerms: true,
    });
    expect(component.form.valid).toBeTrue();

    // Act
    component.register(new Event('submit'));

    expect(component.status).toEqual('loading');

    // ACT
    tick();
    fixture.detectChanges();

    expect(userServiceSpy.create).toHaveBeenCalled();
    expect(component.status).toEqual('success');
  }));

  it('it should send the form submit logic from the UI', fakeAsync(() => {
    const userMock = generateOneUser();
    userServiceSpy.create.and.returnValue(asyncData(userMock));

    setInputValue(fixture, 'input#name', 'Miguel');
    setInputValue(fixture, 'input#email', 'mangelsr25@gmail.com');
    setInputValue(fixture, 'input#password', 'admin123');
    setInputValue(fixture, 'input#confirmPassword', 'admin123');
    setCheckValue(fixture, 'input#terms', true);

    fixture.detectChanges();

    expect(component.form.valid).toBeTrue();

    clickElement(fixture, 'btn-submit', true);
    // Another way to handle this...
    // query(fixture, 'form').triggerEventHandler('ngSubmit', new Event('submit'));

    fixture.detectChanges();

    expect(component.status).toBe('loading');

    tick();
    fixture.detectChanges();

    expect(userServiceSpy.create).toHaveBeenCalled();
    expect(component.status).toEqual('success');
  }));

  it('it should fail the form submission and change the status from "loading" => "error"', fakeAsync(() => {
    userServiceSpy.create.and.returnValue(asyncError('ERROR!!'));

    setInputValue(fixture, 'input#name', 'Miguel');
    setInputValue(fixture, 'input#email', 'mangelsr25@gmail.com');
    setInputValue(fixture, 'input#password', 'admin123');
    setInputValue(fixture, 'input#confirmPassword', 'admin123');
    setCheckValue(fixture, 'input#terms', true);

    fixture.detectChanges();

    expect(component.form.valid).toBeTrue();

    clickElement(fixture, 'btn-submit', true);

    fixture.detectChanges();

    expect(component.status).toBe('loading');

    tick();
    fixture.detectChanges();

    expect(userServiceSpy.create).toHaveBeenCalled();
    expect(component.status).toEqual('error');
  }));

  it('should show error with email already taken', () => {
    userServiceSpy.isAvailableByEmail.and.returnValue(observableMock({isAvailable: false}));

    setInputValue(fixture, 'input#email', 'maria@maria.com');
    fixture.detectChanges();

    expect(component.form.invalid).toBeTrue();
    expect(userServiceSpy.isAvailableByEmail).toHaveBeenCalledWith('maria@maria.com');
    const message = getText(fixture, 'emailField-notavailable');
    expect(message).toEqual('*The email is registered');
  });

});
