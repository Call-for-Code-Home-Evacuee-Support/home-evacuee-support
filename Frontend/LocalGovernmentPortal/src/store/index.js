import Vue from 'vue'
import Vuex from 'vuex'



Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    statusFilter: null,
    statusFilterOptions: [
      {value: null, text: "All"},
      {value: "todo", text: "Undelivered"},
      {value: "doing", text: "Delivering"},
      {value: "done", text: "Delivered"}
    ],
    userByShelter: [],
    filter: [],
    users: [
      {
        _id: "10000000",
        name: "Jayesh",
        latlng: [35.70, 139.50],
        address: "2-2-2, kokubunji, tokyo",
        zipcode: "185-0002",
        email: "jayesh@hitachi.com",
        phone: "090-XXXX-XXXX",
        shelterId: "07d04cbc01b6d23dae7829aa5d62c0aa",
        family: [
          {
            gender: "male",
            age: 35,
            status: "ok"
          }
        ]
      },
      {
        _id: "20000000",
        name: "Hatem",
        latlng: [35.697, 139.45],
        address: "3-3-3, kokubunji, tokyo",
        zipcode: "185-0002",
        email: "hatem@hitachi.com",
        phone: "070-XXXX-XXXX",
        shelterId: "07d04cbc01b6d23dae7829aa5d62c7dc",
        family: [
          {
            gender: "female",
            age: 70,
            status: "illness"
          }
        ]
      }
    ],
    shelters: [
      {
        _id: "e01",
        name: "school1",
        latlng: [35.8, 139.4],
        address: "4-4-4, kokubunji, tokyo",
        zipcode: "185-0001",
        email: "first@kokubunji.com",
        phone: "03-XXXX-XXXX"
      },
      {
        _id: "e02",
        name: "kokubunji 2nd elementary school",
        latlng: [35.9, 139.3],
        address: "5-5-5, kokubunji, tokyo",
        zipcode: "185-0002",
        email: "second@kokubunji.com",
        phone: "03-XXXX-XXXX"
      }
    ],
    supplies: [
      {
        _id: "s001", 
        name: "Food", 
        description: "food description(sample)", 
        image: "https://placekitten.com/300/300", 
        type: "A",
        shelterId: "e01"
      },
      {
        _id: "s002", 
        name: "Phone Charger", 
        description: "100W 5h", 
        image: "https://placekitten.com/300/301", 
        type: "B",
        shelterId: "e01"
      },
      {
        _id: "s003", 
        name: "Water", 
        description: "2L*6", 
        image: "https://placekitten.com/301/300", 
        type: "A",
        shelterId: "e02"
      }
    ],
    distributions: [],
    requests: [],
    timeslots: []
  },
  getters: {
    getUserInfo: state => (args) => {
      const user = state.users.find((_user) => {
        return _user._id == args._id
      })
      if(user){
        return user[args._prop]
      }else{
        return args._id + "(load failed)"
      }
    },
    getSupplyInfo: state => (args) => {
      const supply = state.supplies.find((_supply) => {
        return _supply._id == args._id
      })
      if(supply){
        return supply[args._prop]
      }else{
        return args._id + "(load failed)"
      }
    },
    getShelterInfo: state => (args) => {
      const shelter = state.shelters.find((_shelter) => {
        return _shelter._id == args._id
      })
      if(shelter){
        return shelter[args._prop]
      }else{
        return args._id + "(load failed)"
      }
    },
    getTimeslotInfo: state => (args) => {
      const timeslot = state.timeslots.find((_timeslot) => {
        return _timeslot._id == args._id
      })
      if(timeslot){
        return timeslot[args._prop]
      }else{
        return args._id + "(load failed)"
      }
    },
    getMainCategoryInfo: state => (args) => {
      const mainCategory = state.mainCategories.find((_mainCategory) => {
        return _mainCategory._id == args._id
      })
      if(mainCategory){
        return mainCategory[args._prop]
      }else{
        return args._id + "(load failed)"
      }
    },
    getSubCategoryInfo: state => (args) => {
      const subCategory = state.subCategories.find((_subCategory) => {
        return _subCategory._id == args._id
      })
      if(subCategory){
        return subCategory[args._prop]
      }else{
        return args._id + "(load failed)"
      }
    },
  },
  mutations: {
    getSupplies(state, _supplies) {
      state.supplies = _supplies

    },
    getDistributions(state, _distributions) {
      state.distributions = _distributions
    },
    getUsers(state, _users) {
      state.users = _users
      //alert(JSON.stringify(_users))
      for(let user of state.users){
        if(typeof user.latlng == "string"){
          user.latlng=JSON.parse(user.latlng)
        }
      }
    },
    getShelters(state, _shelters) {
      state.shelters = _shelters

      //alert(JSON.stringify(_users))
    },
    getRequests(state, _requests) {
      state.requests = _requests
    },
    getTimeslots(state, _timeslots) {
      state.timeslots = _timeslots
    },
    getCategories(state, _categories) {
      state.mainCategories = _categories.main
      state.subCategories = _categories.sub
    }

  },
  actions: {
    async getSupplies(context) {

      const res = await fetch(
        process.env.VUE_APP_IBM_CLIENT_URL2 + '/supplies', {
          method: "GET",
          mode: "cors",
          headers: {
            "Accept": "application/json",
            "X-IBM-Client-Id": process.env.VUE_APP_IBM_CLIENT_ID2,
            "X-IBM-Client-Secret": process.env.VUE_APP_IBM_CLIENT_SECRET2

          }
        }
      )
      const data = await res.json()

      //alert("Supplies: "+JSON.stringify(data.supplies))

      context.commit('getSupplies', data.supplies);
    },
    async getDistributions(context) {
      const res = await fetch(

         process.env.VUE_APP_IBM_CLIENT_URL2 + '/distributions', {
          method: "GET",
          mode: "cors",
          headers: {
            "Accept": "application/json",
            "X-IBM-Client-Id": process.env.VUE_APP_IBM_CLIENT_ID2,
            "X-IBM-Client-Secret": process.env.VUE_APP_IBM_CLIENT_SECRET2

          }
        }
      )
      const data = await res.json()

      //alert("Distributions: "+JSON.stringify(data.distributions))

      context.commit('getDistributions', data.distributions);
    },

    async getUsers(context) {
      //alert("x-ibm-client-id: " + process.env.VUE_APP_IBM_CLIENT_ID);
      //alert("x-ibm-client-secret: " + process.env.VUE_APP_IBM_CLIENT_SECRET);

      const res = await fetch(
        process.env.VUE_APP_IBM_CLIENT_URL2 + '/users', {
          method: "GET",
          mode: "cors",
          headers: {
            "Accept": "application/json",
            "X-IBM-Client-Id": process.env.VUE_APP_IBM_CLIENT_ID2,
            "X-IBM-Client-Secret": process.env.VUE_APP_IBM_CLIENT_SECRET2

          }
        }
      )

      const data = await res.json()

      //alert("Users: "+JSON.stringify(data.users))

      context.commit('getUsers', data.users);
    },
    async getShelters(context) {
      const res = await fetch(
        process.env.VUE_APP_IBM_CLIENT_URL2 + '/shelters', {
          method: "GET",
          mode: "cors",
          headers: {
            "Accept": "application/json",
            "X-IBM-Client-Id": process.env.VUE_APP_IBM_CLIENT_ID2,
            "X-IBM-Client-Secret": process.env.VUE_APP_IBM_CLIENT_SECRET2

          }
        }
      )
      const data = await res.json()

      //alert("Shelters: "+JSON.stringify(data.shelters))

      context.commit('getShelters', data.shelters);
    },
    async getRequests(context) {
      const res = await fetch(
        process.env.VUE_APP_IBM_CLIENT_URL2 + '/requests', {
          method: "GET",
          mode: "cors",
          headers: {
            "Accept": "application/json",
            "X-IBM-Client-Id": process.env.VUE_APP_IBM_CLIENT_ID2,
            "X-IBM-Client-Secret": process.env.VUE_APP_IBM_CLIENT_SECRET2

          }
        }
      )
      const data = await res.json()

      context.commit('getRequests', data.requests);
    },
    async getTimeslots(context) {
      const res = await fetch(
        process.env.VUE_APP_IBM_CLIENT_URL2 + '/timeslots', {
          method: "GET",
          mode: "cors",
          headers: {
            "Accept": "application/json",
            "X-IBM-Client-Id": process.env.VUE_APP_IBM_CLIENT_ID2,
            "X-IBM-Client-Secret": process.env.VUE_APP_IBM_CLIENT_SECRET2

          }
        }
      )
      const data = await res.json()

      context.commit('getTimeslots', data.timeslots);
    },
    async getCategories(context) {
      var categories = {}
      const res = await fetch(
        process.env.VUE_APP_IBM_CLIENT_URL2 + '/categories/main', {
          method: "GET",
          mode: "cors",
          headers: {
            "Accept": "application/json",
            "X-IBM-Client-Id": process.env.VUE_APP_IBM_CLIENT_ID2,
            "X-IBM-Client-Secret": process.env.VUE_APP_IBM_CLIENT_SECRET2

          }
        }
      )
      const data = await res.json()
      categories.main = data.mainCategories

      const res2 = await fetch(
        process.env.VUE_APP_IBM_CLIENT_URL2 +'/categories/sub', {
          method: "GET",
          mode: "cors",
          headers: {
            "Accept": "application/json",
            "X-IBM-Client-Id": process.env.VUE_APP_IBM_CLIENT_ID2,
            "X-IBM-Client-Secret": process.env.VUE_APP_IBM_CLIENT_SECRET2

          }
        }
      )
      const data2 = await res2.json()
      categories.sub = data2.subCategories

      context.commit('getCategories', categories);
    }
  },
  modules: {
  }
})
