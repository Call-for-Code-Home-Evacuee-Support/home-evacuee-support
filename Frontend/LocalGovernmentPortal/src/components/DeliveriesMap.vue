<template>
  <div id="app">
    <div id="map">
      <l-map ref="map" :zoom="zoom" :center="center">
        <l-tile-layer :url="url" allowfullscreen></l-tile-layer>

        <Vue2LeafletMarkerCluster :options="clusterOptions">
          <!--l-marker  v-for="user in getUsersByShelter(selectedshelter)" :key="user._id">
          </l-marker-->
          <l-marker
            v-for="shelter in getSheltersByShelter(selectedshelter)"
            :key="shelter._id"
            :lat-lng="$store.getters.getShelterInfo({_id: shelter._id, _prop: 'latlng'})"
            @click="onClick({'type':'shelters','_id': shelter._id})"
          >
            <l-icon
              icon-url="https://raw.githubusercontent.com/jayeshguntupalli/leaflet-color-markers/master/img/tshelter.png"
              :icon-size="iconSize"
            />

            <l-tooltip :options="{ permanent:true, interactive:false}">{{shelter.name}}</l-tooltip>
          </l-marker>

          <l-marker
            v-for="user in getUsersPregnant(selected)"
            :key="user._id"
            :lat-lng="$store.getters.getUserInfo({_id: user._id, _prop: 'latlng'})"
            @click="onClick({'type':'users','_id': user._id})"
          >
            <l-icon
              icon-url="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png"
            />
            <l-tooltip :options="{ permanent:true, interactive:false}">{{user.name}}</l-tooltip>
          </l-marker>

          <l-marker
            v-for="user in getUsersDisabled(selected)"
            :key="user._id"
            :lat-lng="$store.getters.getUserInfo({_id: user._id, _prop: 'latlng'})"
            @click="onClick({'type':'users','_id': user._id})"
          >
            <l-icon
              icon-url="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png"
            />
            <l-tooltip :options="{ permanent:true, interactive:false}">{{user.name}}</l-tooltip>
          </l-marker>

          <l-marker
            v-for="user in getUsersForeigner(selected)"
            :key="user._id"
            :lat-lng="$store.getters.getUserInfo({_id: user._id, _prop: 'latlng'})"
            @click="onClick({'type':'users','_id': user._id})"
          >
            <l-icon
              icon-url="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png"
            />
            <l-tooltip :options="{ permanent:true, interactive:false}">{{user.name}}</l-tooltip>
          </l-marker>

          <l-marker
            v-for="user in getUsersNormal(selected)"
            :key="user._id"
            :lat-lng="$store.getters.getUserInfo({_id: user._id, _prop: 'latlng'})"
            @click="onClick({'type':'users','_id': user._id})"
          >
            <l-icon
              icon-url="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png"
            />
            <l-tooltip :options="{ permanent:true, interactive:false}">{{user.name}}</l-tooltip>
          </l-marker>
        </Vue2LeafletMarkerCluster>
      </l-map>
    </div>

    <div id="filter">
      <!--------------------------Dsitrict Filter---------------------------------------------------------------->
      <div id="districtFilter">
        <h5 class="text-left">{{$t("Sidebar.districtFilter")}}</h5>

        <b-form-group label-cols="4" label-align="left" label-for="input-filter">
          <b-form-select
            id="input-filter"
            size="sm"
            v-model="selectedshelter"
            @change="getUsersByShelter"
          >
            <b-form-select-option value="all">{{"All"}}</b-form-select-option>
            <b-form-select-option
              v-for="shelter in $store.state.shelters"
              :key="shelter._id"
              :value="shelter._id"
            >{{shelter.name}}</b-form-select-option>
          </b-form-select>
        </b-form-group>
      </div>

      <!-------------------------------------Victim Status Filter----------------------------------------------------->
      <div id="districtFilter">
        <h5 class="text-left">{{$t("Sidebar.victimStatusFilter")}}</h5>
        <b-form-group>
          <div id="statusfilter">
            <b-col>
              <b-form-checkbox-group
                v-model="selected"
                size="lg"
                :options="$t('DeliveriesMap.status')"
                stacked
              ></b-form-checkbox-group>
            </b-col>
          </div>
        </b-form-group>
      </div>

      <!---------------------------User Shelter Info--------------------------------------------------------------->

      <div v-if="userinfo.name" class="my-3">
        <br />
        <h5>{{$t("DeliveriesMap.userInfo")}}</h5>
        <div>{{$t("DeliveriesMap.userData.name")}}: {{userinfo.name}}</div>
        <div>{{$t("DeliveriesMap.userData.zipcode")}}: {{userinfo.zipcode}}</div>
        <div>{{$t("DeliveriesMap.userData.address")}}: {{userinfo.address}}</div>
        <div>{{$t("DeliveriesMap.userData.phone")}}: {{userinfo.phone}}</div>
        <div>{{$t("DeliveriesMap.userData.family")}}: {{userinfo.family.length}}</div>
      </div>
      <div v-if="shelterinfo.name" class="my-3">
        <br />
        <h5>{{$t("DeliveriesMap.shelterInfo")}}</h5>
        <div>{{$t("DeliveriesMap.userData.name")}}: {{shelterinfo.name}}</div>
        <div>{{$t("DeliveriesMap.userData.zipcode")}}: {{shelterinfo.zipcode}}</div>
        <div>{{$t("DeliveriesMap.userData.address")}}: {{shelterinfo.address}}</div>
        <div>{{$t("DeliveriesMap.userData.phone")}}: {{shelterinfo.phone}}</div>
      </div>
    </div>
  </div>
</template>    
  
<script>
import { LMap, LTileLayer, LMarker, LIcon, LTooltip } from "vue2-leaflet";
import Vue2LeafletMarkerCluster from "vue2-leaflet-markercluster";

export default {
  name: "deliveries-map",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
    LTooltip,
    Vue2LeafletMarkerCluster
  },

  data() {
    return {
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      iconSize: [32, 37],
      zoom: 14,
      center: [35.71, 139.46],
      //famstatus: ['$t("Deliveries.status.pregnant")', '$t("DeliveriesMap.status.disabled")', '$t("DeliveriesMap.status.foreigner")'],
      options: [
        { text: "All-Evacuees", value: ["evacuees"] },
        { text: "All-Shelters", value: ["shelters"] }
      ],
      selected: [],
      userByShelter: [],
      temp: [],
      selectedshelter: [],
      allSelected: false,
      indeterminate: false,
      clusterOptions: {
        disableClusteringAtZoom: 15
      },
      button: [],
      userinfo: {
        name: "",
        address: "",
        zipcode: "",
        phone: "",
        family: "",
        distributions: []
      },
      shelterinfo: {
        name: "",
        address: "",
        zipcode: "",
        phone: "",
        family: "",
        distributions: []
      }
    };
  },
  created: function() {
    const _id = this.$route.query.id;
    if (_id) {
      this.userinfo.name = this.$store.getters.getUserInfo({
        _id: _id,
        _prop: "name"
      });
      this.userinfo.address = this.$store.getters.getUserInfo({
        _id: _id,
        _prop: "address"
      });
      this.userinfo.zipcode = this.$store.getters.getUserInfo({
        _id: _id,
        _prop: "zipcode"
      });
      this.userinfo.phone = this.$store.getters.getUserInfo({
        _id: _id,
        _prop: "phone"
      });
      this.userinfo.family = this.$store.getters.getUserInfo({
        _id: _id,
        _prop: "family"
      });

      this.center = this.$store.getters.getUserInfo({
        _id: _id,
        _prop: "latlng"
      });
    }
  },
  methods: {
    onClick: function(params) {
      var _id = params._id;
      var type = params.type;

      if (type == "users") {
        this.userinfo.title = "User Info";
        this.userinfo.name = this.$store.getters.getUserInfo({
          _id: _id,
          _prop: "name"
        });
        this.userinfo.address = this.$store.getters.getUserInfo({
          _id: _id,
          _prop: "address"
        });
        this.userinfo.zipcode = this.$store.getters.getUserInfo({
          _id: _id,
          _prop: "zipcode"
        });
        this.userinfo.phone = this.$store.getters.getUserInfo({
          _id: _id,
          _prop: "phone"
        });
        this.userinfo.family = this.$store.getters.getUserInfo({
          _id: _id,
          _prop: "family"
        });
      } else if (type == "shelters") {
        this.shelterinfo.name = this.$store.getters.getShelterInfo({
          _id: _id,
          _prop: "name"
        });
        this.shelterinfo.address = this.$store.getters.getShelterInfo({
          _id: _id,
          _prop: "address"
        });
        this.shelterinfo.zipcode = this.$store.getters.getShelterInfo({
          _id: _id,
          _prop: "zipcode"
        });
        this.shelterinfo.phone = this.$store.getters.getShelterInfo({
          _id: _id,
          _prop: "phone"
        });
      }
    },
    getSheltersByShelter: function(selectedshelter) {
      return this.$store.state.shelters.filter(shelter => {
        if (selectedshelter == "all") {
          return true;
        } else {
          return shelter._id == selectedshelter;
        }
      });
    },

    getUsersPregnant(selected) {
      if (selected.includes("pregnant")) {
        return this.$store.state.userByShelter.filter(user => {
          for (let f of user.family) {
            if (f.status == "pregnant") return true;
          }
        });
      }
    },
    getUsersDisabled(selected) {
      if (selected.includes("disabled")) {
        return this.$store.state.userByShelter.filter(user => {
          for (let f of user.family) {
            if (f.status == "disabled") return true;
          }
        });
      }
    },

    getUsersForeigner(selected) {
      if (selected.includes("foreigner")) {
        return this.$store.state.userByShelter.filter(user => {
          for (let f of user.family) {
            if (f.status == "foreigner") return true;
          }
        });
      }
    },
    getUsersNormal(selected) {
      if (selected.includes("normal")) {
        return this.$store.state.userByShelter.filter(user => {
          var temp = true;
          for (let f of user.family) {
            if (
              f.status == "foreigner" ||
              f.status == "pregnant" ||
              f.status == "disabled"
            )
              temp = false;
          }
          return temp;
        });
      }
    },

    getUsersByShelter(selectedshelter) {
      if (selectedshelter == "all") {
        this.$store.state.userByShelter = this.$store.state.users;
      } else {
        this.$store.state.userByShelter = this.$store.state.users.filter(
          user => {
            return user.shelterId == selectedshelter;
          }
        );
      }
    }
  }
};
</script>

<style>
@import "~leaflet.markercluster/dist/MarkerCluster.css";
@import "~leaflet.markercluster/dist/MarkerCluster.Default.css";

#map {
  position: absolute;
  right: 20%;
  width: 80%;
  top: 0;
  bottom: 0;
}
#filter {
  position: absolute;
  width: 20%;

  top: 50;
  right: 0;
  left: 80%;
}

#statusfilter {
  position: relative;
  text-align: left;
}
#heading {
  background: #fff;
  border-bottom: 1px solid #eee;
  height: 60px;
  line-height: 60px;
  padding: 0 10px;
}

#districtFilter {
  margin: 0 5% auto;
}
</style>
