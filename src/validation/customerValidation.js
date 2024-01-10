class EmailValidation {
    validate(email) {
      let emailErrorMesagge = ""
      // email validation rules example
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!emailRegex.test(email)){
        emailErrorMesagge = "Enter a valid email address."
      }
      return emailErrorMesagge
    }
  }


class BankAccountValidation {
  validate(bankAccount) {
    let bankAccountErrorMesagge = ""
    // bank accounts with only 16 digits
    const bankAccountRegex = /^\d{16}$/;
    if(!bankAccountRegex.test(bankAccount)){
      bankAccountErrorMesagge = "Enter a valid bank account."
    }
    return bankAccountErrorMesagge;
  }
}

class UniqueEmailValidation {
  validate( customers, email ) {
    const isCustomerExistWithSameEmail = customers.some(existingCustomer => existingCustomer.Email === email);
    return isCustomerExistWithSameEmail;
  }
}

class UniqueFirstLastnameDateOfBirthValidation {
  validate(customers, firstName, lastName, dateOfBirth){
    const isCustomerExistWithSameCustomerInfo = customers.some(existingCustomer =>  existingCustomer.Firstname === firstName && existingCustomer.Lastname === lastName && existingCustomer.DateOfBirth === dateOfBirth );
    return isCustomerExistWithSameCustomerInfo;
  }
}

export { EmailValidation, BankAccountValidation, UniqueEmailValidation, UniqueFirstLastnameDateOfBirthValidation};




