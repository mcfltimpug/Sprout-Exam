<template>
  <MDBNavbar light bg="light" container>
    <div class="d-flex w-100 container flex-column flex-sm-row justify-content-sm-between">
      <div>
        <MDBNavbarBrand href="#" class="d-flex justify-content-center mx-auto mx-sm-0">
          <img src="../../assets/logo.png" height="30" alt="" loading="lazy" />
          <img src="../../assets/logo-name.png" width="180" alt="" loading="lazy" class="img-fluid" />
        </MDBNavbarBrand>
      </div>
      <div
        class="d-flex flex-column flex-sm-row justify-content-center mx-auto mx-sm-0 gap-2 align-items-center mt-4 mt-sm-0">
        <h6 class="">Welcome, Admin!</h6>
        <MDBBtn color="secondary fw-semibold" @click="logout">Log Out</MDBBtn>
      </div>
    </div>
  </MDBNavbar>
</template>

<script setup>
  import {
    MDBBtn,
    MDBNavbar,
    MDBNavbarBrand
  } from "mdb-vue-ui-kit";
  import {
    useAdminStore
  } from "@/stores/admin";
  import {
    useRouter
  } from "vue-router";

  const adminStore = useAdminStore();
  const router = useRouter();

  const logout = () => {
    adminStore.logoutAdmin();
    const isLoggedIn = adminStore.isAuthenticated;

    if (isLoggedIn == false) {
      console.log("Admin Logged Out!")
      router.push('/');
    }
  }
</script>