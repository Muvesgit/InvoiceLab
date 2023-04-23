<template>
  <nav class="navigation">
    <img src="../../assets/img/writtenLogo.png">
    <router-link to="/">Home</router-link>
    <router-link to="/About">About</router-link>
    <router-link to="/Creator">Invoices</router-link>
    <router-link v-if="loggedUser" to="/Profile">Profile</router-link>
    <router-link v-else to="/Profile">Login</router-link>

    <div v-if="loggedUser" class="smallPrimaryButton" @click="logOut()">
      <h1>LOG OUT</h1>
    </div>
  </nav>
</template>
<script>
export default{
  name: "ILHeader",
  setup(){
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

    return{
      loggedUser
    }
  },
  methods:{
    logOut(){
      localStorage.removeItem("loggedUser");
      window.location.reload();
    }
  }
}
</script>