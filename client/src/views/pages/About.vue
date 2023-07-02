<template>
  <div class="aboutPage">
    <div class="centeredTextWall">
      <h1>InvoiceLab</h1>
      <h2>
        Today, the number of private entrepreneurs and businesses is growing. The idea of running a business has become more normalised, it no longer seems that only someone of the calibre of Steve Jobs or Bill Gates can run a company, so more and more young people are trying and more new businesses are being born. However, the optimal functioning of a modern business requires the right tools to help monitor certain behaviours, create a successful client - provider communication interface, help manage the resources of the business, or even shorten the time taken up by paperwork.      </h2>
      <h2>
        The aim of my thesis is to find a simple, fast and attractive solution for the latter of these, more specifically for the generation and storage of tax invoices. The application I have created aims to be a guaranteed solution for businesses and entrepreneurs that sell services or products and need to generate invoice statements.      </h2>
      <h2>
        The application can be made highly accessible thanks to its web-based format. I have created an easy-to-use schema for editing and saving invoices. The application also leaves room for users who do not wish to log in, but for users with an account, it provides an archive that helps not only to visualise the already created invoices, but also to highlight them statistically.      </h2>
      <h2>
        The interface data is stored in a MongoDB database, which is managed by a Node.js based REST API using Express.js and Mongoose libraries - I would call this the backend of the project. The frontend part of the project was implemented using Vue.js 3 JavaScript framework.
      </h2>
    </div>
  </div>
</template>


<script>
export default{
  name: "AboutPage"
}
</script>