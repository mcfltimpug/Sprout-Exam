<template>
  <div class="card p-2 p-sm-5">
    <div class="card-body">
      <div class="d-flex justify-content-center align-items-center flex-column flex-sm-row">
        <img src="../assets/logo.png" alt="Empowr Logo" class="me-2 mb-3 mb-sm-0" width="80" height="80">
        <div class="text-center">
          <img src="../assets/logo-name.png" alt="Empowr Name" class="img-fluid" width="320" height="auto">
          <h6 class="text-success fst-italic fw-semibold mt-2 mt-sm-0">Confident Management, Stronger Workforce</h6>
        </div>
      </div>
      <form @submit.prevent="login">
        <div class="pt-4 d-flex gap-3 flex-column">
          <div v-if="showError">
            <p class="text-danger text-center">Invalid username or password!</p>
          </div>
          <div>
            <MDBInput label="Username" size="lg" v-model="username" required />
          </div>
          <div>
            <MDBInput label="Password" size="lg" v-model="password" required />
          </div>
          <MDBBtn color="success" type="submit">LOGIN</MDBBtn>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
  import {
    MDBInput,
    MDBBtn
  } from "mdb-vue-ui-kit";
  import {
    ref
  } from 'vue'
  import {
    useAdminStore
  } from "@/stores/admin";
  import {
    useRouter
  } from "vue-router";

  const username = ref();
  const password = ref();
  const router = useRouter();
  const showError = ref(false);

  const { loginAdmin } = useAdminStore();

  const login = () =>{
    loginAdmin(username.value, password.value);
    const isLoggedIn = JSON.parse(localStorage.getItem('isAuthenticated'));

    if(isLoggedIn == true){
      console.log("Admin Logged In!")
      router.push('/dashboard');

    }else{
      showError.value = true;
      setTimeout(() => {
        showError.value = false;
      }, 3000);
    }

  }

</script>

<style scoped>

</style>