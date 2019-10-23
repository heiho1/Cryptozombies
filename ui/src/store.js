import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import getWeb3 from './util/getWeb3';

Vue.use(Vuex);

const store = new Vuex.Store({
 strict: false,
 state,
 getters: {
   getUserAccount: (state) => () => {
     return state.userAccount
   },
   getZombie: (state) => (id) => {
     return state.contractInstance.methods.zombies(id).call()
   },
   zombieToOwner: (state) => (id) => {
     return state.contractInstance.methods.zombieToOwner(id).call()
   },
   getZombiesByOwner: (state) => (owner) => {
     return state.contractInstance.methods.getZombiesByOwner(owner).call()
   }
 },
 mutations: {
  setUserAccount (state, user) {
    state.userAccount = user
  },
  registerWeb3Instance (state, payload) {
    // eslint-disable-next-line
    console.log('registerWeb3instance Mutation being executed', payload)
    const result = payload;
    const web3Copy = state.web3;
    web3Copy.version = result.version;
    web3Copy.coinbase = result.coinbase;
    web3Copy.networkId = result.networkId;
    web3Copy.balance = parseInt(result.balance, 10);
    web3Copy.isInjected = result.injectedWeb3;
    web3Copy.web3Instance = result.web3;
    state.web3 = web3Copy;
  },
  registerContractInstance (state, payload) {
    // eslint-disable-next-line
    console.log('registerContractInstance', payload);
    state.contractInstance = payload;
  },
 },
 actions: {
  createRandomZombie({commit, state}, name) {
    state.contractInstance.methods.createRandomZombie(name)
      .send({from: state.userAccount})
      .on("receipt", function(receipt) {
        // eslint-disable-next-line
        console.log('Zombie created:' + receipt)
      })
  },
  feedOnKitty({commit, state}, zombieId, kittyId) {
    state.contractInstance.methods.feedOnKitty(zombieId, kittyId)
      .send({from: state.userAccount})
      .on("receipt", function(receipt) {
        // eslint-disable-next-line
        console.log('Zombie fed:' + receipt)
      })
  },
  getContractInstance ({commit}) {
    getContract.then(result => {
      // eslint-disable-next-line
      console.log('getContract', result)
      commit('registerContractInstance', result)
    }).catch(
      // eslint-disable-next-line
      e => console.log(e)
    )
  },
  registerWeb3 ({commit}) {
      // eslint-disable-next-line
      console.log('registerWeb3 Action being executed')
      getWeb3.then(result => {
        // eslint-disable-next-line
        console.log('committing result to registerWeb3Instance mutation');
        commit('registerWeb3Instance', result)
      }).catch(e => {
        // eslint-disable-next-line
        console.log('error in action registerWeb3', e)
      })
  },
 },
});

export default store