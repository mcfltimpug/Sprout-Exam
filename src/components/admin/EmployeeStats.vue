<template>
    <MDBCard class="" border="success" shadow="0" bg="white">
        <MDBCardBody class="d-flex flex-column flex-sm-row align-items-center justify-content-center gap-5">
            <div class="d-block d-sm-none d-lg-block">
                <img src="../../assets/stats-icon.png" class="img-fluid">
            </div>
            <div class="text-center">
                <h4>Total Employees</h4>
                <h1>{{ totalEmployees }} <span class="fs-6">employees</span></h1>
            </div>

            <div class="text-center">
                <h4>Total Regulars</h4>
                <h1> {{ totalRegulars }} <span class="fs-6">regulars</span></h1>
            </div>
            <div class="text-center">
                <h4>Total Contractuals</h4>
                <h1> {{ totalContractuals }} <span class="fs-6">contractuals</span></h1>
            </div>
        </MDBCardBody>
    </MDBCard>
</template>

<script setup>
    import {
        MDBCard,
        MDBCardBody
    } from "mdb-vue-ui-kit";
    import {
        ref,
        onMounted,
        watch,
        computed
    } from "vue";
    import {
        useEmployeeStore
    } from "@/stores/employees";

    const employeeStore = useEmployeeStore();

    const totalEmployees = computed(() => employeeStore.employees.length);
    const totalRegulars = computed(() => employeeStore.employees.filter(employee => employee.type === 'regular')
    .length);
    const totalContractuals = computed(() => employeeStore.employees.filter(employee => employee.type === 'contractual')
        .length);

</script>