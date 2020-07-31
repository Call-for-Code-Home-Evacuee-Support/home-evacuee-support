<template>
  <b-container class="user-distribution-table">

    <!--information table-->
    <h3 class="mt-5">{{$t('Confirmation.basicInformation')}}</h3>
    <b-row class="mt-3">
      <b-col cols="6" class="text-right"><p>{{$t('Confirmation.name')}}: </p></b-col>
      <b-col cols="6" class="text-left"><p>{{user.name}}</p></b-col>
    </b-row>
    <b-row class="mt-1">
      <b-col cols="6" class="text-right"><p>{{$t('Confirmation.phone')}}: </p></b-col>
      <b-col cols="6" class="text-left"><p>{{user.phone}}</p></b-col>
    </b-row>
    <b-row class="mt-1">
      <b-col cols="6" class="text-right"><p>{{$t('Confirmation.shelter')}}: </p></b-col>
      <b-col cols="6" class="text-left"><p>{{$store.getters.getShelterInfo({_id: user.shelterId, _prop: 'name'})}}</p></b-col>
    </b-row>
    <b-row class="mt-1">
      <b-col cols="6" class="text-right"><p>{{$t('Confirmation.familyNum')}}: </p></b-col>
      <b-col cols="6" class="text-left"><p>{{getFamilyLength(user)}} {{$t('Confirmation.familyNumUnit')}}</p></b-col>
    </b-row>

    <!--distribution table-->
    
    <h3 class="mt-5">{{$t('Confirmation.distributionsInformation')}}</h3>

    <b-row class="mt-3">
      <b-col cols="6"></b-col>
      <b-col cols="6">
        <b-form-group label-cols="4" label-align="right"
          :label="$t('Confirmation.statusFilter')" label-for="input-filter"
        >
          <b-form-select id="input-filter" v-model="statusFilter">
            <b-form-select-option 
              v-for="status in statusFilterOptions" :key="status.value"
              :value="status.value"
            >
              {{$t("DeliveriesTable.filterOptions."+status.value)}}
            </b-form-select-option>
          </b-form-select>
        </b-form-group>
      </b-col>
    </b-row>

    <b-row class="mt-3">
      <b-col cols="6"></b-col>
      <b-col cols="6">
        <b-form-group label-cols="4" label-align="right"
          :label="$t('Confirmation.timeslotFilter')" label-for="input-filter"
        >
          <b-form-select id="input-filter" v-model="timeslotFilter">
            <b-form-select-option value=''>{{$t('Confirmation.all')}}</b-form-select-option>
            <b-form-select-option 
              v-for="timeslot in getUserTimeslots()" :key="timeslot._id"
              :value="timeslot._id"
            >
              {{timeslot.date}} {{timeslot.startTime}}:00 - {{timeslot.endTime}}:00
            </b-form-select-option>
          </b-form-select>
        </b-form-group>
      </b-col>
    </b-row>

    <b-overlay :show="overlay" rounded="sm">
    <b-row>
      

      <b-table :items="getUserDistributions()" :fields="distributions_fields">
        <template v-slot:cell(timeslot)="data">
          {{$store.getters.getTimeslotInfo({_id: data.item.timeslotId, _prop: "date"})}}
          {{$store.getters.getTimeslotInfo({_id: data.item.timeslotId, _prop: "startTime"})}}:00
          - {{$store.getters.getTimeslotInfo({_id: data.item.timeslotId, _prop: "endTime"})}}:00
        </template>

        <template v-slot:cell(supply)="data">
          {{$store.getters.getSupplyInfo({_id: data.item.supplyId, _prop: "name"})}}
        </template>

        <template v-slot:cell(status)="data">
          {{$t("DeliveriesTable.filterOptions."+data.item.status)}}
        </template>

        <template v-slot:cell(check)="data">
          <b-form-checkbox size="lg" 
            v-model="data.item.check"
            :disabled="data.item.status=='done'"
          >    
          </b-form-checkbox>

          
        </template>
      </b-table>

    </b-row>
    </b-overlay>

    <b-row class="justify-content-md-center">
      <b-button variant="primary"
        v-on:click="updateStatus()"
      >
        {{$t('Confirmation.action')}}
      </b-button>
    </b-row>

  </b-container>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      distributions: [],
      shelter: {},
      distributions_fields: [
        {key: "date", label: "Request Date", sortable: true},
        {key: "timeslot"},
        {key: "supply"},
        {key: "num"},
        {key: "status", label: "Delivery Status", sortable: true},
        {key: "check"}
      ],
      statusFilter: "todo",
      statusFilterOptions: [
        {value: null, text: "All"},
        {value: "todo", text: "Undelivered"},
        {value: "doing", text: "Delivering"},
        {value: "done", text: "Delivered"}
      ],
      timeslotFilter: null,
      overlay: false
    }
  },
  created: async function() {
    this.user = await this.getUserById(this.$route.params.id)
    this.distributions = await this.getDistributionsByUserId(this.$route.params.id)
  },
  methods: {
    getUserTimeslots: function() {
      var timeslots = this.$store.state.timeslots.filter((timeslot) => {
        return this.distributions.find((d) => {
          return d.timeslotId == timeslot._id
        })
      })
      return timeslots
    },
    getUserDistributions: function() {
      var distributions = this.distributions.filter((d) => {
        var statusFlag = this.statusFilter ? d.status == this.statusFilter : true
        var timeslotFlag = this.timeslotFilter ? d.timeslotId == this.timeslotFilter : true
        return statusFlag && timeslotFlag
      })
      return distributions
    },
    getFamilyLength: function(user) {
      if(user.family){
        return user.family.length
      }else{
        return 0
      }
    },
    updateStatus: async function() {
      var distributions = this.getUserDistributions().filter((d) => {
        if(d.check){
          return d.check == true
        }else{
          return false
        }
      })

      if(distributions.length<1){
        alert("no supplies to receive")
        return 
      }

      this.overlay = true

      for(let distribution of distributions) {
        //ar d = distribution.slice() //copy
        distribution.status = "done"
        await this.updateDistribution(distribution)
      }
      
      await this.getDistributionsByUserId(this.user._id)
      //this.$router.push('/confirmation')

      this.overlay = false
    },
    getUserById: async function(_id) {
      const res = await fetch(
        "https://ec80e471.jp-tok.apigw.appdomain.cloud/distributer/users/id?id="+_id, {
          method: "GET",
          mode: "cors",
          headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
            "X-IBM-Client-Id": process.env.VUE_APP_IBM_CLIENT_ID2,
            "X-IBM-Client-Secret": process.env.VUE_APP_IBM_CLIENT_SECRET2,
            "X-Debug-Mode": true
          }
        }
      )
      const data = await res.json()
      return data
    },
    getDistributionsByUserId: async function(_id) {
      const res = await fetch(
        "https://ec80e471.jp-tok.apigw.appdomain.cloud/distributer/distributions/userId?userId="+_id, {
          method: "GET",
          mode: "cors",
          headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
            "X-IBM-Client-Id": process.env.VUE_APP_IBM_CLIENT_ID2,
            "X-IBM-Client-Secret": process.env.VUE_APP_IBM_CLIENT_SECRET2,
            "X-Debug-Mode": true
          }
        }
      )
      const data = await res.json()
      return data.distributions
    },
    updateDistribution: async function(distribution) {
      const res = await fetch(
        "https://ec80e471.jp-tok.apigw.appdomain.cloud/distributer/distributions", {
          method: "PUT",
          mode: "cors",
          headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
            "X-IBM-Client-Id": process.env.VUE_APP_IBM_CLIENT_ID2,
            "X-IBM-Client-Secret": process.env.VUE_APP_IBM_CLIENT_SECRET2,
            "X-Debug-Mode": true
          },
          body: JSON.stringify(distribution)
        }
      )
      const data = await res.json()

      if(data){return true}

      //alert("Response: "+JSON.stringify(data))
    },
  }
}
</script>