<template>
  <b-container class="user-form">

    <!-- 1. Basic information -->
    <h3 class="my-4">{{$t("BasicInformation.title")}}</h3>

    <b-form-group label-cols="4" label-align="right"
      :label="$t('BasicInformation.name')+`: `" label-for="input-name"
    >
      <b-form-input id="input-name" 
        v-model="$store.state.form.name"
      ></b-form-input>
    </b-form-group>

    <b-form-group label-cols="4" label-align="right"
      :label="$t('BasicInformation.phone')+`: `" label-for="input-phone"
    >
      <b-form-input id="input-phone" 
        v-model="$store.state.form.phone"
      ></b-form-input>
    </b-form-group>

    <b-row class="my-1">
      <b-col cols="4" class="text-right">
        <b-link :to="{path: '/map', query: {y: $store.state.form.latlng[0], x: $store.state.form.latlng[1]}}">
          <p>{{$t("BasicInformation.location")}}</p>
        </b-link>
      </b-col>
      <b-col cols="4" class="text-left">
        {{$t("BasicInformation.longitude")}}: {{$store.state.form.latlng[0].toFixed(4)}}
      </b-col>  
      <b-col cols="4" class="text-left">
        {{$t("BasicInformation.longitude")}}: {{$store.state.form.latlng[1].toFixed(4)}}
      </b-col>
    </b-row>

    <b-row class="my-2">
      <b-col cols="4" class="text-right">
        {{$t("BasicInformation.shelter")}}
      </b-col>
      <b-col cols="3" class="text-left">
        {{getShelterInfo(this.$store.state.form.shelterId, "name")}}
      </b-col>
      <!--b-col cols="5" class="text-right">
        <b-button v-on:click="getNearestShelter()"
          variant="outline-primary" size="sm"
        >{{$t("BasicInformation.searchShelter")}}</b-button>
      </b-col-->
    </b-row>

    <!--unnecessary zipcode?-->
    <b-form-group label-cols="4" label-align="right"
      :label="$t('BasicInformation.zipcode')" label-for="input-zipcode"
    >
      <!--b-form-select id="input-zipcode" v-model="$store.state.form.zipcode">
        <b-form-select-option 
          v-for="shelter in $store.state.shelters" :key="shelter._id"
          :value="shelter.zipcode"
        >
          {{shelter.zipcode}}
        </b-form-select-option>
      </b-form-select-->
      <b-form-input id="input-zipcode" 
        v-model="$store.state.form.zipcode"
      ></b-form-input>
    </b-form-group>

    <b-form-group label-cols="4" label-align="right"
      :label="$t('BasicInformation.address')+`: `" label-for="input-address"
    >
      <b-form-input id="input-address" 
        v-model="$store.state.form.address"
      ></b-form-input>
    </b-form-group>

    <b-form-group label-cols="4" label-align="right"
      :label="$t('BasicInformation.email')+`: `" label-for="input-email"
    >
      <b-form-input id="input-email" 
        v-model="$store.state.form.email"
      ></b-form-input>
    </b-form-group>

    <!-- 2. Family information -->
    <h3 class="my-4">{{$t("FamilyInformation.title")}}</h3>

    <b-row v-for="(member,index) in $store.state.form.family" :key="index" class="my-4">
      <b-col cols="3">
        <p class="text-right">{{$t("FamilyInformation.member")}} {{index+1}}: </p>
      </b-col>

      <b-col cols="9" class="text-right">
        <div class="mb-3">
          <b-button variant="outline-primary" size="sm"
            v-on:click="removeFamily(index)" :disabled="index==0"
          >{{$t("FamilyInformation.removeFamily")}}</b-button>
        </div>

        <b-form-group label-cols="4" label-align="right"
          :label="$t('FamilyInformation.gender')+`: `" label-for="input-gender"
        >
          <b-form-radio-group id="input-gender" v-model="member.gender">
            <b-form-radio value="male">{{$t("FamilyInformation.genderOptions.male")}}</b-form-radio>
            <b-form-radio value="female">{{$t("FamilyInformation.genderOptions.female")}}</b-form-radio>
            <b-form-radio value="other">{{$t("FamilyInformation.genderOptions.other")}}</b-form-radio>
          </b-form-radio-group>
        </b-form-group>

        <b-form-group label-cols="4" label-align="right"
          :label="$t('FamilyInformation.age')+`: `" label-for="input-age"
        >
          <b-form-input id="input-age" type="number"
            v-model="member.age"
          ></b-form-input>
        </b-form-group>

        <!--TODO: status should use tags-->
        <b-form-group label-cols="4" label-align="right"
          :label="$t('FamilyInformation.status')+`: `" label-for="input-status"
        >
          <b-form-tags v-model="member.status" size="lg" add-on-change no-outer-focus class="mb-2">
            <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
              <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                <li v-for="tag in tags" :key="tag" class="list-inline-item">
                  <b-form-tag
                    @remove="removeTag(tag)"
                    :title="tag"
                    :disabled="disabled"
                    variant="primary"
                  >{{getStatusName(tag)}}</b-form-tag>
                </li>
              </ul>
              <b-form-select
                v-bind="inputAttrs"
                v-on="inputHandlers"
                :disabled="disabled || getAvailableStatusOptions(member).length === 0"
                :options="getAvailableStatusOptions(member)"
              >
                <template v-slot:first>
                  <option disabled value="">{{$t("FamilyInformation.statusPlaceholder")}}</option>
                </template>
              </b-form-select>
            </template>
          </b-form-tags>

        </b-form-group>

      </b-col>
    </b-row>

    <div class="text-right mb-3" >
        <b-button variant="outline-primary" size="sm"
          v-on:click="addFamily"
        >{{$t("FamilyInformation.addFamily")}}</b-button>
    </div>


    <b-row class="mt-4">
      <b-col class="text-right">
        <b-button v-on:click="nextPage">{{$t("Utils.next")}}</b-button> 
      </b-col>
    </b-row>

  </b-container>
</template>

<script>
//import muni from "@/lib/muni.js"

export default {
  data() {
    return {
      relationOptions: [
        {value: "you", text: "You"},
        {value: "partner", text: "Partner"},
        {value: "parent", text: "Parent"},
        {value: "child", text: "Child"},
        {value: "other", text: "Other"}
      ],
      statusOptions: [
        {value: "pregnant", text: "pregnant"},
        {value: "disabled", text: "disabled"},
        {value: "foreigner", text: "foreigner"}
      ]
    }
  },
  mounted: async function() {
    await this.getNearestShelter()

    if (navigator.geolocation) {
      //alert("getlocation ok")
      await navigator.geolocation.getCurrentPosition(
        async function(position){
          //alert("getting getlocation success!")
          let coords = position.coords;
          this.$store.commit("setLatlng", [coords.latitude, coords.longitude])

          //shelterId推定？
          await this.getNearestShelter()

          //alert(JSON.stringify(this.$store.state.form.latlng))

        }.bind(this),
        function(error) {
          console.log(error)
          alert("getting getlocation error!", error)
        }
      )
    } else {
      alert("geolocation NG");
    }

  },
  methods: {
    getAvailableStatusOptions: function(member) {
      var options = this.statusOptions.filter((opt) => {
        return member.status.indexOf(opt.value) == -1
      })

      for(let option of options){
        option.text = this.$t("FamilyInformation.statusOptions."+option.value)
      }
      return options
    },
    getStatusName: function(val) {
      var status = this.statusOptions.find((item) => {
        return item.value == val
      })
      return status.text
    },
    addFamily: function() {
      this.$store.commit("addFamily")
    },
    removeFamily: function(index) {
      this.$store.commit("removeFamily", index)
    },
    nextPage: function(){
      this.$router.push('/1')
      //alert(JSON.stringify(this.$store.state.form))
    },
    getNearestShelter: async function() {
      var user = this.$store.state.form

      var min_distance = 1000
      var min_distance_shelter = null
      if(this.$store.state.shelters.length==0){
        await this.$store.dispatch('getShelters')
      }
      for(let shelter of this.$store.state.shelters) {
        var distance = (shelter.latlng[0]-user.latlng[0])**2 + (shelter.latlng[1]-user.latlng[1])**2
        if(distance < min_distance) {
          min_distance = distance
          min_distance_shelter = shelter
        }
      }
      //alert(this.$t('BasicInformation.noteNearestShelter') + min_distance_shelter.name)
      this.$store.commit("setShelterId", min_distance_shelter._id)
    },
    getShelterInfo: function(shelterId, prop) {
      var shelter = this.$store.state.shelters.find((_shelter) => {
        return _shelter._id == shelterId
      })
      if(shelter) {
        return shelter[prop]
      }else{
        return this.$t('BasicInformation.shelterNotFound')
      }
    }
  }
}
</script>