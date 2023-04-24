<template>
  <nav class="navigation">
    <img src="../../assets/img/writtenLogo.png">
    <router-link v-bind:class="{selectedNavElement : router.currentRoute.value.name == 'HomePage'}"   to="/">Home</router-link>
    <router-link v-bind:class="{selectedNavElement : router.currentRoute.value.name == 'AboutPage'}"  to="/About">About</router-link>
    <router-link v-bind:class="{selectedNavElement : router.currentRoute.value.name == 'Creator'}"    to="/Creator">Invoices</router-link>
    <router-link v-bind:class="{selectedNavElement : router.currentRoute.value.name == 'Profile'}"    v-if="loggedUser" to="/Profile">Profile</router-link>
    <router-link v-bind:class="{selectedNavElement : router.currentRoute.value.name == 'Profile'}"    v-else to="/Profile">Login</router-link>

    <div v-if="loggedUser" class="smallPrimaryButton" @click="logOut()">
      <h1>LOG OUT</h1>
    </div>
  </nav>
</template>
<script>
import router from "../../router"

export default{
  name: "ILHeader",
  setup(){
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

    return{
      loggedUser,
      router
    }
  },
  methods:{
    logOut(){
      localStorage.removeItem("loggedUser");
      window.location.reload();
    },
  }
}
</script>