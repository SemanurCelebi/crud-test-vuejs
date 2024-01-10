  const state = {
    customer: {
      Firstname: '',
      Lastname: '',
      DateOfBirth: '',
      PhoneNumber: '',
      Email: '',
      BankAccountNumber: '',
    },
    customers : [],
    errorMessage : '',
  };

  const mutations = {
    addCustomer(state, customer) {
      state.customer = customer;
    },
    getAllCustomers(state, customers) {
      state.customers = customers;
    },
  };

  const actions = {
    addCustomerToLocalStorage({commit}, {existingData, customer}) {
      commit('addCustomer', customer);
      
      const newData = [...existingData, customer];
      localStorage.setItem('customers', JSON.stringify(newData))
    },

    getCustomers({commit}){
      const existingData = JSON.parse(localStorage.getItem('customers')) || [];
      commit('getAllCustomers',existingData);
    }
  };


  const getters = {
    getCustomer: (state) => state.customer,
  }


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};