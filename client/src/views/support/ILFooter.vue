<template>
  <footer class="classyFooter">
    <h1>© KDM {{ new Date().toLocaleDateString("en-US", options) }}</h1>
  </footer>
</template>

<script>
export default{
  name: "ILFooter",
  data() {
    return{
      options: {year: 'numeric'},
    }
  }
}
</script>