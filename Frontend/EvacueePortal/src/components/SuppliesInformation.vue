<template>
  <b-container fluid="sm" class="supplies-infomation">

    <!--search engine, side bar, categories list-->
    <b-row class="my-3">
      <b-col cols="2">
        <b-button variant="outline-secondary" pill v-b-toggle.sidebar-1>
          <b-icon icon="list"></b-icon>
        </b-button>
      </b-col>
      <b-col cols="10">
        <b-input-group>
          <template v-slot:prepend>
            <b-input-group-text>{{$t("SuppliesInformation.search")}}</b-input-group-text>
          </template>
          <template v-slot:append>
            <b-button v-on:click="searchSupplies">
              <b-icon icon="search"></b-icon>
            </b-button>
          </template>
          <b-form-input type="search" v-model="searchText"></b-form-input>
        </b-input-group>
      </b-col>
    </b-row>


    
    <b-sidebar id="sidebar-1" :title="$t('SuppliesInformation.categories')" shadow>
      <template v-slot:default="{ hide }">
      <div class="px-3 py-2">
        <b-list-group>
          <div v-for="mainCategory in $store.state.mainCategories" :key="mainCategory._id">
            <b-list-group-item button class="d-flex justify-content-between align-items-center"
              @click="hide" v-on:click="selectCategory(mainCategory._id)"
            >
              {{mainCategory.name}}
              <b-icon icon="chevron-down"></b-icon>
            </b-list-group-item>

            <!--b-collapse :id="`collapse`+mainCategory._id">
              <b-card no-body>
              <b-list-group>
                <b-list-group-item button class="d-flex justify-content-between align-items-center"
                  v-for="subCategory in getSubCategories(mainCategory._id)" :key="subCategory._id"
                  @click="hide" variant="secondary" v-on:click="selectCategory(mainCategory._id, subCategory._id)"
                >
                  {{subCategory.name}}
                  <b-icon icon="chevron-right"></b-icon>
                </b-list-group-item>
              </b-list-group>
              </b-card>
            </b-collapse-->
          </div>
        </b-list-group>
      </div>
      </template>
    </b-sidebar>

    <!--suppliesカード表示-->
    <b-row class="my-3">
      <div v-for="supply in supplies" :key="supply._id" class="col-6 col-lg-3 col-md-4 my-2">
        <b-card class="text-center" 
          :title="supply.name"
        >

          <b-card-text>{{ supply.description }}</b-card-text>          
          <!--
          <b-card-text>{{$t("SuppliesInformation.description")}}</b-card-text>
          -->

          <b-button variant="primary" 
            v-b-modal="'confirm_'+supply._id" size="sm"
          >
            {{$t("SuppliesInformation.request")}}
          </b-button>

          <b-modal :id="'confirm_'+supply._id" :title="$t('SuppliesInformation.confirm')"
            @ok="addRequest(supply)"
          >
            {{$t("SuppliesInformation.confirmText")}}
            <b-table :items="[{name: supply.name, num: supply.num, unit: supply.unit}]"
              class="my-2"
            >
              <template v-slot:cell(num)="">
                <b-form-input type="number"
                  max="5" min="1" size="sm"
                  v-model="supply.num"
                ></b-form-input>
              </template>
            </b-table>

          </b-modal>

          <!--b-input-group size="sm">
            <b-form-input type="number"
              max="5" min="0"
              v-model="supply.num"
            ></b-form-input>
            <b-input-group-append>
              <b-input-group-text>{{supply.unit}}</b-input-group-text>
              
              <b-button variant="primary" 
                v-b-tooltip.hover title="request"
                v-b-modal="'confirm_'+supply._id"
              >
                <b-icon icon="box-arrow-in-up"></b-icon>
              </b-button>

              <b-modal :id="'confirm_'+supply._id" title="Confirm"
                @ok="addRequest(supply)"
              >
                Will you Request following supply?
                <b-table :items="[{name: supply.name, num: supply.num, unit: supply.unit}]"
                  class="my-2"
                ></b-table>
              </b-modal>
            </b-input-group-append>
          </b-input-group-->

        </b-card>
      </div>
    </b-row>

    <b-row class="mt-4">
      <b-col cols="6" class="text-left">
        <b-button v-on:click="prevPage">{{$t("Utils.prev")}}</b-button> 
      </b-col>
      <b-col cols="6" class="text-right">
        <b-button v-on:click="nextPage">{{$t("Utils.next")}}</b-button> 
      </b-col>
    </b-row>

  </b-container>
</template>

<script>

export default {
  data() {
    return {
      searchText: "",
      supplies: [
        {_id: "s001", name: "test supply1", num: 0, unit: "num"},
        {_id: "s002", name: "test supply2", num: 0, unit: "num"},
        {_id: "s003", name: "test supply3", num: 0, unit: "paper"},
      ],
      mainCategories: [
        {_id: "mc01", name: "category1"},
        {_id: "mc02", name: "category2"},
        {_id: "mc03", name: "category3"},
        {_id: "mc04", name: "category4"}
      ],
      subCategories: [
        {_id: "sc01", name: "subCategory01", mainCategory: "mc01"},
        {_id: "sc02", name: "subCategory02", mainCategory: "mc01"},
        {_id: "sc03", name: "subCategory03", mainCategory: "mc01"},
        {_id: "sc04", name: "subCategory04", mainCategory: "mc02"},
        {_id: "sc05", name: "subCategory05", mainCategory: "mc02"}
      ]
    }
  },
  mounted: function() {
    //最初に表示する処理: priority ?
    //とりまランダムで…
    this.supplies = this.getSuppliesByShelter(this.$store.state.form.shelterId)

    /*var copySupplies = supplies.slice(); //copy
    this.supplies = this.shuffleArray(copySupplies).slice(0,12)*/
    
  },
  methods: {
    prevPage() {
      this.$router.push('/')
    },
    nextPage: function(){
      //alert(JSON.stringify(this.$store.state.form))
      this.$router.push('/2')
    },
    getSuppliesByShelter: function(shelterId) {
      if(!shelterId){
        return this.$store.state.supplies
      }
      return this.$store.state.supplies.filter((supply) => {
        return supply.shelterId == shelterId
      })
    },
    searchSupplies: function() {
      var supplies = this.getSuppliesByShelter(this.$store.state.form.shelterId)

      this.supplies = supplies.filter((supply) => {
        if(supply.name.indexOf(this.searchText)>-1){
          return true
        }else{
          return false
        }
      })
    },
    getSubCategories: function(mainCategoryId) {
      return this.$store.state.subCategories.filter((subCategory) => {
        return subCategory.mainCategoryId == mainCategoryId
      })
    },
    selectCategory: function(categoryId) {
      this.supplies = this.$store.state.supplies.filter((supply) => {
        return supply.mainCategoryId == categoryId
      })
    },
    addRequest: function(supply) {
      if(supply.num<=0){
        alert(this.$t('SuppliesInformation.warningSupplyNum'))
        return
      }
      //TODO: 重複処理
      var existSupply = this.$store.state.form.requests.find((_request) => {
        return _request._id == supply._id
      })
      if(existSupply){
        alert(this.$t('SuppliesInformation.warningAlreadyRequested'))
      }else{
        this.$store.state.form.requests.push({
          _id: supply._id,
          num: Number(supply.num)
        })
      }
    },
    shuffleArray: function(array) {
      for(var i = array.length - 1; i > 0; i--){
        var r = Math.floor(Math.random() * (i + 1));
        var tmp = array[i];
        array[i] = array[r];
        array[r] = tmp;
      }
      return array
    }
  }
}
</script>

