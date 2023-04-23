<template>
  <div class="centeredTextWall">
    <div>
      <h1>Welcome to InvoiceLab!</h1>
      <h2>InvoiceLab is the quick solution to your Invoice printing requirements!</h2>
    </div>
    
    <router-link to="/Creator">
      <div class="primaryButton">
        <h1>CREATE YOUR OWN</h1>
      </div>
    </router-link>
  </div>
</template>

<script>
export default{
  name: "HomePage"
}
</script>