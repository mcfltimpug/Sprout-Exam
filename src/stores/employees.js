import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'


export const useEmployeeStore = defineStore('employee', () => {
   const employees = ref([]);

   const storeLocalEmployees = () => {
    const existingEmployees = localStorage.getItem('currentEmployees');

    if(!existingEmployees){
         const localEmployees = [
        {
             firstName : "Christine Faith",
             lastName : "Timpug",
             email: "cfl.timpug@gmail.com",
             numberOfLeaves: 10,
             benefits: ["HMO", "Rice Subsidy", "Allowances"],
             type: "regular"
        },
        {
            firstName : "Luizy",
            lastName : "Harvey",
            email: "harveyluizy@gmail.com",
            contractEndDate: "2024-05-25",
            project: "Empowr",
            type: "contractual"
        },
        {
            firstName : "Cho Seungyoun",
            lastName : "Woodz",
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

    if(employeesFromDB.length > 0){
        employees.value = employeesFromDB;
    }
    
   }

   const addEmployee = (newEmployee) => {
      employees.value.push(newEmployee);
      localStorage.setItem('currentEmployees', JSON.stringify(employees.value));
      console.log("Added Successfully!");
   };

   onMounted(() => {
      storeLocalEmployees();
      getAllEmployees();
   });

   return { employees, getAllEmployees, addEmployee };


});