<template>
  <main class="login">
    <MDBContainer fluid class="d-flex justify-content-center align-items-center h-100">
            <LoginForm/>
    </MDBContainer>
  </main>
</template>


<script setup>
 import {
    MDBContainer
  } from "mdb-vue-ui-kit";
import LoginForm from '../components/LoginForm.vue'

</script>

<style scoped>
.login{
  height: 100vh;
  background-image: linear-gradient(to bottom, #40C13A, #EAFFBF);
}
</style>