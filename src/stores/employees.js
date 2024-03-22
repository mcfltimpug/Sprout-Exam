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
      try {
         const existingEmployees = localStorage.getItem('currentEmployees');

         if (!existingEmployees) {
            const localEmployees = [{
                  id: 1,
                  firstName: "Christine Faith",
                  lastName: "Timpug",
                  email: "cfl.timpug@gmail.com",
                  numberOfLeaves: 10,
                  benefits: ["HMO", "Holiday Pay", "Gov Contributions"],
                  type: "regular"
               },
               {
                  id: 2,
                  firstName: "Juan",
                  lastName: "Villanueva",
                  email: "juanvillanueva@gmail.com",
                  contractEndDate: "2024-05-25",
                  project: "Empowr",
                  type: "contractual"
               },
               {
                  id: 3,
                  firstName: "Mikaela",
                  lastName: "Dela Cruz",
                  email: "mikaydelacruz@gmail.com",
                  numberOfLeaves: 14,
                  benefits: ["HMO", "Holiday Pay"],
                  type: "regular"
               }
            ]
            localStorage.setItem('currentEmployees', JSON.stringify(localEmployees));
         }

      } catch (error) {
         console.error("Error while storing employees: ", error);
      }

   }

   const getAllEmployees = () => {
      try {
         const employeesFromDB = JSON.parse(localStorage.getItem('currentEmployees'));

         if (employeesFromDB.length > 0) {
            employees.value = employeesFromDB;
         }
      } catch (error) {
         console.error("Error while fetching employees: ", error);
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
      try {
         const existingEmployees = JSON.parse(localStorage.getItem('currentEmployees')) || [];

         const newEmployeeId = generateUniqueId(existingEmployees);
         newEmployee.id = newEmployeeId;

         existingEmployees.push(newEmployee);
         localStorage.setItem('currentEmployees', JSON.stringify(existingEmployees));

         employees.value = existingEmployees;
         console.log("Employee Added Successfully!");

      } catch (error) {
         console.error("Error while adding employee: ", error);
      }
   };

   const editEmployee = (employeeId, updatedEmployee) => {
      try {
         const existingEmployees = JSON.parse(localStorage.getItem('currentEmployees')) || [];

         const indexToEdit = existingEmployees.findIndex(emp => emp.id === employeeId);

         if (indexToEdit !== -1) {
            existingEmployees[indexToEdit] = updatedEmployee;
            localStorage.setItem('currentEmployees', JSON.stringify(existingEmployees));
            employees.value = existingEmployees;
            console.log("Employee Edited Successfully!");
         } else {
            console.log("Employee not found!");
         }
      } catch (error) {
         console.error("Error while editing employee: ", error);
      }
   };

   const deleteEmployee = (employeeId) => {
      try {
         const existingEmployees = JSON.parse(localStorage.getItem('currentEmployees')) || [];

         const indexToDelete = existingEmployees.findIndex(emp => emp.id === employeeId);

         if (indexToDelete !== -1) {
            existingEmployees.splice(indexToDelete, 1);
            localStorage.setItem('currentEmployees', JSON.stringify(existingEmployees));
            employees.value = existingEmployees;
            console.log("Employee Deleted Successfully!");
         } else {
            console.log("Employee not found!");
         }
      } catch (error) {
         console.error("Error while deleting employee: ", error);
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