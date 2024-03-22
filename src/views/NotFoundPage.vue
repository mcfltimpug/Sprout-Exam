<template>
    <div class="not-found d-flex flex-column justify-content-center align-items-center">
       <div class="d-flex flex-column justify-content-center gap-2 align-items-center">
        <img src="../assets/logo.png" alt="Empowr Logo" class="me-2 mb-3 mb-sm-0" width="50" height="50">
          <img src="../assets/logo-name.png" alt="Empowr Name" class="img-fluid" width="200" height="auto">
          <h6 class="text-success fst-italic fw-semibold mt-2 mt-sm-0" style="font-size: 10px;">Confident Management, Stronger Workforce</h6>
       </div>

       <div class="d-flex flex-column justify-content-center align-items-center">
        <h1>404 Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <MDBBtn color="success" size="lg" @click="goToDashboard">Go back to System</MDBBtn>
       </div>
    </div>
</template>

<script setup>
    import {
        MDBBtn
    } from "mdb-vue-ui-kit";
    import { useRouter } from 'vue-router';
    const router = useRouter();

    const goToDashboard = () => { router.push("/dashboard") }
</script>

<style scoped>
    .not-found {
        height: 100vh;
    }
</style>