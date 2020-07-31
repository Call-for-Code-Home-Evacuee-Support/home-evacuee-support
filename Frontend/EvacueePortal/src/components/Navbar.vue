<template>
  <div class="navbar">
    <b-navbar fixed="top" type="dark" variant="primary">
      <b-navbar-brand>{{$t("Navbar.title")}}</b-navbar-brand>

      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item v-on:click="changeLanguage('en')">English</b-dropdown-item>
          <b-dropdown-item v-on:click="changeLanguage('ja')">日本語</b-dropdown-item>
        </b-nav-item-dropdown> 
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  methods: {
    changeLanguage: function(lang) {
      this.$i18n.locale = lang;
    }
  }
}
</script>
