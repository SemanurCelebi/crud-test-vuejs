export default {
  state: {
    customer: {
      Firstname: '',
      Lastname: '',
      DateOfBirth: '',
      PhoneNumber: '',
      Email: '',
      BankAccountNumber: '',
    },
  },
  mutations: {
    setCustomer(state, payload) {
      state.customer = payload;
    },
  },
  actions: {
    updateCustomer({ commit }, customerData) {
      commit('setCustomer', customerData);
    },
  },
  getters: {
    getCustomer: (state) => state.customer,
  },
};