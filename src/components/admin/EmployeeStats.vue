<template>
    <MDBCard class="" border="success" shadow="0" bg="white" >
        <MDBCardBody class="d-flex flex-column flex-sm-row align-items-center justify-content-center gap-5">
            <div class="d-block d-sm-none d-lg-block">
                <img src="../../assets/stats-icon.png" class="img-fluid">
            </div>
            <div class="text-center">
                <h4>Total Employees</h4>
                <h1>25 <span class="fs-6">employees</span></h1>
            </div>

            <div class="text-center">
                <h4>Total Regulars</h4>
                <h1>15 <span class="fs-6">regulars</span></h1>
            </div>
            <div class="text-center">
                <h4>Total Contractuals</h4>
                <h1>10 <span class="fs-6">contractuals</span></h1>
            </div>
        </MDBCardBody>
    </MDBCard>

</template>

<script setup>
    import {
        MDBCard,
        MDBCardBody,
        MDBCardTitle,
        MDBCardText,
        MDBCardHeader,
        MDBCardImg,
        MDBBtn
    } from "mdb-vue-ui-kit";
</script>