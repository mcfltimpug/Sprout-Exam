<template>
    <MDBCard>
      <MDBCardHeader :style="{ background: headerBgGradient }"  class="text-white p-2 px-4 text-uppercase">{{ employee.type }}</MDBCardHeader>
      <MDBCardBody class="d-flex flex-column gap-4">

        <div class="d-flex gap-2 justify-content-center justify-content-md-start align-items-center">
            <img src="../../assets/logo.png" width="80" class="img-fluid">
            <h2>{{fullName}}</h2>
        </div>

        <div class="d-flex gap-2 justify-content-center">
            <ViewEmployee :empDetails="employee"/>
            <MDBBtn color="primary"> 
                <i class="fas fa-pen"></i>
                Edit
            </MDBBtn>
            <DeleteEmployee :empDetails="employee"/>
            
        </div>
        
      </MDBCardBody>
    </MDBCard>
  </template>

<script setup>
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn, MDBCardHeader, MDBIcon } from "mdb-vue-ui-kit";
import ViewEmployee from '../admin/ViewEmployee.vue'
import DeleteEmployee from '../admin/DeleteEmployee.vue'

import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  employee: Object
});

const fullName = computed(()=> props.employee.firstName + " " + props.employee.lastName)

const headerBgGradient = computed(() => {
    if(props.employee.type == "regular"){
         return `linear-gradient(to right, #40C13A, #A4EB12)`;
    }else{
        return `#40C13A`
    }
});
</script>