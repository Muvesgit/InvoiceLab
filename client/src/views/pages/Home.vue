<template>

  <Transition name="home-slide">
    <div v-if="enter" class="centeredTextWall">
      <div>
        <h3>Welcome to <h1> &nbsp; InvoiceLab! </h1></h3>
        <h2>InvoiceLab is the quick solution to your Invoice printing requirements!</h2>
      </div>
      
      <router-link to="/Creator">
        <div class="primaryButton">
          <h1>CREATE YOUR OWN</h1>
        </div>
      </router-link>
    </div>
  </Transition>

</template>

<script>
export default{
  name: "HomePage",
  data(){
    return{
      enter: false,
    }
  },
  mounted(){
    this.enter = true;
  }
}
</script>