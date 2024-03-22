<template>
    <main class="dashboard mx-auto mt-5 container h-100">
        <div class="row gap-3 gap-md-0">
            <div class="col-12 col-md-9">
                <EmployeeStats />
            </div>
            <div class="col-12 col-md-3">
                <AddEmployee />
            </div>
        </div>
        <div class="row my-3">
            <nav aria-label="breadcrumb" >
                <MDBBreadcrumb class="mx-auto text-center d-flex justify-content-center">
                    <MDBBreadcrumbItem><a href="#">All</a></MDBBreadcrumbItem>
                    <MDBBreadcrumbItem><a href="#">Regulars</a></MDBBreadcrumbItem>
                    <MDBBreadcrumbItem><a href="#">Contractuals</a></MDBBreadcrumbItem>
                </MDBBreadcrumb>
            </nav>
        </div>
        <div class="row gap-3 gap-md-0">
            <div class="col-12 col-md-6 col-lg-4 mb-3" v-for="employee in allEmployees" :key="employee.id">
                <Employee :employee="employee" />
            </div>
        </div>
        
        <div class="row mt-3">
            <nav aria-label="Page navigation example" class="mx-auto">
                <MDBPagination class="mx-auto d-flex justify-content-center">
                    <MDBPageNav prev></MDBPageNav>
                    <MDBPageItem href="#">1</MDBPageItem>
                    <MDBPageItem href="#">2</MDBPageItem>
                    <MDBPageItem href="#">3</MDBPageItem>
                    <MDBPageNav next></MDBPageNav>
                </MDBPagination>
            </nav>
        </div>

        

    </main>
</template>

<script setup>
    import AddEmployee from '@/components/admin/AddEmployee.vue';
    import EmployeeStats from '@/components/admin/EmployeeStats.vue';
    import Employee from '@/components/admin/Employee.vue';
    import { ref, watch, onMounted } from "vue";

    import {
        MDBPagination,
        MDBPageNav,
        MDBPageItem, MDBBreadcrumb, MDBBreadcrumbItem
    } from 'mdb-vue-ui-kit';

    import { useEmployeeStore } from '@/stores/employees';
    const employeeStore = useEmployeeStore();
    const allEmployees = ref();

   onMounted(() => {
     employeeStore.getAllEmployees();
   })

   watch(() => employeeStore.employees, (emps) => {
        allEmployees.value = emps;
   })
</script>

<style scoped>

</style>