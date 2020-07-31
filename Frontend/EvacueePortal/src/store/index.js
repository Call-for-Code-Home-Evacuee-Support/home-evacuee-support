import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    form: {
      name: "",
      latlng: [35.693,139.482],
      address: "",
      zipcode: "",
      email: "",
      phone: "",
      family: [
        {
          gender: "",
          age: null,
          status: ""
        }
      ],
      requests: [],
      remarks: "",
      shelterId: ""
    },
    relationOptions: [
      {value: "you", text: "You"},
      {value: "partner", text: "Partner"},
      {value: "parent", text: "Parent"},
      {value: "child", text: "Child"},
      {value: "other", text: "Other"}
    ],
    supplies: [],
    shelters: [],
    mainCategories: [],
    subCategories: []
  },
  mutations: {
    updateForm(state, _form) {
      state.form = _form
    },
    getSupplies(state, _supplies) {
      state.supplies = _supplies

      for(let index in state.supplies){
        state.supplies[index].num = 0
      }
    },
    getShelters(state, _shelters) {
      state.shelters = _shelters
    },
    getCategories(state, _categories) {
      state.mainCategories = _categories.main
      // state.subCategories = _categories.sub
    },
    addFamily(state) {
      state.form.family.push({
        gender: "",
        age: null,
        status: []
      })
    },
    removeFamily(state, index) {
      state.form.family.splice(index, 1);
    },
    setLatlng(state, latlng) {
      state.form.latlng = latlng
    },
    setShelterId(state, shelterId) {
      state.form.shelterId = shelterId
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

      //alert("Supplies: " + JSON.stringify(data.supplies))

      context.commit('getSupplies', data.supplies);
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

      //alert("Shelters: " + JSON.stringify(data.shelters))

      context.commit('getShelters', data.shelters);
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

      context.commit('getCategories', categories);
    },
    async submitForm(context) {  

      for(let member of context.state.form.family){
        member.age = Number(member.age)
      }
      for(let request of context.state.form.requests){
        request.num = Number(request.num)
      }

      const res = await fetch(
        process.env.VUE_APP_IBM_CLIENT_URL2 + '/register', {
          method: "POST",
          mode: "cors",
          body: JSON.stringify(context.state.form),
          headers: {
            "Accept": "application/json",
            'Content-Type': 'application/json',
            "X-IBM-Client-Id": process.env.VUE_APP_IBM_CLIENT_ID2,
            "X-IBM-Client-Secret": process.env.VUE_APP_IBM_CLIENT_SECRET2
          }
        }
      )
      const data = await res.json()
      return data
    }
  }
})
