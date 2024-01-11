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
      <input type="tel" id="phone" v-model="customer.PhoneNumber" @input="validatePhoneNumber" placeholder="06________" required onkeypress="return event.charCode >= 48 && event.charCode <= 57">
      <span v-if="phoneError" class="error-message">{{ phoneError }}</span>

      <label for="email">E-mail:</label>
      <input type="email" id="email" v-model="customer.Email" required @input="validateEmail">
      <span v-if="emailError" class="error-message">{{ emailError }}</span>

      <label for="bankAccount">Bank Account Number:</label>
      <input type="text" id="bankAccount" v-model="customer.BankAccountNumber" @input="validateBankAccount" required>
      <span v-if="bankAccountError" class="error-message">{{ bankAccountError }}</span>

      <button type="submit" :disabled="!isFormValid">Submit</button>
    </form>
    <div class="link">
      <router-link to="/customerList">Go to List Page</router-link>
    </div>
    
  </div>
</template>

<script>

import { 
  emailValidation, 
  bankAccountValidation, 
  uniqueEmailValidation, 
  uniqueFirstLastnameDateOfBirthValidation,
  phoneNumberValidation
} from "../validation/customerValidation";

import { mapState, mapActions } from 'vuex';

export default {
  name: 'CustomerAdd',
  data() {
    return {
      emailError: '',
      bankAccountError: '',
      phoneError: '',
    };
  },
  methods: {
    ...mapActions("customerInfo", ["addCustomerToLocalStorage"]),
    submitForm() {
      if (this.isFormValid) {
        const customer = this.customer;

        const existingData = JSON.parse(localStorage.getItem('customers')) || [];

        let isCustomerExistWithSameEmail = uniqueEmailValidation(existingData, customer.Email);

        let isCustomerExistWithSameCustomerInfo = uniqueFirstLastnameDateOfBirthValidation(existingData, customer.Firstname, customer.Lastname, customer.DateOfBirth);

        if (isCustomerExistWithSameEmail || isCustomerExistWithSameCustomerInfo) {
          isCustomerExistWithSameCustomerInfo ? alert('Another customer exist with this first name, last name and date of birth.') : "";
          isCustomerExistWithSameEmail ? alert('Another customer exist with this email.') :  "";
          return;
        }
        else {
          this.addCustomerToLocalStorage({existingData, customer});
          alert('The form information has been saved successfully.')
          this.formClear();
        }

      } else {
        alert('Please fill out the form correctly.');
      }
    },

    validateEmail() {
      this.emailError = emailValidation(this.customer.Email);
    },

    validateBankAccount() {
      this.bankAccountError = bankAccountValidation(this.customer.BankAccountNumber);
    },

    validatePhoneNumber() {
      this.phoneError = phoneNumberValidation(this.customer.PhoneNumber);
    },

    formClear(){
      const customer = this.customer;
      customer.Firstname = '',
      customer.Lastname = '',
      customer.DateOfBirth = '',
      customer.PhoneNumber = '',
      customer.Email = '',
      customer.BankAccountNumber = ''
    }
  },
  computed: {
    isFormValid() {
      return this.emailError === '' && this.bankAccountError === '';
    },
    ...mapState({
      customer: state => state.customerInfo.customer,
    })
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
