<template>
  <nav class="navigation">
    <img src="../../assets/img/writtenLogo.png">
    <router-link to="/">Home</router-link>
    <router-link to="/About">About</router-link>
    <router-link to="/Auth">Login</router-link>
  </nav>
</template>
<script>
export default{
  name: "ILHeader"
}
</script>