<template>
  <b-container class="input-phone-number">
    <div class="my-5"><h3>{{$t('Confirmation.title')}}</h3></div>
    <div class="my-5">
      <b-input-group>
        <template v-slot:prepend>
          <b-input-group-text>{{$t('Confirmation.input')}}</b-input-group-text>
        </template>
        <template v-slot:append>
          <b-button v-on:click="searchPhoneNumber">
            <b-icon icon="search"></b-icon>
          </b-button>
        </template>
        <b-form-input type="search" v-model="phoneNumber"></b-form-input>
      </b-input-group>
    </div>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      phoneNumber: ""
    }
  },
  methods: {
    searchPhoneNumber: function() {
      var user = this.$store.state.users.find((user) => {
        return user.phone == this.phoneNumber
      })
      if(user){
        this.$router.push('/users/'+user._id)
      }else{
        alert("user is not defined")
      }
    }
  }
}
</script>