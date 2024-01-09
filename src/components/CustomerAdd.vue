<template>
  <div>
    <h1>Please fill in this form</h1>
    <form @submit.prevent="submitForm">
      <label for="firstname">Name:</label>
      <input type="text" id="firstname" v-model="customer.Firstname" placeholder="" required>

      <label for="lastname">Surname:</label>
      <input type="text" id="lastname" v-model="customer.Lastname" required>

      <label for="dob">Date Of Birth:</label>
      <input type="date" id="dob" v-model="customer.DateOfBirth" required>

      <label for="phone">Phone Number:</label>
      <input type="tel" id="phone" v-model="customer.PhoneNumber" @input="validatePhoneNumber" placeholder="0612345678" required onkeypress="return event.charCode >= 48 && event.charCode <= 57">
      <span v-if="phoneError" class="error-message">{{ phoneError }}</span>

      <label for="email">E-mail:</label>
      <input type="email" id="email" v-model="customer.Email" required @input="validateEmail">
      <span v-if="emailError" class="error-message">{{ emailError }}</span>

      <label for="bankAccount">Bank Account Number:</label>
      <input type="text" id="bankAccount" v-model="customer.BankAccountNumber" @input="validateBankAccount" required>
      <span v-if="bankAccountError" class="error-message">{{ bankAccountError }}</span>

      <button type="submit" :disabled="!isFormValid">Submit</button>
    </form>

    <div v-if="formSubmitted">
      <p>Form başarıyla gönderildi!</p>
      <p>Ad: {{ customer.Firstname }}</p>
      <p>Soyad: {{ customer.Lastname }}</p>
      <p>Doğum Tarihi: {{ customer.DateOfBirth }}</p>
      <p>Telefon Numarası: {{ customer.PhoneNumber }}</p>
      <p>E-posta: {{ customer.Email }}</p>
      <p>Banka Hesap Numarası: {{ customer.BankAccountNumber }}</p>
    </div>
    <router-link to="/customerList">Go to List Page</router-link>
  </div>
</template>

<script>
import {EmailValidation, BankAccountValidation} from "../validation/customerValidation";

import { PhoneNumberUtil } from 'google-libphonenumber';
// import { mapState } from 'vuex';
export default {
  name: 'CustomerAdd',
  data() {
    return {
      customer: {
        Firstname: '',
        Lastname: '',
        DateOfBirth: '',
        PhoneNumber: '',
        Email: '',
        BankAccountNumber: ''
      },
      formSubmitted: false,
      emailError: '',
      bankAccountError: '',
      phoneError: '',
    };
  },
  methods: {
    submitForm() {
      if (this.isFormValid) {
        // Form bilgilerini konsola yazdır veya başka bir işlemi gerçekleştir
        console.log('Form Bilgileri:', this.customer);
        this.formSubmitted = true;
      } else {
        alert('Lütfen formu doğru şekilde doldurun.');
      }
    },
    validateEmail() {
      const emailValidator = new EmailValidation();
      this.emailError = emailValidator.validate(this.customer.Email);
    },
    validateBankAccount() {
      const bankAccountValidator = new BankAccountValidation();
      this.bankAccountError = bankAccountValidator.validate(this.customer.BankAccountNumber)
    },
    validatePhoneNumber() {
      const phoneUtil = PhoneNumberUtil.getInstance();
      try {
        const phoneNumberObject = phoneUtil.parse(this.customer.PhoneNumber, 'NL'); // 'TR' for Turkey
        console.log('phoneNumberObject : '+ phoneNumberObject)
        const isValid = phoneUtil.isValidNumber(phoneNumberObject);
        console.log('isValid : '+ isValid)

        if (isValid) {
          this.phoneError = '';
        }else{
          this.phoneError = 'Enter a valid phone number';
        }
      } catch (error) {
        this.phoneError = 'Enter a valid phone number';
      }
    },
  },
  
  computed: {
    isFormValid() {
      // Formun tamamı geçerli mi kontrolü
      return this.emailError === '' && this.bankAccountError === '';
    },
}
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
