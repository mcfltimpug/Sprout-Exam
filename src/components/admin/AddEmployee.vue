<template>
  <MDBCard aria-controls="exampleModalCenter" class="h-100 d-flex justify-content-center align-items-center custom-card"
    @click="exampleModalCenter = true">
    <MDBCardBody class="text-center text-white fw-semibold fs-3 d-flex justify-content-center align-items-center ">New Employee</MDBCardBody>
  </MDBCard>

  <MDBModal
    id="exampleModalCenter"
    tabindex="-1"
    labelledby="exampleModalCenterTitle"
    v-model="exampleModalCenter"
    centered
  >
    <MDBModalHeader>
      <MDBModalTitle id="exampleModalCenterTitle"> Modal title </MDBModalTitle>
    </MDBModalHeader>
    <MDBModalBody>
      <p>
        Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
        facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac,
        vestibulum at eros.
      </p>
    </MDBModalBody>
    <MDBModalFooter>
      <MDBBtn color="secondary" @click="exampleModalCenter = false"> Close </MDBBtn>
      <MDBBtn color="primary"> Save changes </MDBBtn>
    </MDBModalFooter>
  </MDBModal>
</template>

<script setup>
  import {
    MDBModal,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBBtn, MDBCard, MDBCardBody
  } from 'mdb-vue-ui-kit';
  import { ref } from 'vue';

  const exampleModalCenter = ref(false);
</script>

<style scoped>

.custom-card{
  background-color: #40C13A;
  cursor: pointer;
}
</style>