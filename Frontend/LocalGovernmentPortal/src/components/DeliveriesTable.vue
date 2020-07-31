<template>
  <div class="deliveries-table">
    

    <h3 class="mb-5">{{$t('DeliveriesTable.title')}}</h3>

    <!--modal of distributions-->
    <b-button v-b-modal.calcDistributions>{{$t('DeliveriesTable.calculation')}}</b-button>

    <b-modal id="calcDistributions" :title="$t('DeliveriesTable.calculation')" size="lg" @ok="calcDistributionSchedule()">

      <b-row>
        <b-col cols="12" sm="6">
          <b-form-group :label="$t('DeliveriesTable.scheduler.date')" label-for="input-dates">
            <b-calendar block v-model="calenderValue" @context="onCalendarContext" ></b-calendar>
          </b-form-group>
        </b-col>

        <b-col cols="12" sm="6">
          <b-form-group label-cols="6" label-align="right"
            :label="$t('DeliveriesTable.scheduler.shelter')" label-for="input-shelter"
          >
            <b-form-select id="input-shelter" v-model="scheduler.shelterId" placeholder="">
              <b-form-select-option 
                v-for="shelter in $store.state.shelters" :key="shelter._id"
                :value="shelter._id"
              >
                {{shelter.name}}
              </b-form-select-option>
            </b-form-select>
          </b-form-group>

          <b-row class="my-3 text-center">
            <b-col cols="6" sm="12" lg="6">
              <b-form-group :label="$t('DeliveriesTable.scheduler.startTime')" label-for="input-starttime">
                <b-time v-model="startTimeValue" minutes-step="60" @context="onStartTimeContext"></b-time>
              </b-form-group>
            </b-col>

            <b-col cols="6" sm="12" lg="6">
              <b-form-group :label="$t('DeliveriesTable.scheduler.endTime')" label-for="input-endtime">
                <b-time v-model="endTimeValue" minutes-step="60" @context="onEndTimeContext"></b-time>
              </b-form-group>
            </b-col>
          </b-row>

          <b-form-group label-cols="6" label-align="right"
            :label="$t('DeliveriesTable.scheduler.spanTime')" label-for="input-spantime"
          >
            <b-form-input id="input-spantime" 
              v-model="scheduler.spanTime"
              type="number" min="0"
            ></b-form-input>
          </b-form-group>

          

        </b-col>
      </b-row>
    </b-modal>

    <!--distribution table-->
    <b-overlay :show="overlay" rounded="sm">

    <b-row class="mt-3">
      <b-col cols="6"></b-col>
      <b-col cols="6">
        <b-form-group label-cols="4" label-align="right"
          :label="$t('DeliveriesTable.districtFilter')" label-for="input-filter"
        >
          <b-form-select id="input-filter" v-model="$store.state.shelterFilter" placeholder="">
            <template v-slot:first>
              <b-form-select-option value="">{{$t('DeliveriesTable.filterAll')}}</b-form-select-option>
            </template>
            <b-form-select-option 
              v-for="shelter in $store.state.shelters" :key="shelter._id"
              :value="shelter._id"
            >
              {{shelter.name}}
            </b-form-select-option>
          </b-form-select>
        </b-form-group>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="6"></b-col>
      <b-col cols="6">
        <b-form-group label-cols="4" label-align="right"
          :label="$t('DeliveriesTable.statusFilter')" label-for="input-filter"
        >
          <b-form-select id="input-filter" v-model="$store.state.statusFilter">
            <b-form-select-option 
              v-for="filter in $store.state.statusFilterOptions" :key="filter.value"
              :value="filter.value"
            >
              {{$t("DeliveriesTable.filterOptions."+filter.value)}}
            </b-form-select-option>
          </b-form-select>
        </b-form-group>
      </b-col>
    </b-row>

    <b-table hover 
      id="distributions-table"
      :items="getDistributionsByShelter($store.state.shelterFilter)" 
      :fields="distributions_fields"
      :filter="$store.state.statusFilter" 
      :filterIncludedFields="filterOn"
      sort-by="date" sort-desc
      :per-page="perPage"
      :current-page="currentPage"
      small
    > 
      <template v-slot:cell(date)="data">
        <!--todo: date convert to YYYYMMDD hh:mm:ss-->
        {{formatDate(data.item.date)}}
      </template>

      <template v-slot:cell(name)="data">
        {{$store.getters.getUserInfo({_id: data.item.userId, _prop: "name"})}}
      </template>

      <template v-slot:cell(contact)="data">
        <ul style="list-style: none;">
          <li>
            <b-link :to="{path: '/map', query: {id: data.item.userId}}">
              {{$store.getters.getUserInfo({_id: data.item.userId, _prop: "address"})}}
            </b-link>
          </li>
          <li>{{$store.getters.getUserInfo({_id: data.item.userId, _prop: "email"})}}</li>
          <li>{{$store.getters.getUserInfo({_id: data.item.userId, _prop: "phone"})}}</li>
        </ul>
      </template>

      <template v-slot:cell(supply)="data">
        {{$store.getters.getSupplyInfo({_id: data.item.supplyId, _prop: "name"})}}
         * {{data.item.num}}
      </template>

      <template v-slot:cell(shelter)="data">
        {{$store.getters.getShelterInfo({_id: data.item.shelterId, _prop: "name"})}}
      </template>

      <template v-slot:cell(status)="data">
        {{$t("DeliveriesTable.filterOptions."+data.item.status)}}
      </template>

      <template v-slot:cell(timeslot)="data">
        {{$store.getters.getTimeslotInfo({_id: data.item.timeslotId, _prop: "date"})}}
        {{$store.getters.getTimeslotInfo({_id: data.item.timeslotId, _prop: "startTime"})}}:00
        - {{$store.getters.getTimeslotInfo({_id: data.item.timeslotId, _prop: "endTime"})}}:00
      </template>
    </b-table>

    <b-col class="my-1">
      <b-pagination
        v-model="currentPage"
        :total-rows="getDistributionsByShelter($store.state.shelterFilter).length"
        :per-page="perPage"
        aria-controls="distributions-table"
        align="center"
      ></b-pagination>
    </b-col>

    </b-overlay>
    
  </div>
</template>

<script>

export default {
  data() {
    return {
      distributions_fields: [
        {key: "date", label: "Request Date", sortable: true},
        {key: "name", label: "User Name"},
        {key: "contact"},
        {key: "supply"},
        {key: "shelter", label: "Evacuation Center"},
        {key: "status", label: "Delivery Status", sortable: true},
        {key: "timeslot"}
      ],
      filterOn: ["status"],
      currentPage: 1,
      perPage: 10,
      scheduler: {
        shelterId: "",
        startTime: 8,
        endTime: 17,
        spanTime: 2,
        dates: []
      },
      overlay: false,
      calenderValue: null,
      startTimeValue: null,
      endTimeValue: null
    }
  },
  methods: {
    getStatusText: function(_status){
      const filter = this.$store.state.statusFilterOptions.find((_filter) => {
        return _filter.value == _status
      })
      return filter.text
    },
    getDistributionsByShelter: function(_shelterId){
      return this.$store.state.distributions.filter((distribution) => {
        if(_shelterId){
          return distribution.shelterId == _shelterId
        }else{
          return true
        }
      })
    },
    calcDistributionSchedule: async function() {
      //alert(JSON.stringify(this.scheduler))

      if(!(this.scheduler.shelterId)){
        alert("please fill all")
        return false
      }

      this.overlay = true

      await fetch(
        "https://ec80e471.jp-tok.apigw.appdomain.cloud/distributer/calc?shelterId=" + this.scheduler.shelterId, {
          method: "POST",
          mode: "cors",
          headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
            "X-IBM-Client-Id": process.env.VUE_APP_IBM_CLIENT_ID2,
            "X-IBM-Client-Secret": process.env.VUE_APP_IBM_CLIENT_SECRET2
          }
        }
      )
      var res = await fetch(
        "https://ec80e471.jp-tok.apigw.appdomain.cloud/distributer/schedule", {
          method: "POST",
          mode: "cors",
          headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
            "X-IBM-Client-Id": process.env.VUE_APP_IBM_CLIENT_ID2,
            "X-IBM-Client-Secret": process.env.VUE_APP_IBM_CLIENT_SECRET2
          },
          body: JSON.stringify(this.scheduler)
        }
      )
      var data = await res.json()

      if(data){
        this.$store.dispatch('getSupplies')
        this.$store.dispatch('getRequests')
        this.$store.dispatch('getDistributions')
        this.$store.dispatch('getTimeslots')
      }

      this.overlay = false
    },
    onCalendarContext(ctx) {
      this.scheduler.dates[0] = ctx.selectedYMD
    },
    onStartTimeContext(ctx) {
      this.scheduler.startTime = ctx.hours
    },
    onEndTimeContext(ctx) {
      this.scheduler.endTime = ctx.hours
    },
    formatDate: function(_date) {
      var date = new Date(_date)

      var format = 'YYYY-MM-DD hh:mm'

      var year = date.getFullYear()
      var month = (date.getMonth() + 1)
      var day = date.getDate()
      var hours = date.getHours()
      var minutes = date.getMinutes()

      var replaceStrArray ={
          'YYYY': year,
          'Y': year,
          'MM': ('0' + (month)).slice(-2),
          'M': month,
          'DD': ('0' + (day)).slice(-2),
          'D': day,
          'hh': ('0' + hours).slice(-2),
          'h': hours,
          'mm': ('0' + minutes).slice(-2),
          'm': minutes
      };

      var replaceStr = '(' + Object.keys(replaceStrArray).join('|') + ')';
      var regex = new RegExp(replaceStr, 'g');

      var ret = format.replace(regex, function (str) {
          return replaceStrArray[str];
      });

      return ret;

    }
  }
}
</script>