<template>
  <div class='metamask-check'>
    <div id="metamask-info" v-if="web3.version" class="copacetic">
        <h1>Metamask Info</h1>

        <p>Web3: {{ web3.version }}</p>
        <p>Network: {{ web3.networkId }}</p>
        <p>Account: {{ web3.coinbase }}</p>
        <p>Balance: {{ web3.balance }}</p>
    </div>
    <div v-else>
        <h2 class="warn"
         >This Dapp currently requires MetaMask: https://metamask.io</h2>
    </div>
  </div>
</template>

<script>
export default {
    name: 'metamask',
    computed: {
        web3 () {
            return this.$store.state.web3;
        },
    }
}
</script>

<style scoped>
.warn {
    color: red;
}

.copacetic {
    color: green;
}
  
</style>