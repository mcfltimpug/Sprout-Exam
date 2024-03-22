<template>
    <MDBBtn color="info" @click="exampleModalCenter = true">
        <i class="fas fa-eye"></i>
        View
    </MDBBtn>

    <MDBModal id="exampleModalCenter" tabindex="-1" labelledby="exampleModalCenterTitle" v-model="exampleModalCenter"
        centered class="modal-lg">
        <MDBModalHeader :style="{ background: headerBgGradient }" class="text-white">
            <MDBModalTitle id="exampleModalCenterTitle">
                <i class="fas fa-eye"></i>
                <span class="ms-2">View Employee</span></MDBModalTitle>
        </MDBModalHeader>
        <MDBModalBody>
            <form>
                <div class="row">
                    <div class="d-flex gap-2 justify-content-start align-items-center">
                        <img src="../../assets/logo.png" width="80" class="img-fluid">
                        <h4 class="ms-2">{{fullName}}</h4>
                        <p class="small chip fw-semibold">{{ empDetails.type }}</p>
                    </div>
                </div>
                <div class="row align-items-center my-3">
                    <div class="col small fw-semibold">Basic Information</div>
                    <div class="col-9 d-none d-md-block">
                        <hr />
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <MDBInput inputGroup="lg" :formOutline="false" wrapperClass="mb-3"
                            v-model="empDetails.firstName" readonly>
                            <template #prepend>
                                <span class="input-group-text" id="inputGroup-sizing-lg">First Name</span>
                            </template>
                        </MDBInput>
                    </div>
                    <div class="col">
                        <MDBInput inputGroup="lg" :formOutline="false" wrapperClass="mb-3" v-model="empDetails.lastName"
                            readonly>
                            <template #prepend>
                                <span class="input-group-text" id="inputGroup-sizing-lg">Last Name</span>
                            </template>
                        </MDBInput>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <MDBInput inputGroup="lg" :formOutline="false" wrapperClass="mb-3" v-model="empDetails.email"
                            readonly>
                            <template #prepend>
                                <span class="input-group-text" id="inputGroup-sizing-lg">Email</span>
                            </template>
                        </MDBInput>
                    </div>
                </div>

                <div class="row my-3 align-items-center">
                    <div class="col small fw-semibold">Other Information</div>
                    <div class="col-9 d-none d-md-block">
                        <hr />
                    </div>
                </div>
                <div class="row mt-3" v-if="isRegular">
                    <div class="col">
                        <MDBInput inputGroup="lg" :formOutline="false" wrapperClass="mb-3"
                            v-model="empDetails.numberOfLeaves" readonly>
                            <template #prepend>
                                <span class="input-group-text" id="inputGroup-sizing-lg">Number of Leaves</span>
                            </template>
                        </MDBInput>
                    </div>
                </div>
                <div class="row" v-if="isRegular">
                    <div class="col">
                        <MDBInput inputGroup="lg" :formOutline="false" wrapperClass="mb-3" v-model="employeeBenefits"
                            readonly>
                            <template #prepend>
                                <span class="input-group-text" id="inputGroup-sizing-lg">Benefits</span>
                            </template>
                        </MDBInput>
                    </div>
                </div>
                <div class="row mt-3" v-if="isRegular == false">
                    <div class="col">
                        <MDBInput inputGroup="lg" :formOutline="false" wrapperClass="mb-3"
                            v-model="empDetails.contractEndDate" readonly>
                            <template #prepend>
                                <span class="input-group-text" id="inputGroup-sizing-lg">Contract End Date</span>
                            </template>
                        </MDBInput>
                    </div>
                </div>
                <div class="row" v-if="isRegular == false">
                    <div class="col">
                        <MDBInput inputGroup="lg" :formOutline="false" wrapperClass="mb-3" v-model="empDetails.project"
                            readonly>
                            <template #prepend>
                                <span class="input-group-text" id="inputGroup-sizing-lg">Project</span>
                            </template>
                        </MDBInput>
                    </div>
                </div>
            </form>
        </MDBModalBody>
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

    const exampleModalCenter = ref(false);
    const props = defineProps({
        empDetails: Object,
    });

    const employeeBenefits = computed(() => {
        return props.empDetails.benefits.join(', ')
    })

    const fullName = computed(() => props.empDetails.firstName + " " + props.empDetails.lastName)

    const isRegular = ref(false);

    const checkType = () => {
        if (props.empDetails.type == "regular") {
            isRegular.value = true;
        } else {
            isRegular.value = false;
        }
    };

    const headerBgGradient = computed(() => {
        if (props.empDetails.type == "regular") {
            return `linear-gradient(to right, #40C13A, #A4EB12)`;
        } else {
            return `#40C13A`
        }
    });

    onMounted(() => {
        checkType();
    });
</script>

<style scoped>
    .custom-card {
        background-color: #40c13a;
        cursor: pointer;
    }

    .chip{
        background-color: #FFD700;
        padding: 5px;
        border-radius: 5px 5px 4px 0px;
    }
</style>