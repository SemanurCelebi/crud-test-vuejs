import { PhoneNumberUtil } from 'google-libphonenumber';

  function emailValidation (email) {
    let emailErrorMessage = ""
      // email validation rules example
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!emailRegex.test(email)){
        emailErrorMessage = "Enter a valid email address."
      }
      return emailErrorMessage;
  }


  function bankAccountValidation(bankAccount) {
    let bankAccountErrorMessage = ""
    // bank accounts with only 16 digits
    const bankAccountRegex = /^\d{16}$/;
    if(!bankAccountRegex.test(bankAccount)){
      bankAccountErrorMessage = "Enter a valid bank account."
    }
    return bankAccountErrorMessage;
  }

  function uniqueEmailValidation(customers, email) {
    const isCustomerExistWithSameEmail = customers.some(existingCustomer => existingCustomer.Email === email);
    return isCustomerExistWithSameEmail;
  }


  function uniqueFirstLastnameDateOfBirthValidation(customers, firstName, lastName, dateOfBirth) {
    const isCustomerExistWithSameCustomerInfo = customers.some(existingCustomer =>  
      existingCustomer.Firstname.toLowerCase() === firstName.toLowerCase() && 
      existingCustomer.Lastname.toLowerCase() === lastName.toLowerCase() && 
      existingCustomer.DateOfBirth === dateOfBirth 
      );
      return isCustomerExistWithSameCustomerInfo;
  }

  function phoneNumberValidation(phoneNumber) {
    let phoneErrorMessage = "";
    const phoneUtil = PhoneNumberUtil.getInstance();
      try {
        const phoneNumberObject = phoneUtil.parse(phoneNumber, 'NL'); // 'TR' for Turkey
        const isValid = phoneUtil.isValidNumber(phoneNumberObject);

        if (isValid) {
          phoneErrorMessage = '';
        }else {
          phoneErrorMessage = 'Enter a valid phone number';
        }
      } catch (error) {
        phoneErrorMessage = 'Enter a valid phone number';
      }
      return phoneErrorMessage;
  }


export { emailValidation, bankAccountValidation, uniqueEmailValidation, uniqueFirstLastnameDateOfBirthValidation, phoneNumberValidation };




