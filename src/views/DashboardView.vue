<template>
    <main class="dashboard mx-auto mt-5 container h-100">
        <div class="row gap-3 gap-md-0">
            <div class="col-12 col-md-9">
                <EmployeeStats />
            </div>
            <div class="col-12 col-md-3">
                <AddEmployee @show-alert="handleAlert" />
            </div>
        </div>
        <div class="row my-3">
            <nav aria-label="breadcrumb">
                <MDBBreadcrumb class="mx-auto text-center d-flex justify-content-center fw-bold custom-filter">
                    <MDBBreadcrumbItem class="hover-filter" @click="filterEmployees('all')">All</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem class="hover-filter" @click="filterEmployees('regular')">Regulars
                    </MDBBreadcrumbItem>
                    <MDBBreadcrumbItem class="hover-filter" @click="filterEmployees('contractual')">Contractuals
                    </MDBBreadcrumbItem>
                </MDBBreadcrumb>
            </nav>
        </div>

        <div class="row justify-content-center align-items-center fixed-top mt-5" v-if="isSuccessful">
            <div class="col-11 col-sm-9 col-md-6 mt-3">
                <ActionAlert :action="adminAction" />
            </div>
        </div>

        <div class="row gap-3 gap-md-0">
            <div class="col-12 col-md-6 col-lg-4 mb-3" v-for="employee in paginatedEmployees" :key="employee.id">
                <Employee :employee="employee" @show-alert="handleAlert" />
            </div>
            <div class="text-center pt-5 fst-italic" style="height: 400px" v-if="isEmpty">
                <h5>No Record Found. Please Add Employees.</h5>
            </div>
        </div>

        <div class="row mt-3">
            <nav aria-label="Page navigation example" class="mx-auto">
                <MDBPagination class="mx-auto d-flex justify-content-center">
                    <MDBPageNav prev @click.prevent="currentPage > 1 ? currentPage-- : currentPage"></MDBPageNav>
                    <MDBPageItem v-for="page in totalPages" :key="page" :active="page === currentPage"
                        @click="currentPage = page">{{ page }}</MDBPageItem>
                    <MDBPageNav next @click.prevent="
              currentPage < totalPages ? currentPage++ : currentPage
            "></MDBPageNav>
                </MDBPagination>
            </nav>
        </div>
    </main>
</template>

<script setup>
    import AddEmployee from "@/components/admin/AddEmployee.vue";
    import EmployeeStats from "@/components/admin/EmployeeStats.vue";
    import Employee from "@/components/admin/Employee.vue";
    import ActionAlert from "@/components/admin/ActionAlert.vue";
    import {
        ref,
        watch,
        onMounted,
        computed
    } from "vue";
    import {
        MDBPagination,
        MDBPageNav,
        MDBPageItem,
        MDBBreadcrumb,
        MDBBreadcrumbItem,
    } from "mdb-vue-ui-kit";
    import {
        useEmployeeStore
    } from "@/stores/employees";

    const employeeStore = useEmployeeStore();
    const allEmployees = ref();
    const isEmpty = ref(false);
    const filteredEmployees = ref([]);
    const filterType = ref("all");

    const isSuccessful = ref(false);
    const adminAction = ref("");

    const currentPage = ref(1);
    const itemsPerPage = 6;

    const totalPages = computed(() =>
        Math.ceil(filteredEmployees.value.length / itemsPerPage)
    );

    const paginatedEmployees = computed(() => {
        const startIndex = (currentPage.value - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredEmployees.value.slice(startIndex, endIndex);
    });

    watch(() => employeeStore.employees,(emps) => {
            allEmployees.value = emps;
            filterEmployees("all");
    });

    watch(() => allEmployees.value,(employees) => {
            isEmpty.value = employees.length === 0;
    });

    watch(() => filterType.value,(type) => {
            filterEmployees(type);
    });

    watch(() => allEmployees.value,
        (employees) => {
            isEmpty.value = employees.length === 0;
    });

    const filterEmployees = (type) => {
        if (type === "all") {
            filteredEmployees.value = allEmployees.value;
        } else {
            filteredEmployees.value = allEmployees.value.filter(
                (employee) => employee.type === type
            );
        }
        currentPage.value = 1;
    };

    const handleAlert = (action) => {
        adminAction.value = action;
        isSuccessful.value = true;

        setTimeout(() => {
            isSuccessful.value = false;
        }, 3000);
    };

    onMounted(() => {
        employeeStore.getAllEmployees();
    });
</script>

<style scoped>
    .custom-filter {
        cursor: pointer;
    }

    .hover-filter:hover {
        color: #40c13a;
    }
</style>