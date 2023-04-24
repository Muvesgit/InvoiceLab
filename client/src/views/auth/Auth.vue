<template>
<div>
  <MessageWindow v-if="messageBoardContent" :message="messageBoardContent"/>

  <div v-if="!eventBox" class="centeredBoxWall">
    <div class="authBox">
      <div class="authInfoGrid">
        <h1>Log In</h1>
        
        <label>E-mail: </label>
        <input type="text" v-model="userEmail" @keyup="validateKeyPress($event, 0)">

        <label>Password: </label>
        <input type="password" v-model="userPw" @keyup="validateKeyPress($event, 0)">
      </div>

      <div class="centeredButtonSection">      
        <div class="primaryButton" @click="validatedLogin()">
          <h1>LOG IN</h1>
        </div>
      </div>

      <div class="centeredButtonSection">      
        <h2>No account? Register <span @click="switchEventBoxes()">here</span> </h2>
      </div>

    </div>
  </div>  


  <div v-else class="centeredBoxWall">
    <div class="authBox">
      <div class="authInfoGrid">
        <h1>Register</h1>
        
        <label>First name: </label>
        <input type="text" v-model="registerFName" @keyup="validateKeyPress($event, 1)">
        
        <label>Last name: </label>
        <input type="text" v-model="registerLName" @keyup="validateKeyPress($event, 1)">
        
        <label>E-mail: </label>
        <input type="text" v-model="registerEmail" @keyup="validateKeyPress($event, 1)">

        <label>Password: </label>
        <input type="password" v-model="registerPassword" @keyup="validateKeyPress($event, 1)">
      </div>

      <div class="centeredButtonSection">
        <div class="primaryButton" @click="validatedRegistration()">
          <h1>REGISTER</h1>
        </div>
      </div>

      <div class="centeredButtonSection">      
        <h2>Already registered? Log in <span @click="switchEventBoxes()">here</span> </h2>
      </div>

    </div>
  </div>  
</div>
</template>

<script>
import MessageWindow from '../support/MessageWindow.vue'

export default{
  name: "UserAuth",
  components: {
    MessageWindow
  },
  setup(){
    return{
    }
  },
  data(){
    return{
      userEmail: "",
      userPw: "",

      registerFName: "",
      registerLName: "",
      registerEmail: "",
      registerPassword: "",

      messageBoardContent: null,

      eventBox: 0,
    }
  },
  watch: {

  },
  mounted(){

  },
  methods:{
    async validatedLogin(){
      let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if ( !this.userEmail.match(validRegex) ) {
        this.openMessageBoard("Please enter a valid email address!");
        return;
      }
      if ( !this.userPw ){
        this.openMessageBoard("Please enter a valid password!");
        return;
      }

      let data = JSON.stringify({
        email: this.userEmail,
        password: this.userPw,
      });

      try{
        await fetch(process.env.VUE_APP_USERS_LOGIN,
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: data
        })
        .then((response) => response.json())
        .then((res) => {
          if(res.status == 201){
            localStorage.setItem("loggedUser", JSON.stringify(res.user));
            window.location.reload();
          }
        })
      }
      catch(error){
        this.openMessageBoard(error.message);
      }
    },

    async validatedRegistration(){
      let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if ( !this.registerEmail.match(validRegex) ) {
        this.openMessageBoard("Please enter a valid email address!");
        return;
      }
      if ( !this.registerPassword ){
        this.openMessageBoard("Please enter a valid password!");
        return;
      }
      if ( !this.registerFName ){
        this.openMessageBoard("Please enter a valid first nane!");
        return;
      }
      if ( !this.registerLName ){
        this.openMessageBoard("Please enter a valid last name!");
        return;
      }

      let data = JSON.stringify({
        firstName: this.registerFName,
        lastName: this.registerLName,
        email: this.registerEmail,
        password: this.registerPassword,
      });

      try{
        await fetch(process.env.VUE_APP_USERS,
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: data
        })
        .then((response) => response.json())
        .then((res) => {
          this.openMessageBoard(res.message);
        })
        window.location.reload();
      }
      catch(error){
        this.openMessageBoard(error.message);
      }
    
    },

    switchEventBoxes(){
      (this.eventBox) ? this.eventBox = 0 : this.eventBox = 1;
    },

    validateKeyPress(event, index){
      switch(index){
        case 0:
          if(event.key == "Enter"){
            this.validatedLogin();
          }
          break;
        case 1:
          if(event.key == "Enter"){
            this.validatedRegistration();
          }
          break;
      }
    },

    openMessageBoard(content){
      this.messageBoardContent = content;

      setTimeout(() => {
        this.messageBoardContent = null;
      }, 6200);
    }
  }
}
</script>