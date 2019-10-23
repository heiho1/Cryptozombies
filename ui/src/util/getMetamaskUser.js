import store from '../store'

var accountInterval = setInterval(function() {
    // Check if account has changed
    if (store.state.web3.eth.accounts[0] !== store.state.userAccount) {
      userAccount = web3.eth.accounts[0]
      // Call some function to update the UI with the new account
      store.commit('setUserAccount', userAccount)
    }
  }, 100)
  