<template>
    <MDBCard>
      <MDBCardHeader bg="success" class="text-white p-2 px-4">Regular</MDBCardHeader>
      <MDBCardBody class="d-flex flex-column gap-4">

        <div class="d-flex gap-2 justify-content-center align-items-center">
            <img src="../../assets/logo.png" width="100" class="img-fluid">
            <h2>Christine Faith Timpug</h2>
        </div>

        <div class="d-flex gap-2 justify-content-center">
            <MDBBtn color="info"> 
                <i class="fas fa-eye"></i>
                View
            </MDBBtn>
            <MDBBtn color="primary"> 
                <i class="fas fa-pen"></i>
                Edit
            </MDBBtn>
            <MDBBtn color="danger"> 
                <i class="fas fa-trash"></i>
                Delete
            </MDBBtn>
        </div>
        
      </MDBCardBody>
    </MDBCard>
  </template>

<script setup>
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn, MDBCardHeader, MDBIcon } from "mdb-vue-ui-kit";
</script>