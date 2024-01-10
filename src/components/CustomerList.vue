<template>
    <div>
      <h1> Customer List Page</h1>
       <ul>
          <li v-for="(customer, index) in customers" :key="index">
            Firstname:{{customer.Firstname}} - Lastname:{{customer.Lastname}} - DateOfBirth:{{customer.DateOfBirth}} - PhoneNumber:{{customer.PhoneNumber}} - Email:{{customer.Email}} - BankAccount:{{customer.BankAccountNumber}}
          </li>
       </ul>
    </div>
  </template>
  
  <script>
  import { mapState, mapActions } from 'vuex';
  export default {
    name: 'CustomerList',
    methods: {
      ...mapActions("customerInfo", ["getCustomers"]),
    },
    computed: {
    ...mapState({
      customers: state => state.customerInfo.customers,
    })
    },
    created(){
      this.getCustomers();
    }
  }
  </script>
  
  
  