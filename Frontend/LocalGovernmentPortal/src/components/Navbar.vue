<template>
  <div class="navbar"  >
    <b-navbar fixed="top" type="light" variant="info" >
      <b-navbar-brand :to="{path: '/'}">{{$t("Navbar.title")}}</b-navbar-brand>

      <b-navbar-nav>
        <!--b-nav-item to="/">{{$t("Navbar.home")}}</b-nav-item-->
        <b-nav-item :to="{path: '/distributions'}">
          {{$t("Navbar.distribution")}}
        </b-nav-item>

        <b-nav-item :to="{path: '/confirmation'}">
          {{$t('Navbar.confirmation')}}
        </b-nav-item>
        
      </b-navbar-nav>

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
<style>
#navbar {
    width:inherit;
    height:inherit;
    position: absolute;
    top: 0px;
    left: 0px;
}
</style>
