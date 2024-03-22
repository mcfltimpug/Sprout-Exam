import {
   defineStore
} from 'pinia'
import {
   ref,
   onMounted
} from 'vue'


export const useEmployeeStore = defineStore('employee', () => {
   const employees = ref([]);

   const storeLocalEmployees = () => {
      const existingEmployees = localStorage.getItem('currentEmployees');

      if (!existingEmployees) {
         const localEmployees = [{
               id: 1,
               firstName: "Christine Faith",
               lastName: "Timpug",
               email: "cfl.timpug@gmail.com",
               numberOfLeaves: 10,
               benefits: ["HMO", "Rice Subsidy", "Allowances"],
               type: "regular"
            },
            {
               id: 2,
               firstName: "Luizy",
               lastName: "Harvey",
               email: "harveyluizy@gmail.com",
               contractEndDate: "2024-05-25",
               project: "Empowr",
               type: "contractual"
            },
            {
               id: 3,
               firstName: "Cho Seungyoun",
               lastName: "Woodz",
               email: "wwoodz@gmail.com",
               numberOfLeaves: 14,
               benefits: ["HMO", "Allowances"],
               type: "regular"
            }
         ]

         localStorage.setItem('currentEmployees', JSON.stringify(localEmployees));
      }

   }

   const getAllEmployees = () => {
      const employeesFromDB = JSON.parse(localStorage.getItem('currentEmployees'));

      if (employeesFromDB.length > 0) {
         employees.value = employeesFromDB;
      }

   }

   const generateUniqueId = (employees) => {
      if (employees.length === 0) {
         return 1;
      }

      const highestId = employees.reduce((maxId, employee) => {
         return Math.max(maxId, parseInt(employee.id));
      }, 0);

      return highestId + 1;
   };


   const addEmployee = (newEmployee) => {
      const existingEmployees = JSON.parse(localStorage.getItem('currentEmployees')) || [];

      const newEmployeeId = generateUniqueId(existingEmployees);
      newEmployee.id = newEmployeeId;

      existingEmployees.push(newEmployee);
      localStorage.setItem('currentEmployees', JSON.stringify(existingEmployees));

      employees.value = existingEmployees;
      console.log("Added Successfully!");
   };

   const editEmployee = (employeeId, updatedEmployee) => {
      const existingEmployees = JSON.parse(localStorage.getItem('currentEmployees')) || [];

      const indexToEdit = existingEmployees.findIndex(emp => emp.id === employeeId);

      if (indexToEdit !== -1) {
         existingEmployees[indexToEdit] = updatedEmployee;
         localStorage.setItem('currentEmployees', JSON.stringify(existingEmployees));
         employees.value = existingEmployees;
         console.log("Edited Successfully!");
      } else {
         console.log("Employee not found!");
      }
   };

   const deleteEmployee = (employeeId) => {
      const existingEmployees = JSON.parse(localStorage.getItem('currentEmployees')) || [];

      const indexToDelete = existingEmployees.findIndex(emp => emp.id === employeeId);

      if (indexToDelete !== -1) {
         existingEmployees.splice(indexToDelete, 1);
         localStorage.setItem('currentEmployees', JSON.stringify(existingEmployees));
         employees.value = existingEmployees;
         console.log("Deleted Successfully!");
      } else {
         console.log("Employee not found!");
      }
   };

   onMounted(() => {
      storeLocalEmployees();
      getAllEmployees();
   });

   return {
      employees,
      getAllEmployees,
      addEmployee,
      deleteEmployee,
      editEmployee
   };


});