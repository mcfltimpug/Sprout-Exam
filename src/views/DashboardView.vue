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
                    <MDBBreadcrumbItem class="hover-filter" @click="filterByType(null)">All</MDBBreadcrumbItem>
                    <MDBBreadcrumbItem class="hover-filter" @click="filterByType('regular')">Regulars
                    </MDBBreadcrumbItem>
                    <MDBBreadcrumbItem class="hover-filter" @click="filterByType('contractual')">Contractuals
                    </MDBBreadcrumbItem>
                </MDBBreadcrumb>
            </nav>
        </div>

        <div class="row justify-content-center align-items-center fixed-top mt-5" v-if="isSuccessful">
            <div class="col-11 col-sm-9 col-md-6 mt-3">
                <ActionAlert :action="adminAction" />
            </div>
        </div>

        <div class="row gap-3 gap-md-0" style="min-height: 500px;" >
            <div class="col-12 col-md-6 col-lg-4 mb-3" v-for="employee in filteredEmployees" :key="employee.id">
                <Employee :employee="employee" @show-alert="handleAlert" />
            </div>
            <div class="text-center pt-5 fst-italic" style="height: 400px" v-if="isEmpty">
                <h5>No Record Found. Please Add Employees.</h5>
            </div>
        </div>

        <div class="row mt-3">
            <nav aria-label="Page navigation example" class="mx-auto">
                <MDBPagination class="mx-auto d-flex justify-content-center">
                <MDBPageNav prev :disabled="currentPage === 1" @click.prevent="goToPage(currentPage - 1)"></MDBPageNav>
                <MDBPageItem v-for="page in totalPages" :key="page" :active="page === currentPage" @click="goToPage(page)">{{ page }}</MDBPageItem>
                <MDBPageNav next :disabled="currentPage === totalPages" @click.prevent="goToPage(currentPage + 1)"></MDBPageNav>
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
        MDBNavbar
    } from "mdb-vue-ui-kit";
    import {
        useEmployeeStore
    } from "@/stores/employees";

    const employeeStore = useEmployeeStore();
    const allEmployees = ref();
    const selectedType = ref(null);
    const isEmpty = computed(() => {
        return !filteredEmployees.value || filteredEmployees.value.length === 0;
    });
    const isSuccessful = ref(false);
    const adminAction = ref("");
    const filteredCount = ref(0);

    const employeesPerPage = 6;
    let currentPage = ref(1);

    watch(selectedType, () => {
        currentPage.value = 1;
    });

    watch(() => employeeStore.employees, (emps) => {
        allEmployees.value = emps;

    });

    const filterByType = (type) => {
        selectedType.value = type;
    };

    const filteredEmployees = computed(() => {
        if (!allEmployees.value) return [];
        
        let filtered = allEmployees.value;
        if (selectedType.value) {
            filtered = filtered.filter(employee => employee.type === selectedType.value);
        }

        filteredCount.value = filtered.length;

        const startIndex = (currentPage.value - 1) * employeesPerPage;
        const endIndex = startIndex + employeesPerPage;

        return filtered.slice(startIndex, endIndex);
    });

    const totalPages = computed(() => {
        if (!allEmployees.value) return 0;
       const count = selectedType.value ? filteredCount.value : allEmployees.value.length;
        return Math.ceil(count / employeesPerPage);
    });

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages.value) {
            currentPage.value = page;
        } else if (page < 1) {
            currentPage.value = 1;
        } else {
            currentPage.value = totalPages.value;
        }
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