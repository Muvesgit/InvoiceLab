<template>
  <ILHeader/>
  <router-view />
  <ILFooter/>
</template>

<script>
import ILHeader from "./views/support/ILHeader.vue"
import ILFooter from "./views/support/ILFooter.vue"

export default{
  name: "App",
  components: {
    ILHeader,
    ILFooter
  }
}
</script>