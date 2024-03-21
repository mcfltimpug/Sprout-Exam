import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia'

export const useAdminStore = defineStore('admin', () => {
    const admin = ref([
        {
          username: 'admin',
          password: 'password',
          name: 'Super Admin'
        }
    ]) 

  const isAuthenticated = ref(false)

  const storeAdminCredentials = () => {
   
      localStorage.setItem('adminCredentials', JSON.stringify(admin.value));
      localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated.value));
     
  }

  onMounted(() => {
    storeAdminCredentials();
  })


  function loginAdmin(username, password) {
    const storedCredentials = JSON.parse(localStorage.getItem('adminCredentials'));
  
    for (let i = 0; i < storedCredentials.length; i++) { 
      if (username === storedCredentials[i].username && password === storedCredentials[i].password) {
        isAuthenticated.value = true;
        localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated.value));
        break;
      }else{
        isAuthenticated.value = false;
        localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated.value));
      }
    }
  }
  
  function logoutAdmin(){
    isAuthenticated.value = false;
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated.value));
  }

  return { admin, isAuthenticated, loginAdmin, logoutAdmin }
})


