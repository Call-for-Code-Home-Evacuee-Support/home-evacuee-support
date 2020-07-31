<template>
  <div id="app">
    <Navbar/>
    <div class="mt-5">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  components: {
    Navbar
  },
  created: async function() {
    this.$store.dispatch('getUsers')
    this.$store.dispatch('getShelters')
    this.$store.dispatch('getSupplies')
    //this.$store.dispatch("getRequests") 
    this.$store.dispatch('getDistributions')
    this.$store.dispatch('getTimeslots')
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #270820;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #57d3ec;
}

#nav a.router-link-exact-active {
  color: #65be31;
}
</style>
