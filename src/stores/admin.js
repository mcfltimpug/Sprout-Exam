import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useAdminStore = defineStore('admin', () => {

  const isAuthenticated = ref(false)

  onMounted(() => {
    const savedIsAuthenticated = localStorage.getItem('isAuthenticated')
    if (savedIsAuthenticated !== null) {
      isAuthenticated.value = JSON.parse(savedIsAuthenticated)
    }
  })

  const loginAdmin = async (admin) => {
    try {
      const response = await axios.post("http://localhost:8000/login", admin);

      if (response.status === 200) {
        if (response.data.message === "Login Successful") {
          isAuthenticated.value = true;

          localStorage.setItem('isAuthenticated', JSON.stringify(true))
        } 
      }
    } catch (error) {
      console.error("Error while logging in: ", error.response.data.detail);
    }
  }
  
  const logoutAdmin = () =>{
    isAuthenticated.value = false;
    localStorage.removeItem('isAuthenticated');
  }

  return { isAuthenticated, loginAdmin, logoutAdmin }
})



