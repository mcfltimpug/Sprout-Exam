import {
   defineStore
} from 'pinia'
import {
   ref,
   onMounted
} from 'vue'
import axios from 'axios';


export const useEmployeeStore = defineStore('employees', () => {

   const employees = ref([]);

   const getAllEmployees = async() => {
      try {
         const response = await axios.get("http://localhost:8000/employees");
         employees.value = response.data;
      } catch (error) {
         console.error("Error while fetching employees: ", error);
      }
   }

   const addEmployee = async (newEmployee) => {
      try {
         //create id
         const response = await axios.get("http://localhost:8000/employees");
         const allEmployees = response.data;
         let highestID = 0;
         allEmployees.forEach(employee => {
            if (employee.id > highestID){
               highestID = employee.id;
            }
         })

         // data with added id
         newEmployee.id = highestID + 1;
         await axios.post("http://localhost:8000/employees", newEmployee)
         employees.value.push(newEmployee);
         console.log("Employee Added Successfully");

      } catch (error) {
         console.error("Error while adding employee: ", error);
      }
   };

   const editEmployee = async (employeeId, employeeData) => {
      try {
         await axios.put(`http://localhost:8000/employees/${employeeId}`, employeeData);

         const index = employees.value.findIndex(employee => employee.id === employeeId);

         if (index !== -1) {
            employees.value[index] = employeeData;
            console.log("Employee Edited Successfully");
         } else {
            console.error("Employee Not Found");
         }
      } catch (error) {
         console.error("Error while editing employee: ", error);
      }
   };

   const deleteEmployee = async (employeeId) => {
      try {
         await axios.delete(`http://localhost:8000/employees/${employeeId}`);
   
         const index = employees.value.findIndex(employee => employee.id === employeeId);
         
         if (index !== -1) {
            const deletedEmployee = employees.value.splice(index, 1)[0];
            console.log("Employee Deleted Successfully");
         } else {
            console.error("Employee not found in the store.");
         }
      } catch (error) {
         console.error("Error while deleting employee: ", error);
      }
   };

   onMounted(() => {
      getAllEmployees()
   })
   
   return {
      employees,
      getAllEmployees,
      addEmployee,
      editEmployee,
      deleteEmployee
   };

});