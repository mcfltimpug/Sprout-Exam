<template>
    <MDBCard class="" border="success" shadow="0" bg="white" >
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
    import { ref, onMounted, watch } from "vue";
    import { useEmployeeStore } from "@/stores/employees";

    const employeeStore = useEmployeeStore();
    const employees = ref([]);

    const totalEmployees = ref(0);
    const totalRegulars = ref(0);
    const totalContractuals = ref(0);

    onMounted(() => {
        employeeStore.getAllEmployees()
        employees.value =  employeeStore.employees;
        countTotalEmployees();
        countTotalRegulars();
        countTotalContractuals();
    });

    watch(() => employeeStore.employees, (newValue) => {
        employees.value = newValue;
        countTotalEmployees();
        countTotalRegulars();
        countTotalContractuals();
    });

    const countTotalEmployees = () => {
        totalEmployees.value = employees.value.length;
    };

    const countTotalRegulars = () => {
        totalRegulars.value = employees.value.filter(employee => employee.type === 'regular').length;
    };

    const countTotalContractuals = () => {
        totalContractuals.value = employees.value.filter(employee => employee.type === 'contractual').length;
    };
</script>
