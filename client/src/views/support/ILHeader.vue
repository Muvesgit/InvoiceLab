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
    
    <div class="colorSection" @click="() => {(colorChangeMenu) ? colorChangeMenu = 0 : colorChangeMenu = 1}">
      <div class="colorShowcase"></div>
      <div v-if="colorChangeMenu" class="colorChoiceMenu">
        <div class="colorShowcase tealChoice" @click="changeTheme(0)"></div>
        <div class="colorShowcase coralChoice" @click="changeTheme(1)"></div>
        <div class="colorShowcase blueChoice" @click="changeTheme(2)"></div>
        <div class="colorShowcase yellowChoice" @click="changeTheme(3)"></div>
        <div class="colorShowcase greyChoice" @click="changeTheme(4)"></div>
      </div>
      <i v-if="!colorChangeMenu" class="pi pi-angle-down"></i>
      <i v-else class="pi pi-angle-up"></i>
    </div>
    
  </nav>
</template>
<script>
import router from "../../router"

export default{
  name: "ILHeader",
  setup(){
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    const chosenColor = JSON.parse(localStorage.getItem("chosenColor"));

    let stylesheet = document.querySelector(':root');

    if(chosenColor){
      switch(chosenColor){
        case 1:
          stylesheet.style.setProperty('--primaryColor', '#fb896a');
          stylesheet.style.setProperty('--bgImage', 'url("./img/coralbg.png")');
          break;
        case 2:
          stylesheet.style.setProperty('--primaryColor', '#1341ca');
          stylesheet.style.setProperty('--bgImage', 'url("./img/bluebg.png")');
          break;
        case 3:
          stylesheet.style.setProperty('--primaryColor', '#f58a1e');
          stylesheet.style.setProperty('--bgImage', 'url("./img/yellowbg.png")');
          break;
        case 4:
          stylesheet.style.setProperty('--primaryColor', '#555555');
          stylesheet.style.setProperty('--bgImage', 'url("./img/greybg.png")');
          break;
      }
    }

    return{
      loggedUser,
      router
    }
  },
  data(){
		return{
			colorChangeMenu: 0,
		}
	},
  methods:{
    logOut(){
      localStorage.removeItem("loggedUser");
      window.location.reload();
    },
    changeTheme(version){
      let stylesheet = document.querySelector(':root');

      switch(version){
        case 0:
          // teal
          stylesheet.style.setProperty('--primaryColor', '#37d49d');
          stylesheet.style.setProperty('--bgImage', 'url("./img/tealbg.png")');
          localStorage.setItem("chosenColor", 0);
          break;
        case 1:
          // coral
          stylesheet.style.setProperty('--primaryColor', '#fb896a');
          stylesheet.style.setProperty('--bgImage', 'url("./img/coralbg.png")');
          localStorage.setItem("chosenColor", 1);
          break;
        case 2:
          // blue
          stylesheet.style.setProperty('--primaryColor', '#1341ca');
          stylesheet.style.setProperty('--bgImage', 'url("./img/bluebg.png")');
          localStorage.setItem("chosenColor", 2);
          break;
        case 3:
          // yellow
          stylesheet.style.setProperty('--primaryColor', '#f58a1e');
          stylesheet.style.setProperty('--bgImage', 'url("./img/yellowbg.png")');
          localStorage.setItem("chosenColor", 3);
          break;
        case 4:
          // grey
          stylesheet.style.setProperty('--primaryColor', '#555555');
          stylesheet.style.setProperty('--bgImage', 'url("./img/greybg.png")');
          localStorage.setItem("chosenColor", 4);
          break;
      }
    }
  }
}
</script>