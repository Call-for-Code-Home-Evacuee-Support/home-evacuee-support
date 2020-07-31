export default {
    en: {
      Navbar: {
        title: 'Local Government Portal',
        home: 'Home',
        distribution: 'Supply Distribution Plan',
        vdistribution: 'Volunteer-Distribution-Plan',
        confirmation: 'Each Evacuee Supply List'
      },
      Sidebar: {
        districtFilter: "District",
        victimStatusFilter: "Evacuee Status"
      },
      DeliveriesTable: {
        title: "Supply Distribution List",
        districtFilter: "District",
        statusFilter: "Status",
        filterAll: "All",
        filterOptions: {
          null: "All",
          todo: "Undelivered",
          doing: "Delivering",
          done: "Delivered"
        },
        shelterRadio: "Select Evacuation District",
        tableFields: {
          date: "Request Date",
          name: "Evacuee Name",
          contact: "Contact",
          supply: "Supply",
          status: "Distribution Status"
        },
        calculation: "Create list",
        scheduler: {
          date: "Date",
          shelter: "Evacuation Center",
          startTime: "Start",
          endTime: "End",
          spanTime: "Span(hour)"
        }
      },
      DeliveriesMap: {
        title: "Details",
        userInfo: "User Info",
        shelterInfo: "Shelter Info",
        userData: {
          name: "Name",
          zipcode: "Zipcode",
          address: "Address",
          email: "Email",
          phone: "Phone",
          shelterId: "ShelterID",
          family: "Family Count"
        },
        button:{
          evacuees: "All-Evacuees",
          shelters: "All-Shelters"
        },
        status:{
          pregnant: "Pregnant",
          disabled: "Disabled",
          foreigner: "Foreigner",
          normal: "Normal"
        },
        victim: "Victims",
        deliveryInfo: "Distribution Info"
      },
      Confirmation: {
        title: "confirmation",
        input: "Input your phone number",
        basicInformation: "Basic Information",
        name: "Name",
        phone: "Phone Number",
        shelter: "Nearest Evacuation Center",
        familyNum: "Number of family",
        familyNumUnit: "people",
        distributionsInformation: "Distributed supplies",
        action: "I've received the above supplies",
        statusFilter: "Status Filter",
        timeslotFilter: "Timeslot Filter",
        all: "All"
      } 
    }
  }