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
      <input type="tel" id="phone" v-model="customer.PhoneNumber" placeholder="0612345678" required>

      <label for="email">E-mail:</label>
      <input type="email" id="email" v-model="customer.Email" required @input="validateEmail">
      <span v-if="emailError" class="error-message">{{ emailError }}</span>

      <label for="bankAccount">Bank Account Number:</label>
      <input type="text" id="bankAccount" v-model="customer.BankAccountNumber" @input="validateBankAccount" required>
      <span v-if="bankAccountError" class="error-message">{{ bankAccountError }}</span>

      <button type="submit" :disabled="!isFormValid">Submit</button>
    </form>

    
    <router-link to="/customerList">Go to List Page</router-link>
  </div>
</template>

<script>
import {EmailValidation, BankAccountValidation} from "../validation/customerValidation";
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
  },
  
  computed: {
    isFormValid() {
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
