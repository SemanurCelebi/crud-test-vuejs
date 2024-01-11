import { 
  emailValidation, 
  bankAccountValidation, 
  uniqueEmailValidation, 
  uniqueFirstLastnameDateOfBirthValidation, 
  phoneNumberValidation 
} from '@/validation/customerValidation.js'


describe('Email Validation', () => {
  it('should not return an error message for a valid email', () => {
    const validEmail = 'test@example.com';
    const errorMessage = emailValidation(validEmail);
    expect(errorMessage).toBe('');
  });

  it('should return an error message for an invalid email', () => {
    const invalidEmail = 'invalid-email';
    const errorMessage = emailValidation(invalidEmail);
    expect(errorMessage).toBe('Enter a valid email address.');
  });

  it('should return an error message for an empty email', () => {
    const emptyEmail = '';
    const errorMessage = emailValidation(emptyEmail);
    expect(errorMessage).toBe('Enter a valid email address.');
  });
});


describe('Bank Account Validation', () => {
  it('should not return an error message for a valid bank account', () => {
    const validBankAccount = '1234567890123456';
    const errorMessage = bankAccountValidation(validBankAccount);
    expect(errorMessage).toBe('');
  });

  it('should return an error message for an invalid bank account with fewer than 16 digits', () => {
    const invalidBankAccount = '123456789012345';
    const errorMessage = bankAccountValidation(invalidBankAccount);
    expect(errorMessage).toBe('Enter a valid bank account.');
  });

  it('should return an error message for an invalid bank account with more than 16 digits', () => {
    const invalidBankAccount = '12345678901234567';
    const errorMessage = bankAccountValidation(invalidBankAccount);
    expect(errorMessage).toBe('Enter a valid bank account.');
  });

  it('should return an error message for a non-numeric bank account', () => {
    const nonNumericBankAccount = 'invalid';
    const errorMessage = bankAccountValidation(nonNumericBankAccount);
    expect(errorMessage).toBe('Enter a valid bank account.');
  });

  it('should return an error message for an empty bank account', () => {
    const emptyBankAccount = '';
    const errorMessage = bankAccountValidation(emptyBankAccount);
    expect(errorMessage).toBe('Enter a valid bank account.');
  });
});

describe('Unique Email Validation', () => {
  const customers = [
    { Email: 'test1@example.com' },
    { Email: 'test2@example.com' },
    { Email: 'test3@example.com' },
  ];

  it('should return true for an existing email in the customers list', () => {
    const existingEmail = 'test1@example.com';
    const result = uniqueEmailValidation(customers, existingEmail);
    expect(result).toBe(true);
  });

  it('should return false for a non-existing email in the customers list', () => {
    const nonExistingEmail = 'nonexistent@example.com';
    const result = uniqueEmailValidation(customers, nonExistingEmail);
    expect(result).toBe(false);
  });

  it('If the list is empty it should return false and save', () => {
    const emptyCustomersList = [];
    const email = 'test@example.com';
    const result = uniqueEmailValidation(emptyCustomersList, email);
    expect(result).toBe(false);
  });
});


describe('Unique Customer Information Validation', () => {
  const customers = [
    { Firstname: 'John', Lastname: 'Doe', DateOfBirth: '1990-01-01' },
    { Firstname: 'Jane', Lastname: 'Smith', DateOfBirth: '1985-05-15' },
    { Firstname: 'Bob', Lastname: 'Johnson', DateOfBirth: '1995-12-30' },
  ];

  it('should return true for an existing customer with the same information', () => {
    const existingCustomerInfo = { Firstname: 'John', Lastname: 'Doe', DateOfBirth: '1990-01-01' };
    const result = uniqueFirstLastnameDateOfBirthValidation(customers, existingCustomerInfo.Firstname, existingCustomerInfo.Lastname, existingCustomerInfo.DateOfBirth);
    expect(result).toBe(true);
  });

  it('should return true for an existing customer with the same information', () => {
    const existingCustomerInfo = { Firstname: 'JOHN', Lastname: 'DOE', DateOfBirth: '1990-01-01' };
    const result = uniqueFirstLastnameDateOfBirthValidation(customers, existingCustomerInfo.Firstname, existingCustomerInfo.Lastname, existingCustomerInfo.DateOfBirth);
    expect(result).toBe(true);
  });

  it('should return false for a non-existing customer with the same information', () => {
    const nonExistingCustomerInfo = { Firstname: 'Alice', Lastname: 'Williams', DateOfBirth: '1988-07-20' };
    const result = uniqueFirstLastnameDateOfBirthValidation(customers, nonExistingCustomerInfo.Firstname, nonExistingCustomerInfo.Lastname, nonExistingCustomerInfo.DateOfBirth);
    expect(result).toBe(false);
  });

  it('If the list is empty it should return false and save', () => {
    const emptyCustomersList = [];
    const customerInfo = { Firstname: 'Jack', Lastname: 'Brown', DateOfBirth: '1992-04-10' };
    const result = uniqueFirstLastnameDateOfBirthValidation(emptyCustomersList, customerInfo.Firstname, customerInfo.Lastname, customerInfo.DateOfBirth);
    expect(result).toBe(false);
  });
});



describe('Phone Number Validation', () => {
  it('should not return an error message for a valid phone number', () => {
    const validPhoneNumber = '0612345678';
    const errorMessage = phoneNumberValidation(validPhoneNumber);
    expect(errorMessage).toBe('');
  });

  it('should return an error message for an invalid phone number', () => {
    const validPhoneNumber = '1234567890';
    const errorMessage = phoneNumberValidation(validPhoneNumber);
    expect(errorMessage).toBe('Enter a valid phone number');
  });

  it('should return an error message for an invalid phone number', () => {
    const invalidPhoneNumber = 'invalid';
    const errorMessage = phoneNumberValidation(invalidPhoneNumber);
    expect(errorMessage).toBe('Enter a valid phone number');
  });
});