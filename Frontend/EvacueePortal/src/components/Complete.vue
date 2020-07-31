<template>
  <b-container id="complete">
    <h3>Registration Complete!</h3>
    <p>please colse this application</p>

    <!--b-row class="mt-4">
      <b-col cols="6" class="text-left">
        <b-button to="/1">{{$t("Utils.prev")}}</b-button> 
      </b-col>
      <b-col cols="6" class="text-right">
        <b-button v-on:click="onSubmit" variant="primary">{{$t("Utils.submit")}}</b-button> 
      </b-col>
    </b-row-->

  </b-container>
</template>

<script>
export default {
  methods: {
    onSubmit: function() {
      this.$store.dispatch("submitForm")
    },
  }
}
</script>