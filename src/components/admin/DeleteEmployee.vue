<template>
    <MDBBtn color="danger" @click="deleteEmployeeModal = true">
        <i class="fas fa-trash"></i>
        Delete
    </MDBBtn>

    <MDBModal id="deleteEmployeeModal" tabindex="-1" labelledby="deleteEmployeeModalTitle" v-model="deleteEmployeeModal"
        centered class="modal">
        <form @submit.prevent="deleteEmployee">
            <MDBModalHeader :style="{ background: headerBgGradient }" class="text-white">
                <MDBModalTitle id="deleteEmployeeModalTitle">
                    <i class="fas fa-trash"></i>
                    <span class="ms-2">Delete Employee</span></MDBModalTitle>
            </MDBModalHeader>
            <MDBModalBody class="text-center gap-5">
                <h5>Are you sure you want to delete this employee?</h5>
                <h3 class="text-danger fw-bold">{{ fullName }}</h3>
            </MDBModalBody>
            <MDBModalFooter class="d-flex gap-2 justify-content-center">
                <MDBBtn color="secondary" @click="deleteEmployeeModal = false"> Cancel </MDBBtn>
                <MDBBtn color="danger" type="submit"> Confirm Delete </MDBBtn>
            </MDBModalFooter>
        </form>
    </MDBModal>
</template>

<script setup>
    import {
        MDBModal,
        MDBModalHeader,
        MDBModalTitle,
        MDBModalBody,
        MDBModalFooter,
        MDBBtn,
        MDBCard,
        MDBCardBody,
        MDBInput,
        MDBCheckbox,
        MDBTextarea,
    } from "mdb-vue-ui-kit";
    import {
        ref,
        onMounted,
        computed
    } from "vue";
    import { useEmployeeStore } from "../../stores/employees";
    const employeeStore = useEmployeeStore();

    const deleteEmployeeModal = ref(false);
    const props = defineProps({
        empDetails: Object
    });

    const fullName = computed(() => props.empDetails.firstName + " " + props.empDetails.lastName)

    const headerBgGradient = computed(() => {
        if (props.empDetails.type == "regular") {
            return `linear-gradient(to right, #40C13A, #A4EB12)`;
        } else {
            return `#40C13A`
        }
    });

    const deleteEmployee = () =>{
        employeeStore.deleteEmployee(props.empDetails.id);
        deleteEmployeeModal.value = false;
    }
</script>

<style scoped>
    .custom-card {
        background-color: #40c13a;
        cursor: pointer;
    }

    .chip {
        background-color: #FFD700;
        padding: 5px;
        border-radius: 5px 5px 4px 0px;
    }
</style>