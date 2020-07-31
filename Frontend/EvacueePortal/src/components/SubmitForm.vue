<template>
  <b-container class="submit-form">
    <b-overlay :show="overlay" rounded="sm">

    <!--confirm table-->
    <h3>{{$t("SubmitForm.confirm")}}</h3>

    <b-table :items="$store.state.form.requests"
      :fields="requestFields"
    >
      <template v-slot:cell(name)="data">
        {{getSupplyInfo(data.item._id, "name")}}
      </template>

      <template v-slot:cell(unit)="data">
        {{getSupplyInfo(data.item._id, "unit")}}
      </template>
    </b-table>



    <!-- 4. Other Form -->
    <h3 class="my-4">{{$t("SubmitForm.title")}}</h3>

    <b-form-group label-cols="4" label-align="right"
      :label="$t('SubmitForm.remarks')+`: `" label-for="input-remark"
    >
      <b-form-textarea id="input-remark" 
        v-model="$store.state.form.remarks"
      ></b-form-textarea>
    </b-form-group>

    <b-row class="mt-4">
      <b-col cols="6" class="text-left">
        <b-button to="/1">{{$t("Utils.prev")}}</b-button> 
      </b-col>
      <b-col cols="6" class="text-right">
        <b-button v-on:click="onSubmit" variant="primary">{{$t("Utils.submit")}}</b-button> 
      </b-col>
    </b-row>

    </b-overlay>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      requestFields: [
        {key: "name"},
        {key: "num"},
        {key: "unit"}
      ],
      overlay: false
    }
  },
  methods: {
    onSubmit: async function() {
      //alert(JSON.stringify(this.$store.state.form))
      this.overlay = true
      const status = await this.$store.dispatch("submitForm")
      if(status){
        this.overlay = false
        //alert(JSON.stringify(status))
        this.$router.push('/3')
      }else {
        alert("register failed")
        this.overlay = false
      }
      //todo: add error process
    },
    prevPage() {
      this.$router.push('/1')
    },
    getSupplyInfo(supplyId, prop) {
      var supply = this.$store.state.supplies.find((_supply) => {
        return _supply._id == supplyId
      })

      if(supply){
        return supply[prop]
      }else{
        return "supply is not found"
      }
    }
  }
}
</script>