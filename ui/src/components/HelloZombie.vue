<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloZombie',
  props: {
    msg: String
  },
  data() {
    return {
      address: '0x0',
    }
  }, 
  beforeCreate() {
    // eslint-disable-next-line
    console.log('registerWeb3 Action dispatched from HelloZombie.vue');
    this.$store.dispatch('registerWeb3')

    console.log('dispatching getContractInstance');
    this.$store.dispatch('getContractInstance').then(() => {
      this.address = this.$store.state.contractInstance.options.address;
    }) 
  },
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
