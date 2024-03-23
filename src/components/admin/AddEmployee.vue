<template>
  <MDBCard aria-controls="newEmployeeModal" class="h-100 d-flex justify-content-center align-items-center custom-card"
    @click="newEmployeeModal = true">
    <MDBCardBody class="text-center text-white fw-semibold fs-3 d-flex justify-content-center align-items-center ">New
      Employee</MDBCardBody>
  </MDBCard>
  
  <MDBModal id="newEmployeeModal" tabindex="-1" labelledby="newEmployeeModalTitle" v-model="newEmployeeModal" centered
    staticBackdrop class="modal-lg">
    <MDBModalHeader class="headerColor">
      <MDBModalTitle id="newEmployeeModalTitle"> New Employee </MDBModalTitle>
    </MDBModalHeader>
    <form @submit.prevent="addEmployee">
      <MDBModalBody>
        <div class="row">
          <div class="col d-flex gap-2">
            <p class="me-4 fw-semibold small">Employee Type: </p>
            <MDBRadio label="Regular" value="regular" v-model="empType" inline />
            <MDBRadio label="Contractual" value="contractual" v-model="empType" />
            <p class="text-danger fst-italic small" v-if="isTypeSelected">Please select an employee type.</p>
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
            <MDBInput label="First Name" size="lg" type="text" v-model="firstName" required />
          </div>
          <div class="col">
            <MDBInput label="Last Name" size="lg" type="text" v-model="lastName" required />
          </div>
        </div>
        <div class="row mt-3">
          <div class="col">
            <MDBInput label="Email" size="lg" type="email" v-model="email" required />
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
            <MDBInput label="Number of Leaves" size="lg" type="number" v-model="numberOfLeaves" required />
            <p class="text-danger fst-italic small" v-if="isNumberPositive" >Please input positive numbers only.</p>
          </div>
        </div>
        <div class="row mt-3" v-if="isRegular">
          <div class="col d-flex flex-column flex-sm-row flex-wrap gap-4">
            <p class="small fw-semibold">Benefits:</p>
            <label v-for="(item, index) in benefitsItems" :key="index">
              <input type="checkbox" :value="item" v-model="selectedBenefits"> {{ item }}
            </label>
          </div>
          <p class="text-danger fst-italic small" v-if="isAtLeastOneChecked">Please select at least one benefit.</p>
        </div>
        
        <div class="row mt-3" v-if="isContract">
          <div class="col">
            <MDBInput label="Contract End Date" size="lg" type="date" v-model="contractEndDate" required />
          </div>
        </div>
        <div class="row mt-3" v-if="isContract">
          <div class="col">
            <MDBInput label="Project" size="lg" type="text" v-model="project" required />
          </div>
        </div>
      </MDBModalBody>
      <MDBModalFooter>
        <MDBBtn color="secondary" @click="closeModal"> Close </MDBBtn>
        <MDBBtn color="success" type="submit"> Save changes </MDBBtn>
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
    MDBRadio
  } from 'mdb-vue-ui-kit';
  import {
    ref,
    watch,
    onMounted,
    computed
  } from 'vue';
  import {
    useEmployeeStore
  } from '../../stores/employees';

  const employeeStore = useEmployeeStore();
  //employee data
  const empType = ref();
  const firstName = ref();
  const lastName = ref();
  const email = ref();
  const numberOfLeaves = ref();
  const benefitsItems = ref(['HMO', 'Holiday Pay', 'Gov Contributions', 'Training', '13th Month Pay']);
  const selectedBenefits = ref([]);
  const contractEndDate = ref();
  const project = ref();

  const newEmployeeModal = ref(false);
  const isRegular = ref(false);
  const isContract = ref(false);

  //for radio and checkbox validation
  const isTypeSelected = ref(false);
  const isAtLeastOneChecked = ref(false);
  const isNumberPositive = ref(false);

  //alert
  const emit = defineEmits(['show-alert']);

  watch(empType, (newValue, oldValue) => {
    if (newValue === 'regular') {
      isRegular.value = true;
      isContract.value = false;
      isTypeSelected.value = false;
    } else if (newValue === 'contractual') {
      isContract.value = true;
      isRegular.value = false;
      isTypeSelected.value = false;
    } else {
      isRegular.value = false;
      isContract.value = false;
    }
  });

  watch(selectedBenefits, (newBenefits, oldBenefits) => {
    if (newBenefits.length > 0) {
      isAtLeastOneChecked.value = false;
    }
  });

  watch(numberOfLeaves, (newValue) => {
      if (newValue < 0) {
        isNumberPositive.value = true;
      } else {
        isNumberPositive.value = false;
      }
  });

  const clearForm = () => {
    empType.value = '';
    firstName.value = '';
    lastName.value = '';
    email.value = '';
    selectedBenefits.value = [];
    numberOfLeaves.value = 0;
    contractEndDate.value = '';
    project.value = '';
  }

  const closeModal = () => {
    clearForm();
    isRegular.value = false;
    isContract.value = false;
    isTypeSelected.value = false;
    newEmployeeModal.value = false;
  }

  const addEmployee = () => {
    if (!empType.value) {
      isTypeSelected.value = true;
      return;
    }

    if (empType.value == "regular") {
      if (selectedBenefits.value.length <= 0) {
      isAtLeastOneChecked.value = true;
      return;
    }
    
    if(numberOfLeaves.value < 0){
        isNumberPositive.value = true;
        return;
    }

    if (selectedBenefits.value.length > 0) {
        const regularEmp = {
          first_name: firstName.value,
          last_name: lastName.value,
          email: email.value,
          number_of_leaves: parseInt(numberOfLeaves.value),
          benefits: selectedBenefits.value,
          type: empType.value
        }

        employeeStore.addEmployee(regularEmp);
        emit('show-alert', 'Added')
      }
    } else {
      const contractEmp = {
        first_name: firstName.value,
        last_name: lastName.value,
        email: email.value,
        contract_end_date: contractEndDate.value,
        project: project.value,
        type: empType.value
      }

      employeeStore.addEmployee(contractEmp);
      emit('show-alert', 'Added')
    }

    closeModal();
  }
</script>

<style scoped>
  .custom-card {
    background-color: #40C13A;
    cursor: pointer;
  }

  .headerColor {
    background-color: #40C13A;
    color: white;
  }

  input[type="checkbox"] {
    transform: scale(1.5);
  }
</style>